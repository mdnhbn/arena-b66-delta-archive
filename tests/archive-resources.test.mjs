import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {cleanArchivePatch,cleanArchiveCreate,validateArchiveResourceReferences} from '../_server/archive-control.mjs';
import {authPool,learningAuth} from '../_server/learning-auth.mjs';
import {ownerPool} from '../_server/learning-admin.mjs';
import {POST} from '../_server/routes/admin/archive.mjs';
import {withRequestActor} from '../_server/request-actor.mjs';

const base={id:'class-2026-11-01',category:'recordings',recordingSerial:28,title:'Class',topicTitle:'Topic',text:'Information',noteText:'Notes'};
const patchBase={id:base.id,title:base.title,topicTitle:base.topicTitle,text:base.text,noteText:base.noteText};
const resources=[{id:'doc-a',category:'documents',title:'Document'},{id:'tool-b',category:'tools',title:'Tool'}];
const draft={...base,id:'class-2026-11-08',recordingSerial:29,topic:'Topic',classDate:'2026-11-08',expectedVideoParts:2,dailymotionVideos:[]};

test('archive resource selection is bounded, safe, distinct and explicitly clearable',()=>{
 assert.deepEqual(cleanArchivePatch({...patchBase,relatedResourceIds:['doc-a','tool-b']}).relatedResourceIds,['doc-a','tool-b']);
 assert.deepEqual(cleanArchivePatch({...patchBase,relatedResourceIds:[]}).relatedResourceIds,[]);
 assert.equal(cleanArchivePatch(patchBase).relatedResourceIds,undefined);
 assert.deepEqual(cleanArchiveCreate({...draft,relatedResourceIds:['doc-a']}).relatedResourceIds,['doc-a']);
 for(const ids of [null,'doc-a',['../file'],['doc-a','doc-a'],[base.id],[5],['a'.repeat(101)],Array.from({length:101},(_,i)=>'resource-'+i)])assert.throws(()=>cleanArchivePatch({...patchBase,relatedResourceIds:ids}),/Invalid related/);
 assert.throws(()=>cleanArchiveCreate({...draft,relatedResourceIds:null}),/Invalid related/);
});

test('resource references must resolve to existing non-recording archive entries',()=>{
 assert.doesNotThrow(()=>validateArchiveResourceReferences({id:base.id,relatedResourceIds:['doc-a','tool-b']},[base,...resources]));
 for(const ids of [['missing'],[base.id],['other-class']])assert.throws(()=>validateArchiveResourceReferences({id:base.id,relatedResourceIds:ids},[base,...resources,{id:'other-class',category:'recordings'}]),/invalid related/);
});

class Element{
 constructor(tag,text=''){this.tag=tag;this.textContent=text;this.children=[];this.dataset={};this.value='';}
 append(...children){this.children.push(...children);}
 replaceChildren(...children){this.children=[];this.append(...children);}
 setAttribute(name,value){this[name]=value;}
}
const descendants=node=>[node,...node.children.flatMap(descendants)];
async function editor(entry){
 const panels=[],requests=[],entries=[entry,...resources,{id:'other-class',category:'recordings',title:'Other class',recordingSerial:27}];
 const context=vm.createContext({document:{createElement:tag=>new Element(tag),createTextNode:text=>new Element('#text',text),querySelector:()=>({before:node=>panels.push(node)})},location:{hash:'#archive'},window:{addEventListener(){}},URL,AbortSignal,fetch:async(url,options)=>{if(options.method==='POST')requests.push(JSON.parse(options.body));return {ok:true,json:async()=>({entries:structuredClone(entries),version:2})};}});
 vm.runInContext(readFileSync('admin-managed.js','utf8'),context);await new Promise(resolve=>setImmediate(resolve));
 const archive=panels.find(panel=>panel.dataset.adminPanel==='archive');
 const nodes=()=>descendants(archive),field=label=>{const caption=nodes().find(node=>node.tag==='label'&&node.textContent===label);assert.ok(caption,label);return nodes().find(node=>node.id===caption.htmlFor);};
 return {archive,requests,nodes,field};
}

test('archive picker preserves previous selections, excludes recordings and saves intentional changes',async()=>{
 const ui=await editor({...base,relatedResourceIds:['doc-a']});
 let picker=ui.field('সংশ্লিষ্ট ডকুমেন্ট, টুলস ও রিসোর্স');
 assert.equal(picker.multiple,true);assert.deepEqual(picker.children.map(option=>option.value),['doc-a','tool-b']);assert.equal(picker.children[0].selected,true);
 await ui.nodes().find(node=>node.tag==='form').onsubmit({preventDefault(){}});
 assert.deepEqual(ui.requests[0].entry.relatedResourceIds,['doc-a']);
 picker=ui.field('সংশ্লিষ্ট ডকুমেন্ট, টুলস ও রিসোর্স');picker.children[0].selected=false;picker.children[1].selected=true;
 await ui.nodes().find(node=>node.tag==='form').onsubmit({preventDefault(){}});
 assert.deepEqual(ui.requests[1].entry.relatedResourceIds,['tool-b']);
});

test('new class form includes selected resources without requiring a recording',async()=>{
 const ui=await editor(base);ui.nodes().find(node=>node.tag==='button'&&node.textContent==='＋ নতুন লাইভ ক্লাস যোগ করুন').onclick();
 ui.field('শিরোনাম').value='New class';ui.field('টপিকের নাম').value='Topic';ui.field('যাচাই করা ক্লাসের তারিখ').value='2026-11-08';ui.field('সংশ্লিষ্ট ডকুমেন্ট, টুলস ও রিসোর্স').children[1].selected=true;
 await ui.nodes().find(node=>node.tag==='form').onsubmit({preventDefault(){}});
 assert.equal(ui.requests[0].create,true);assert.deepEqual(cleanArchiveCreate(ui.requests[0].entry).relatedResourceIds,['tool-b']);
});

test('authorized archive saves validate resources before writing and preserve older optional edits',async t=>{
 const env={VERCEL_ENV:'production',VERCEL_PROJECT_ID:'prj_Ts514bqmcaw8dmhGxNXa9on4LwTl',CYBERNEST_AUTH_SECRET:'synthetic-resource-test-'.repeat(3),CYBERNEST_DATABASE_URL:'postgresql://test:test@resource-test.neon.tech/app?sslmode=require',CYBERNEST_ADMIN_DATABASE_URL:'postgresql://test:test@resource-owner-test.neon.tech/app?sslmode=require'};
 const previous=Object.fromEntries([...Object.keys(env),'CYBERNEST_OWNER_GITHUB_ACCOUNT_ID'].map(key=>[key,process.env[key]]));Object.assign(process.env,env);delete process.env.CYBERNEST_OWNER_GITHUB_ACCOUNT_ID;
 const auth=authPool(),owner=ownerPool();let writes=0,payload={[base.id]:{documentUrl:'https://example.invalid/retained.pdf',relatedResourceIds:['doc-a']}};
 const row=()=>({payload:structuredClone(payload),version:2});
 t.mock.method(learningAuth().api,'getSession',async()=>({user:{id:'synthetic-editor',email:'editor@example.invalid'}}));
 t.mock.method(auth,'query',async sql=>sql.includes('learning.staff_roles')?{rows:[{role:'editor',course_ids:['arena-b66-delta'],verified:true}]}:{rows:[{id:'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'}]});
 t.mock.method(owner,'query',async sql=>sql.includes('source_snapshots')?{rows:[{payload:{updatedAt:'2026-11-14',entries:[base,...resources]}}]}:{rows:[row()]});
 t.mock.method(owner,'connect',async()=>({release(){},async query(sql,args=[]){if(sql.startsWith('SELECT payload,version'))return {rows:[row()]};if(sql.startsWith('INSERT INTO learning.site_controls')){writes++;payload=JSON.parse(args[1]);return {rows:[row()]};}return {rows:[]};}}));
 const submit=(entry,create=false)=>withRequestActor(()=>POST(new Request('https://cybernest-learn.vercel.app/api/admin/archive',{method:'POST',headers:{cookie:'synthetic=session',origin:'https://cybernest-learn.vercel.app','Content-Type':'application/json','X-Delta-Admin':'1'},body:JSON.stringify({entry,version:2,...create?{create:true}:{}})})));
 try{
  for(const ids of [['missing'],[base.id]])assert.equal((await submit({...patchBase,relatedResourceIds:ids})).status,400);
  assert.equal((await submit({...draft,relatedResourceIds:[base.id]},true)).status,400);assert.equal(writes,0);
  assert.equal((await submit({...patchBase,relatedResourceIds:['tool-b']})).status,200);assert.deepEqual(payload[base.id].relatedResourceIds,['tool-b']);assert.equal(payload[base.id].documentUrl,'https://example.invalid/retained.pdf');
  assert.equal((await submit({...patchBase,title:'Updated title'})).status,200);assert.deepEqual(payload[base.id].relatedResourceIds,['tool-b']);
  assert.equal((await submit({...draft,relatedResourceIds:['doc-a']},true)).status,200);assert.deepEqual(payload.__newEntries[0].relatedResourceIds,['doc-a']);
 }finally{t.mock.restoreAll();await auth.end();await owner.end();for(const [key,value]of Object.entries(previous)){if(value===undefined)delete process.env[key];else process.env[key]=value;}}
});
