(()=>{'use strict';
 const storageKey='learning-library-preferences-v1',idOK=x=>typeof x==='string'&&/^[a-z0-9:-]{1,180}$/.test(x);
 const routeOK=x=>typeof x==='string'&&/^#(?:course\/[a-z0-9-]+(?:\/lesson\/[a-z0-9-]+)?|class\/entry-[0-9]+)$/.test(x);
 let data={saved:[],completed:[],recent:null};
 try{const value=JSON.parse(localStorage.getItem(storageKey)||'null');if(value&&typeof value==='object'){data.saved=Array.isArray(value.saved)?value.saved.filter(idOK).slice(0,500):[];data.completed=Array.isArray(value.completed)?value.completed.filter(idOK).slice(0,2000):[];if(value.recent&&routeOK(value.recent.href)&&typeof value.recent.title==='string')data.recent={href:value.recent.href,title:value.recent.title.slice(0,200)};}}catch{}
 function persist(){try{localStorage.setItem(storageKey,JSON.stringify(data));}catch{}}
 window.LibraryPreferences={
  isSaved:id=>data.saved.includes(id),isComplete:id=>data.completed.includes(id),recent:()=>data.recent,
  toggleSaved(id){if(!idOK(id))return false;const has=data.saved.includes(id);data.saved=has?data.saved.filter(x=>x!==id):[...data.saved,id].slice(-500);persist();return !has;},
  toggleComplete(id){if(!idOK(id))return false;const has=data.completed.includes(id);data.completed=has?data.completed.filter(x=>x!==id):[...data.completed,id].slice(-2000);persist();return !has;},
  remember(href,title){if(!routeOK(href))return;const next={href,title:String(title).slice(0,200)};if(data.recent?.href===href&&data.recent?.title===next.title)return;data.recent=next;persist();}
 };
 if(typeof document==='undefined')return;
 const vault=document.body.classList.contains('vault-library'),prefs=window.LibraryPreferences;
 const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 const host=vault?document.getElementById('main'):document.getElementById('page');if(!host)return;
 let scheduled=false,lastRoute='',observer;
 const icons={ai:'AI',hacking:'⌘',marketing:'↗',editing:'▶',trading:'↗',coding:'</>',design:'◇',ecommerce:'▤',youtube:'▶',other:'✦'};
 function dialog(kind,title){if(window.LearningAccount){if(kind==='enroll')window.LearningAccount.enroll(vault?(location.hash.match(/^#course\/([a-z0-9-]+)/)?.[1]||'arena-b66-delta'):'arena-b66-delta',title);else window.LearningAccount.open(kind);return;}
  document.querySelector('.learning-dialog')?.remove();const d=make('dialog','learning-dialog'),close=make('button','dialog-close','×');close.type='button';close.setAttribute('aria-label','Close');close.addEventListener('click',()=>d.close());d.append(close);
  if(kind==='enroll'){
   d.append(make('p','eyebrow','COURSE ENROLLMENT'),make('h2','',title),make('p','','Paid course access'));
   const option=make('label'),box=make('input');box.type='checkbox';option.append(box,make('span','','Add ad-free access as a separate purchase option'));d.append(option);
   const summary=make('p','checkout-summary');function update(){summary.textContent=box.checked?'Selected: course access + ad-free access.':'Selected: course access. Advertisements remain enabled.';}box.addEventListener('change',update);update();d.append(summary,make('p','','Course and ad-free prices will be set before checkout opens.'));
   const pay=make('button','learning-action','Payment opens after setup');pay.type='button';pay.disabled=true;d.append(pay);
  }else d.append(make('p','eyebrow','YOUR LEARNING ACCOUNT'),make('h2','',kind==='register'?'Create your learning account':'Sign in to your learning space'),make('p','','Student accounts and course permissions will be enabled in the next access setup step. This screen does not collect your password or create an account.'));
  d.append(make('p','preview-note','Frontend preview — no payment is taken and no course access is changed.'));d.querySelector('h2').id='learning-dialog-title';d.setAttribute('aria-labelledby','learning-dialog-title');document.body.append(d);d.addEventListener('close',()=>d.remove(),{once:true});d.showModal();close.focus();
 }
 function cover(topic,serial){
  const el=make('span','course-cover');el.dataset.topic=String(topic).toLowerCase().split(' ')[0];el.setAttribute('aria-hidden','true');el.append(make('span','cover-kicker',serial?'COURSE '+String(serial).padStart(2,'0'):'LEARNING LIBRARY'),make('span','cover-topic',topic||'Web Security'),make('span','cover-symbol',icons[String(topic).toLowerCase()]||'⌘'));return el;
 }
 function decorate(row,key,topic,serial,title){
  if(row.dataset.libraryReady)return;row.dataset.libraryReady='1';
  const shell=make('article','lib-card-shell');shell.dataset.courseKey=key;row.replaceWith(shell);row.prepend(cover(topic,serial));const paid=make('span','paid-course-label','Paid course');row.querySelector('.course-info,.class-main')?.before(paid);
  const save=make('button','lib-save');save.type='button';function draw(){const on=prefs.isSaved(key);save.textContent=on?'♥':'♡';save.setAttribute('aria-pressed',String(on));save.setAttribute('aria-label',(on?'Unsave ':'Save ')+title);}draw();save.addEventListener('click',()=>{prefs.toggleSaved(key);draw();if(vault&&typeof state!=='undefined'&&state.savedOnly)renderCourses();if(!vault&&window.ArchiveSavedOnly)window.dispatchEvent(new Event('hashchange'));});
  const enroll=make('button','lib-enroll',vault?'Enrollment options':'কোর্সে ভর্তির অপশন');enroll.type='button';enroll.addEventListener('click',()=>window.LearningAccount?window.LearningAccount.enroll(vault?key:'arena-b66-delta',title):dialog('enroll',title));shell.append(row,save,enroll);
 }
 function refresh(){
  scheduled=false;observer?.disconnect();
  if(vault){
   document.querySelectorAll('#category-nav a').forEach(a=>{if(a.querySelector('.category-total'))return;const id=a.dataset.category;const count=typeof state!=='undefined'?state.courses.filter(c=>c.category===id||c.categories?.includes(id)).length:0;a.append(make('small','category-total',String(count)));});
   document.querySelectorAll('#course-grid>.course-card').forEach(row=>{const item=typeof state!=='undefined'?state.courses.find(c=>c.url===row.getAttribute('href')):null;if(item)decorate(row,item.id,item.category,item.serial,item.title);});
  }else{
   const slot=document.getElementById('library-filters');
   if(lastRoute!==location.hash){slot?.replaceChildren();if(slot)slot.hidden=true;lastRoute=location.hash;}
   const filters=host.querySelector('.filter-bar');if(filters&&slot){slot.hidden=false;slot.replaceChildren(make('h2','','খুঁজুন ও ফিল্টার করুন'),filters);if(location.hash.startsWith('#classes')){const saved=make('button','saved-filter','♡ শুধু সংরক্ষিত ক্লাস');saved.type='button';saved.setAttribute('aria-pressed',String(!!window.ArchiveSavedOnly));saved.addEventListener('click',()=>{window.ArchiveSavedOnly=!window.ArchiveSavedOnly;window.dispatchEvent(new Event('hashchange'));});slot.append(saved);}}
   document.querySelectorAll('#page .class-list>.class-row').forEach(row=>{const id=row.hash.split('/').pop()?.split('?')[0];if(!idOK(id))return;const topic=window.CyberNestLanguage?.originalText(row.querySelector('.class-meta')?.lastElementChild)||row.querySelector('.class-meta')?.lastElementChild?.textContent||'Web Security';decorate(row,id,topic,row.querySelector('.class-number')?.textContent,row.querySelector('h3')?.textContent||'Class');});
  }
  const path=location.hash,match=vault?path.match(/^#course\/([a-z0-9-]+)\/lesson\/([a-z0-9-]+)$/):path.match(/^#class\/(entry-[0-9]+)$/);
  if(match&&!host.querySelector('.enrollment-lock')){
   const key=vault?match[1]+':'+match[2]:match[1],title=host.querySelector(vault?'.lesson-title h2':'.page-heading h1')?.textContent;
   if(title){prefs.remember(path,title);let actions=host.querySelector('.learning-actions');if(!actions){actions=make('div','learning-actions');const done=make('button','learning-action');done.type='button';done.addEventListener('click',()=>{prefs.toggleComplete(key);queue();});actions.append(done,make('small','','Saved on this browser · completion is marked by you'));const anchor=host.querySelector(vault?'.lesson-pager':'.page-heading');anchor?.after(actions);}
    const done=actions.querySelector('button'),complete=prefs.isComplete(key);done.textContent=complete?'✓ Completed':'Mark lesson completed';done.setAttribute('aria-pressed',String(complete));
   }
  }
  if(vault){let completed=0,total=0;host.querySelectorAll('.lesson-list a').forEach(a=>{const m=a.hash.match(/^#course\/([a-z0-9-]+)\/lesson\/([a-z0-9-]+)$/);if(!m)return;total++;const on=prefs.isComplete(m[1]+':'+m[2]);if(on)completed++;a.classList.toggle('lesson-done',on);});const side=host.querySelector('.lesson-sidebar');if(side&&total){let bar=side.querySelector('.learning-progress');if(!bar){bar=make('progress','learning-progress');bar.setAttribute('aria-label','Your completion progress');side.querySelector('.course-progress')?.after(bar);}bar.max=total;bar.value=completed;bar.title=completed+' of '+total+' lessons marked complete on this browser';}}
  const resume=document.getElementById('resume-learning'),recent=prefs.recent();if(resume){resume.hidden=!recent;if(recent){resume.href=(recent.href.startsWith('#course/')?'/vault/':'/')+recent.href;resume.title='Continue: '+recent.title;}}
  observer?.observe(host,{childList:true,subtree:true});
 }
 function queue(){if(scheduled)return;scheduled=true;queueMicrotask(refresh);}
 const controls=make('div','learning-top-actions'),resume=make('a','resume-learning',vault?'Continue learning':'শেখা চালিয়ে যান');resume.id='resume-learning';resume.hidden=true;controls.append(resume);
 for(const[kind,label,cls]of (window.LearningAccount?[]:[['signin','Sign in','account-signin'],['register','Register','account-register']])){const b=make('button',cls,label);b.type='button';b.addEventListener('click',()=>dialog(kind));controls.append(b);}
 if(vault){const theme=make('button','','☾ Dark');theme.id='library-theme-toggle';theme.type='button';controls.append(theme);}
 (document.querySelector(vault?'.topbar':'.topbar-left'))?.append(controls);
 if(vault){
  const search=document.querySelector('.search-wrap');if(search)document.querySelector('.sidebar .label')?.before(search);
  const saved=make('button','saved-filter','♡ Saved courses');saved.type='button';saved.setAttribute('aria-pressed','false');saved.addEventListener('click',()=>{state.savedOnly=!state.savedOnly;saved.setAttribute('aria-pressed',String(state.savedOnly));state.limit=50;renderCourses();});document.getElementById('category-nav')?.before(saved,make('p','library-filter-note','Your saved courses and progress stay on this browser.'));
  document.querySelector('.prompt').textContent='YOUR LEARNING SPACE';
 }
 observer=new MutationObserver(queue);window.addEventListener('hashchange',queue);window.addEventListener('delta:page',queue);refresh();
 if(!vault)document.querySelector('[data-page="classes"]')?.addEventListener('click',()=>{window.ArchiveSavedOnly=false;if(location.hash.startsWith('#classes'))window.dispatchEvent(new Event('hashchange'));});
})();
