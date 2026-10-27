import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import vm from 'node:vm';
const source=readFileSync('app.js','utf8'),context=vm.createContext({entries:[]});vm.runInContext(source.slice(source.indexOf('function videoCoverage('),source.indexOf('function verifiedVideoCount(')),context);const status=context.status;
const youtube=part=>({videoId:'vid'+String(part).padStart(8,'0'),part,playbackVerified:true}),daily=part=>({privateId:'private'+part,part,playbackVerified:true});
test('a linked YouTube video is pending until playback is verified, including a legacy single ID',()=>{
 const e={youtubeId:'vid00000001',videoStatus:'existing-youtube'};assert.equal(status(e).cls,'pending');assert.match(status(e).text,/যাচাই/);assert.equal(status({...e,playbackVerified:true}).cls,'ready');
 assert.equal(status({youtubeVideos:[{...youtube(1),playbackVerified:false}]}).cls,'pending');assert.equal(status({youtubeId:'invalid',category:'recordings'}).cls,'pending');
});
test('ordered parts across YouTube and Dailymotion count together without counting duplicate parts twice',()=>{
 const resource={expectedVideoParts:27,youtubeVideos:[1,2,3,4].map(youtube),dailymotionVideos:Array.from({length:23},(_,i)=>daily(i+5))};assert.equal(status(resource).cls,'ready');
 const partial={...resource,dailymotionVideos:resource.dailymotionVideos.slice(0,4)};assert.equal(status(partial).cls,'pending');assert.match(status(partial).text,/অংশ/);
 const duplicate={expectedVideoParts:2,youtubeVideos:[youtube(1)],dailymotionVideos:[daily(1)]};assert.equal(status(duplicate).cls,'pending');
 const unverified={...resource,dailymotionVideos:resource.dailymotionVideos.map(v=>({...v,playbackVerified:v.part!==27}))};assert.equal(status(unverified).cls,'pending');assert.match(status(unverified).text,/যাচাই/);
});
test('a verified alternative for each part is sufficient, and malformed expected counts never appear complete',()=>{
 assert.equal(status({expectedVideoParts:2,youtubeVideos:[youtube(1),{...youtube(2),playbackVerified:false}],dailymotionVideos:[daily(2)]}).cls,'ready');
 for(const expectedVideoParts of [0,-1,'invalid',10000000])assert.equal(status({expectedVideoParts,youtubeVideos:[youtube(1)]}).cls,'pending');
});
