import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../learning-library.js',import.meta.url),'utf8');
function session(store=new Map(),blocked=false,account=null){const window={LearningAccount:account};vm.runInNewContext(source,{window,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(blocked)throw Error('Blocked');store.set(k,v);}}});return window.LibraryPreferences;}
test('saved courses and completion persist independently without account or payment data',()=>{
 const store=new Map(),first=session(store);assert.equal(first.toggleSaved('vault-source-0001'),true);assert.equal(first.toggleComplete('vault-source-0001:lesson-01'),true);
 const next=session(store);assert.equal(next.isSaved('vault-source-0001'),true);assert.equal(next.isComplete('vault-source-0001:lesson-01'),true);next.toggleSaved('vault-source-0001');assert.equal(next.isComplete('vault-source-0001:lesson-01'),true);
});
test('resume navigation accepts only known in-site learning routes',()=>{
 const p=session();p.remember('#course/vault-source-0001/lesson/lesson-03','Lesson 3');assert.equal(p.recent().href,'#course/vault-source-0001/lesson/lesson-03');p.remember('https://untrusted.example','Bad');assert.equal(p.recent().title,'Lesson 3');p.remember('javascript:alert(1)','Bad');assert.equal(p.recent().title,'Lesson 3');
});
test('invalid saved data and blocked browser storage do not break the learning page',()=>{
 const store=new Map([['learning-library-preferences-v1','{broken']]),p=session(store,true);assert.equal(p.isSaved('entry-22'),false);assert.equal(p.toggleSaved('entry-22'),true);assert.equal(p.toggleSaved('../settings'),false);p.remember('#class/entry-22','Class');assert.equal(p.recent().href,'#class/entry-22');
});
test('date-named archive classes support completion and resume without accepting another path',()=>{
 const store=new Map(),p=session(store),route='#class/class-2026-10-18';
 p.remember(route,'Report Writing');p.toggleComplete('class-2026-10-18');
 const next=session(store);assert.equal(next.recent().href,route);assert.equal(next.isComplete('class-2026-10-18'),true);
 next.remember('#class/../studio','Bad path');next.remember('#class/entry-1?token=private','Query');assert.equal(next.recent().href,route);
});

test('signed-in learners read progress only from their own authorized account snapshot',()=>{
 const store=new Map(),old=session(store);old.toggleComplete('vault-source-0001:lesson-01');
 const account={state:{user:{id:'current'},courses:['vault-source-0001'],progress:{courses:{'vault-source-0001':{completed:['lesson-02']}},recent:{courseId:'vault-source-0001',lessonId:'lesson-02'}}},has(id){return this.state.courses.includes(id);},recent(){return {href:'#course/vault-source-0001/lesson/lesson-02',title:'Continue learning'};}};
 const current=session(store,false,account);assert.equal(current.isComplete('vault-source-0001:lesson-01'),false);assert.equal(current.isComplete('vault-source-0001:lesson-02'),true);assert.equal(current.recent().href,'#course/vault-source-0001/lesson/lesson-02');
 const other=session(store,false,{state:{user:{id:'other'},courses:[],progress:{courses:{}}},has(){return false;},recent(){return null;}});assert.equal(other.isComplete('vault-source-0001:lesson-01'),false);other.clearLearningProgress();assert.equal(other.recent(),null);
});

test('both libraries hide enrollment controls for accessible courses and restore them after access changes',()=>{
 for(const file of ['learning-library.js','vault/learning-library.js']){
  const handlers={},buttons=[{dataset:{courseId:'arena-b66-delta'}},{dataset:{courseId:'vault-source-0001'}}],account={state:{user:{id:'staff'},courses:['arena-b66-delta']},has(id){return this.state.courses.includes(id);},recent(){return null;}};
  const host={querySelector(){return null;}},element=()=>({append(){},addEventListener(){},setAttribute(){}});
  const document={body:{classList:{contains(){return false;}}},getElementById(id){return id==='page'?host:null;},createElement:element,querySelector(){return null;},querySelectorAll(selector){return selector==='.lib-enroll[data-course-id]'?buttons:[];}};
  const tasks=[],context={document,location:{hash:'#overview'},window:{LearningAccount:account,addEventListener(name,fn){handlers[name]=fn;}},MutationObserver:class{disconnect(){}observe(){}},queueMicrotask(fn){tasks.push(fn);}};
  vm.runInNewContext(readFileSync(new URL('../'+file,import.meta.url),'utf8'),context);
  assert.equal(buttons[0].hidden,true);assert.equal(buttons[1].hidden,false);
  account.state.courses=['vault-source-0001'];handlers['learning:account']();tasks.shift()();
  assert.equal(buttons[0].hidden,false);assert.equal(buttons[1].hidden,true);
 }
});
