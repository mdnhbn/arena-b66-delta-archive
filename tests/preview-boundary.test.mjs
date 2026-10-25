import test from 'node:test';
import assert from 'node:assert/strict';
import {isReadOnlyPreview,previewHTML,PREVIEW_BRANCH} from '../_server/preview.mjs';
const allowed={VERCEL_ENV:'preview',VERCEL_PROJECT_ID:'prj_Ts514bqmcaw8dmhGxNXa9on4LwTl',VERCEL_GIT_COMMIT_REF:PREVIEW_BRANCH};
test('test environment requires exact linked project, branch and preview target',()=>{
 assert.equal(isReadOnlyPreview(allowed),true);
 for(const overrides of [{VERCEL_ENV:'production'},{VERCEL_ENV:'development'},{VERCEL_PROJECT_ID:'other'},{VERCEL_GIT_COMMIT_REF:'main'}, {VERCEL_GIT_COMMIT_REF:'admin'}])assert.equal(isReadOnlyPreview({...allowed,...overrides}),false);
 assert.equal(isReadOnlyPreview({}),false);
});
test('test build omits live side effects while preserving course UI and normal builds',()=>{
 const source='<html><head></head><body>'+["ads/controller.js","modern.js"].map(src=>'<script src="'+src+'" defer></script>').join('')+'<script src="app.js"></script></body></html>';
 const html=previewHTML(source,allowed);
 for(const src of ["ads/controller.js","modern.js"])assert.equal(html.includes('src="'+src+'"'),false);
 assert.match(html,/src="app.js"/);assert.match(html,/stage1-notice/);
 assert.equal(previewHTML(source,{...allowed,VERCEL_ENV:'production',VERCEL_GIT_COMMIT_REF:'main'}),source);
 assert.throws(()=>previewHTML(source,{...allowed,VERCEL_ENV:'production'}),/must not be deployed/);
});
