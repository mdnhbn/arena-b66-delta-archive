import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../learning-library.js',import.meta.url),'utf8');
function session(store=new Map(),blocked=false){const window={};vm.runInNewContext(source,{window,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(blocked)throw Error('Blocked');store.set(k,v);}}});return window.LibraryPreferences;}
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
