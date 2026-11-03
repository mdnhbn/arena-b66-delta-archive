import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {cleanArchivePatch} from '../_server/archive-control.mjs';

const clip=part=>({videoId:'vid'+String(part).padStart(8,'0'),label:'Part '+part,playbackVerified:true,part});
const base={id:'entry-93',title:'Supplementary clips',topicTitle:'Burp',text:'Class information',noteText:'',classDate:'2026-10-30'};

test('archive clip edits preserve optional bounded integer parts and reject invalid supplied parts',()=>{
 const numbered=[clip(1),clip(1000)],unnumbered={videoId:'vid00000002',playbackVerified:false};
 assert.deepEqual(cleanArchivePatch({...base,youtubeVideos:[...numbered,unnumbered]}).youtubeVideos,[...numbered,unnumbered]);
 for(const part of [0,-1,1.5,1001,Number.MAX_SAFE_INTEGER,'15',true,null,NaN,Infinity]){
  assert.throws(()=>cleanArchivePatch({...base,youtubeVideos:[{...clip(15),part}]}),/Invalid video part/);
 }
});

class Element{
 constructor(tag,text=''){this.tag=tag;this.textContent=text;this.children=[];this.dataset={};this.value='';}
 append(...children){this.children.push(...children);}
 replaceChildren(...children){this.children=[];this.append(...children);}
 setAttribute(name,value){this[name]=value;}
}
const descendants=node=>[node,...node.children.flatMap(descendants)];
async function editor(entry){
 const panels=[],requests=[];
 const document={createElement:tag=>new Element(tag),createTextNode:text=>new Element('#text',text),querySelector:()=>({before:node=>panels.push(node)})};
 const context=vm.createContext({document,location:{hash:'#archive'},window:{addEventListener(){}},URL,AbortSignal,fetch:async(url,options)=>{
  if(options.method==='POST')requests.push(JSON.parse(options.body));
  return {ok:true,json:async()=>({entries:[structuredClone(entry)],version:2})};
 }});
 vm.runInContext(readFileSync('admin-managed.js','utf8'),context);
 await new Promise(resolve=>setImmediate(resolve));
 const archive=panels.find(panel=>panel.dataset.adminPanel==='archive'),all=descendants(archive);
 const field=label=>{const target=all.find(node=>node.tag==='label'&&node.textContent===label);assert.ok(target,label);return all.find(node=>node.id===target.htmlFor);};
 const check=label=>{const target=all.find(node=>node.tag==='label'&&node.children.some(child=>child.textContent.trim()===label));assert.ok(target,label);return target.children[0];};
 return {requests,field,check,form:all.find(node=>node.tag==='form'),verify:all.find(node=>node.type==='checkbox'),archive};
}

test('appending the final archive clip preserves existing part metadata and completes mixed-host coverage',async()=>{
 const youtubeVideos=[1,2,3,4,...Array.from({length:12},(_,i)=>i+15)].map(clip);
 const entry={...base,category:'tools',expectedVideoParts:27,youtubeVideos,dailymotionVideos:Array.from({length:10},(_,i)=>({part:i+5,privateId:'kprivate'+(i+5),playbackVerified:true}))};
 const ui=await editor(entry);
 ui.field('নতুন YouTube ভিডিও লিংক বা ID · যোগ করলে আগের ভিডিও থাকবে').value=clip(27).videoId;
 ui.field('নতুন YouTube ভিডিওর অংশ / নাম').value=clip(27).label;
 ui.field('নতুন YouTube ভিডিওর অংশ নম্বর · থাকলে').value='27';
 ui.verify.checked=true;
 await ui.form.onsubmit({preventDefault(){}});
 assert.equal(ui.requests.length,1);
 const patch=cleanArchivePatch(ui.requests[0].entry);
 assert.deepEqual(patch.youtubeVideos,[...youtubeVideos,clip(27)]);
 assert.equal(patch.dailymotionVideos,undefined);
 const source=readFileSync('app.js','utf8'),context=vm.createContext({entries:[]});
 vm.runInContext(source.slice(source.indexOf('function videoCoverage('),source.indexOf('function verifiedVideoCount(')),context);
 assert.equal(context.status({...entry,...patch}).cls,'ready');
 assert.equal(entry.youtubeVideos.length,16);
});

test('archive editor can replace stale private Dailymotion IDs with fresh verified embed IDs',async()=>{
 const entry={...base,id:'class-2026-11-01',category:'recordings',recordingSerial:28,expectedVideoParts:2,dailymotionVideos:[{privateId:'xbsys3u',videoId:'xbsys3u',visibility:'private',playbackVerified:false,part:1},{privateId:'xbsysli',videoId:'xbsysli',visibility:'private',playbackVerified:false,part:2}]};
 const ui=await editor(entry);
 ui.field('নতুন Private Dailymotion ID · অংশ ১').value='k7iZukgRnZVBdzMiWLg';
 ui.field('নতুন Private Dailymotion ID · অংশ ২ (থাকলে)').value='k61UJ1A6RMxlYmMiWVw';
 ui.check('পুরোনো Dailymotion অংশ সরিয়ে নিচের IDs দিয়ে প্রতিস্থাপন করুন').checked=true;
 await ui.form.onsubmit({preventDefault(){}});
 assert.equal(ui.requests.length,1);
 const patch=cleanArchivePatch(ui.requests[0].entry);
 assert.deepEqual(patch.dailymotionVideos.map(v=>v.privateId),['k7iZukgRnZVBdzMiWLg','k61UJ1A6RMxlYmMiWVw']);
 assert.ok(patch.dailymotionVideos.every(v=>v.playbackVerified===false));
});

test('archive updates reject public Dailymotion IDs in the private-ID field',()=>{
 assert.throws(()=>cleanArchivePatch({...base,dailymotionVideos:[{privateId:'xbsys3u',videoId:'xbsys3u',playbackVerified:false,part:1}]}),/Invalid or duplicate Dailymotion private video ID/);
});

test('archive editor rejects an incomplete private Dailymotion replacement',async()=>{
 const entry={...base,id:'class-2026-11-01',category:'recordings',recordingSerial:28,expectedVideoParts:2,dailymotionVideos:[{privateId:'xbsys3u',videoId:'xbsys3u',visibility:'private',playbackVerified:false,part:1},{privateId:'xbsysli',videoId:'xbsysli',visibility:'private',playbackVerified:false,part:2}]};
 const ui=await editor(entry);
 ui.field('নতুন Private Dailymotion ID · অংশ ১').value='k7iZukgRnZVBdzMiWLg';
 ui.check('পুরোনো Dailymotion অংশ সরিয়ে নিচের IDs দিয়ে প্রতিস্থাপন করুন').checked=true;
 await ui.form.onsubmit({preventDefault(){}});
 assert.equal(ui.requests.length,0);
 assert.ok(descendants(ui.archive).some(node=>node.textContent==='প্রতিস্থাপনের জন্য মোট ভিডিও অংশের সব ID দিন।'));
});
test('the archive editor refuses an invalid new part before submitting',async()=>{
 const ui=await editor({...base,youtubeVideos:[clip(1)]});
 ui.field('নতুন YouTube ভিডিও লিংক বা ID · যোগ করলে আগের ভিডিও থাকবে').value=clip(2).videoId;
 ui.field('নতুন YouTube ভিডিওর অংশ নম্বর · থাকলে').value='1.5';
 await ui.form.onsubmit({preventDefault(){}});
 assert.equal(ui.requests.length,0);
 assert.ok(descendants(ui.archive).some(node=>node.textContent==='সঠিক ভিডিও অংশ নম্বর দিন।'));
});
