import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync('language.js','utf8');
function boot(saved,{blocked=false}={}){
 const values=new Map(saved===undefined?[]:[['cybernest-language',saved]]),document={documentElement:{lang:''},readyState:'loading',addEventListener(){}};
 const context={document,window:{},localStorage:{getItem:key=>{if(blocked)throw Error('Storage blocked');return values.get(key);},setItem:(key,value)=>{if(blocked)throw Error('Storage blocked');values.set(key,value);}}};
 vm.runInNewContext(source,context);return {api:context.window.CyberNestLanguage,document,values};
}
test('English is the first-visit default and only supported saved languages are accepted',()=>{
 for(const saved of [undefined,'','fr','<script>']){const {api,document}=boot(saved);assert.equal(api.get(),'en');assert.equal(document.documentElement.lang,'en');assert.equal(api.t('ড্যাশবোর্ড'),'Dashboard');}
 const {api}=boot('bn');assert.equal(api.get(),'bn');assert.equal(api.t('Resource library'),'রিসোর্স লাইব্রেরি');assert.equal(api.locale(),'bn-BD');
});
test('language preference persists without an account or changing course identifiers',()=>{
 const {api,values}=boot();assert.equal(api.set('bn'),true);assert.equal(values.get('cybernest-language'),'bn');assert.equal(api.t('Sign in / Register'),'সাইন ইন / নিবন্ধন');assert.equal(api.t('26 courses'),'২৬টি কোর্স');assert.equal(api.t('8 of 8 lessons ready'),'৮টি পাঠের মধ্যে ৮টি প্রস্তুত');
 assert.equal(api.t('Save 0xFramer'),'সংরক্ষণ করুন · 0xFramer');assert.equal(api.set('javascript:alert(1)'),false);assert.equal(api.t('https://example.com/?id=26'),'https://example.com/?id=26');assert.equal(api.t('vault-source-0001'),'vault-source-0001');assert.equal(api.set('en'),true);assert.equal(api.t('২৬টি ফলাফল'),'26 results');assert.equal(api.t('২৩ অক্টোবর ২০২৬ · শুক্রবার'),'23 October 2026 · Friday');assert.equal(api.t('রাত ৯:৩০–১১:৩০ · নিয়মিত ক্লাস'),'9:30–11:30 PM · Regular class');
});

test('current privacy notice describes consent in both languages',()=>{
 const {api}=boot('bn'),html=readFileSync('privacy.html','utf8'),paragraph=/<h2>Visitor & learning history<\/h2><p>(.*?)<\/p>/.exec(html)?.[1];assert.ok(paragraph);assert.match(api.t(paragraph),/একই সেশনের/);assert.doesNotMatch(api.t(paragraph),/^Visitor/);
 const footer=/class="privacy-notice">(.*?)<\/p>/.exec(readFileSync('index.html','utf8'))?.[1];assert.match(api.t(footer),/অনুমতি প্রয়োজন/);api.set('en');assert.match(api.t(footer),/^Visitor counting requires/);
});
test('blocked storage does not prevent switching; public entry points load the shared language assets',()=>{
 const {api}=boot(undefined,{blocked:true});assert.equal(api.get(),'en');assert.equal(api.set('bn'),true);assert.equal(api.t('Class information'),'ক্লাসের তথ্য');
 for(const name of ['index.html','vault/index.html','privacy.html']){const html=readFileSync(name,'utf8');assert.match(html,/<html lang="en"/);assert.match(html,/src="\/language.js"/);assert.match(html,/href="\/language.css"/);}
 assert.match(readFileSync('vault/course-player.js','utf8'),/if\(original\)n.setAttribute\('translate','no'\)/);
 assert.match(readFileSync('app.js','utf8'),/body-text'\);p.setAttribute\('translate','no'\)/);
});
