import test from 'node:test';import assert from 'node:assert/strict';import {cleanArchivePatch} from '../_server/archive-control.mjs';import {cleanCurriculum} from '../_server/secret-curriculum.mjs';
test('archive edits retain the validated identity used to resolve and save the class',()=>{
 for(const id of ['entry-20','class-2026-10-30']){
  const patch=cleanArchivePatch({id,title:'Network Testing',topicTitle:'Network Testing',text:'Class information',noteText:'Notes',dailymotionVideos:[{privateId:'kSyntheticArchivePart1',part:1,playbackVerified:false}],expectedVideoParts:2});
  const entries=[{id:'unrelated-class'},{id}];
  assert.equal(entries.find(entry=>entry.id===patch.id)?.id,id);
  assert.equal(Object.keys({[patch.id]:patch})[0],id);
 }
 assert.throws(()=>cleanArchivePatch({id:'../invalid',title:'Title',topicTitle:'Topic',text:'',noteText:''}),/Invalid class/);
});
test('class editor rejects executable download links and invalid dates',()=>{const entry={id:'entry-20',title:'Verified title',topicTitle:'Topic',text:'Class information',noteText:'Notes',youtubeId:'A6-nn6z1zok',classDate:'2026-10-23',documentUrl:'https://example.com/document',playbackVerified:true};assert.equal(cleanArchivePatch(entry).youtubeVideos[0].videoId,entry.youtubeId);assert.throws(()=>cleanArchivePatch({...entry,documentUrl:'javascript:alert(1)'}));assert.throws(()=>cleanArchivePatch({...entry,classDate:'2026-02-31'}));assert.throws(()=>cleanArchivePatch({...entry,youtubeId:'bad/id'}));});
test('lesson editing preserves explicitly selected Unlisted YouTube metadata',()=>{const lesson={id:'lesson-1',serial:1,title:'Approved lesson',summary:'',notes:'',homework:'',videos:[{provider:'youtube',id:'A6-nn6z1zok',privacy:'unlisted',verified:true,duration:100}]};assert.equal(cleanCurriculum({courseId:'vault-source-0001',lessons:[lesson]}).lessons[0].videos[0].privacy,'unlisted');assert.throws(()=>cleanCurriculum({courseId:'vault-source-0001',lessons:[{...lesson,videos:[{...lesson.videos[0],provider:'dailymotion'}]}]}));});
