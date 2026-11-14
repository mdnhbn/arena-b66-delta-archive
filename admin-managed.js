(()=>{'use strict';
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 async function api(path,body){
  const r=await fetch('/api/admin/'+path,{method:body?'POST':'GET',cache:'no-store',headers:body?{'Content-Type':'application/json','X-Delta-Admin':'1'}:{},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(25000)});
  if(!r.ok)throw Error(r.status===409?'অন্য ট্যাবে পরিবর্তন হয়েছে। সর্বশেষ তথ্য আবার আনুন।':'তথ্য পাওয়া বা সংরক্ষণ করা যায়নি।');
  return r.json();
 }
 function panel(name){const n=el('section');n.dataset.adminPanel=name;n.className='panel';n.hidden=location.hash!=='#'+name;document.querySelector('main footer').before(n);return n;}
 function field(form,label,value,multi=false){
  const input=el(multi?'textarea':'input'),caption=el('label',label);
  input.id='managed-field-'+Math.random().toString(36).slice(2);caption.htmlFor=input.id;input.value=value||'';
  if(multi)input.rows=6;form.append(caption,input);return input;
 }
 function checkbox(form,label,checked=false){const input=el('input'),caption=el('label');input.type='checkbox';input.checked=checked;caption.append(input,document.createTextNode(' '+label));form.append(caption);return input;}
 const archive=panel('archive'),payments=panel('payments');let archiveState,selected='';
 async function loadArchive(){
  archive.replaceChildren(el('p','ক্লাস ও রিসোর্স আনা হচ্ছে…'));
  try{archiveState=await api('archive');drawArchive();}catch(e){archive.replaceChildren(el('p',e.message));}
 }
 function drawArchive(){
  archive.replaceChildren(el('h2','মূল কোর্সের ক্লাস, ভিডিও ও নোট'));
  const add=el('button','＋ নতুন লাইভ ক্লাস যোগ করুন');add.type='button';add.className='button';add.onclick=()=>{selected='__new_class__';drawArchive();};archive.append(add);
  const select=el('select');select.setAttribute('aria-label','সম্পাদনার ক্লাস বা রিসোর্স');
  for(const item of archiveState.entries){const option=el('option',(item.recordingSerial?item.recordingSerial+'. ':'')+(item.topicTitle||item.title||item.id)+' · '+item.category);option.value=item.id;select.append(option);}
  const createOption=el('option','＋ নতুন লাইভ ক্লাস যোগ করুন');createOption.value='__new_class__';select.append(createOption);
  select.value=selected||archiveState.entries[0]?.id||'__new_class__';selected=select.value;select.onchange=()=>{selected=select.value;drawArchive();};archive.append(select);
  const creating=selected==='__new_class__';
  const recordings=archiveState.entries.filter(item=>item.category==='recordings'&&Number.isSafeInteger(item.recordingSerial));
  const nextSerial=Math.max(0,...recordings.map(item=>item.recordingSerial))+1;
  const entry=creating?{id:'',category:'recordings',recordingSerial:nextSerial,title:'',topicTitle:'',text:'',noteText:'',classDate:'',dailymotionVideos:[],expectedVideoParts:2}:archiveState.entries.find(item=>item.id===selected);
  if(!entry)return;
  const form=el('form');
  if(creating)form.append(el('p','নতুন রেকর্ডিং যোগ হবে Class '+nextSerial+' হিসেবে। তারিখ ও টপিক দিন। ভিডিওর ID ফাঁকা রাখলে রেকর্ডিংয়ের অপেক্ষায় ক্লাসটি সংরক্ষিত হবে; পরে সব অংশ যোগ করতে পারবেন।'));
  const title=field(form,'শিরোনাম',entry.title),topic=field(form,'টপিকের নাম',entry.topicTitle),date=field(form,'যাচাই করা ক্লাসের তারিখ',entry.classDate);date.type='date';
  const text=field(form,'ক্লাসের তথ্য / বিবরণ',entry.text,true),notes=field(form,'পূর্ণ নোট',entry.noteText,true);
  let duration;
  if(creating)duration=field(form,'রেকর্ডিংয়ের দৈর্ঘ্য','2:10:52');
  const currentVideos=Array.isArray(entry.youtubeVideos)&&entry.youtubeVideos.length?entry.youtubeVideos.map(v=>({videoId:v.videoId,label:typeof v.label==='string'?v.label:'',playbackVerified:!!v.playbackVerified,...(v.part===undefined?{}:{part:v.part})})):entry.youtubeId?[{videoId:entry.youtubeId,label:'',playbackVerified:!!entry.playbackVerified}]:[];
  const youtube=field(form,'নতুন YouTube ভিডিও লিংক বা ID · যোগ করলে আগের ভিডিও থাকবে','');
  const clipLabel=field(form,'নতুন YouTube ভিডিওর অংশ / নাম','');
  const clipPart=field(form,'নতুন YouTube ভিডিওর অংশ নম্বর · থাকলে','');clipPart.type='number';clipPart.min='1';clipPart.max='1000';clipPart.step='1';
  const currentDM=Array.isArray(entry.dailymotionVideos)?entry.dailymotionVideos.map(v=>({privateId:v.privateId||v.videoId,label:typeof v.label==='string'?v.label:'',playbackVerified:!!v.playbackVerified,...(v.part===undefined?{}:{part:v.part})})):[],
   dm1=field(form,'নতুন Private Dailymotion ID · অংশ ১',''),
   dm2=field(form,'নতুন Private Dailymotion ID · অংশ ২ (থাকলে)',''),
   expected=field(form,'মোট ভিডিও অংশ',''+(entry.expectedVideoParts||Math.max(1,currentDM.length||2)));
  dm1.autocomplete=dm2.autocomplete='off';expected.type='number';expected.min='1';expected.max='40';expected.step='1';
  const ytVerified=checkbox(form,'নতুন YouTube ক্লিপটি চালিয়ে যাচাই করেছি');
  const dmVerified=checkbox(form,'নতুন Dailymotion অংশগুলো এই সাইটে চালিয়ে যাচাই করেছি');
  const replaceDM=currentDM.length?checkbox(form,'পুরোনো Dailymotion অংশ সরিয়ে নিচের IDs দিয়ে প্রতিস্থাপন করুন'):null;
  const documentURL=field(form,'ডকুমেন্টের HTTPS লিংক · ফাঁকা রাখলে আগেরটি থাকবে',entry.documentUrl);documentURL.type='url';
  const save=el('button','এই পরিবর্তন প্রকাশ করুন'),status=el('p');save.type='submit';save.className='button primary';status.setAttribute('role','status');form.append(save,status);
  form.onsubmit=async event=>{
   event.preventDefault();save.disabled=true;
   try{
    const dateValue=date.value;
    const patch={id:creating?'class-'+dateValue:entry.id,title:title.value,topicTitle:topic.value,text:text.value,noteText:notes.value};
    if(dateValue)patch.classDate=dateValue;
    if(!creating)patch.documentUrl=documentURL.value;
    const dmVideos=replaceDM?.checked?[]:currentDM.map(video=>({...video,playbackVerified:dmVerified.checked?true:video.playbackVerified}));
    for(const [value,part] of [[dm1.value.trim(),1],[dm2.value.trim(),2]]){
     if(!value)continue;
     if(!/^k[A-Za-z0-9]{4,39}$/.test(value))throw Error('সঠিক Dailymotion Private ID দিন; এটি k দিয়ে শুরু হয়।');
     if(dmVideos.some(video=>video.privateId===value))throw Error('এই Dailymotion ভিডিওটি আগে থেকেই তালিকায় আছে।');
     dmVideos.push({privateId:value,videoId:value,label:'অংশ '+part,part,playbackVerified:dmVerified.checked});
    }
    if(replaceDM?.checked&&dmVideos.length!==Number(expected.value))throw Error('প্রতিস্থাপনের জন্য মোট ভিডিও অংশের সব ID দিন।');
    if(dmVideos.length&&(creating||dm1.value.trim()||dm2.value.trim()||dmVerified.checked||replaceDM?.checked)){const count=Number(expected.value);if(!Number.isSafeInteger(count)||count<1||count>40)throw Error('ভিডিও অংশের সংখ্যা ঠিক করুন।');patch.dailymotionVideos=dmVideos;patch.expectedVideoParts=count;}
    let ytId=youtube.value.trim();
    if(ytId.startsWith('https://')){const url=new URL(ytId);if(!['youtube.com','www.youtube.com','youtu.be'].includes(url.hostname))throw Error('সঠিক YouTube লিংক দিন।');ytId=url.searchParams.get('v')||url.pathname.split('/').filter(Boolean).at(-1);}
    if(ytId){if(!/^[A-Za-z0-9_-]{11}$/.test(ytId))throw Error('সঠিক YouTube ভিডিও লিংক বা ID দিন।');if(currentVideos.some(v=>v.videoId===ytId))throw Error('এই ভিডিওটি আগে থেকেই তালিকায় আছে।');const clip={videoId:ytId,label:clipLabel.value.trim()||('অংশ '+(currentVideos.length+1)),playbackVerified:ytVerified.checked},partValue=clipPart.value.trim();if(partValue){const part=Number(partValue);if(!Number.isSafeInteger(part)||part<1||part>1000)throw Error('সঠিক ভিডিও অংশ নম্বর দিন।');clip.part=part;}patch.youtubeVideos=[...currentVideos,clip];}
    const body={version:archiveState.version,entry:patch};
    if(creating){
     if(!dateValue)throw Error('ক্লাসের তারিখ দিন।');
     if(!topic.value.trim())throw Error('টপিকের নাম দিন।');
     if(dmVideos.length&&dmVideos.length!==Number(expected.value))throw Error('নতুন ক্লাসের সব Private Dailymotion অংশ যোগ করুন।');
     patch.category='recordings';patch.recordingSerial=entry.recordingSerial;patch.topic=topic.value;patch.expectedVideoParts=Number(expected.value);patch.dailymotionVideos=dmVideos;patch.duration=duration.value;
     body.create=true;
    }
    await api('archive',body);selected=patch.id;await loadArchive();archive.append(el('p','সংরক্ষণ হয়েছে। মূল সাইট রিফ্রেশ করলে দেখা যাবে।'));
   }catch(error){status.textContent=error.message;}finally{save.disabled=false;}
  };
  archive.append(form,el('p','Private Dailymotion ID যোগ করলে ভিডিও সাইটের ভেতরেই চলবে। YouTube ID কেবল Unlisted/embed-ready ভিডিওর জন্য ব্যবহার করুন। সব অংশ যোগ করার আগে গোপনীয়তা ও প্লেব্যাক যাচাই করুন।'));
 }
 async function loadPayments(){
  payments.replaceChildren(el('p','পেমেন্টের সেটিংস আনা হচ্ছে…'));
  try{
   const data=await api('payments');
   payments.replaceChildren(el('h2','কোর্সের মূল্য ও পেমেন্ট'),el('p','অনলাইন পেমেন্ট অ্যাকাউন্ট এখনো সংযুক্ত নয়। এখানে মূল্য প্রস্তুত রাখতে পারবেন; কোনো টাকা নেওয়া বা স্বয়ংক্রিয় অনুমতি দেওয়া হবে না।'));
   const form=el('form'),select=el('select');select.setAttribute('aria-label','মূল্য নির্ধারণের কোর্স');
   for(const course of data.courses){const option=el('option',course.title);option.value=course.id;select.append(option);}form.append(select);
   const currency=field(form,'মুদ্রা · BDT / USD / SAR / EUR / GBP','BDT');currency.maxLength=3;
   const course=field(form,'শুধু কোর্সের মূল্য','0'),adFree=field(form,'বিজ্ঞাপন না দেখার অতিরিক্ত মূল্য','0');
   for(const input of [course,adFree]){input.type='number';input.min='0';input.step='0.01';}
   const update=()=>{for(const [kind,input]of [['course',course],['ad_free',adFree]])input.value=String(Number(data.prices.find(price=>price.course_id===select.value&&price.currency===currency.value&&price.kind===kind)?.amount_minor||0)/100);};
   select.onchange=currency.onchange=update;update();
   const save=el('button','মূল্য প্রস্তুত রাখুন'),status=el('p');save.className='button primary';save.type='submit';status.setAttribute('role','status');form.append(save,status);
   form.onsubmit=async event=>{event.preventDefault();save.disabled=true;try{
    const values={courseId:select.value,currency:currency.value.toUpperCase(),courseMinor:Math.round(Number(course.value)*100),adFreeMinor:Math.round(Number(adFree.value)*100)};
    await api('payments',values);
    for(const [kind,amount]of [['course',values.courseMinor],['ad_free',values.adFreeMinor]]){const old=data.prices.find(price=>price.course_id===values.courseId&&price.currency===values.currency&&price.kind===kind);if(old)old.amount_minor=amount;else data.prices.push({course_id:values.courseId,currency:values.currency,kind,amount_minor:amount});}
    status.textContent='মূল্য সংরক্ষিত। পেমেন্ট সংগ্রহ এখনো বন্ধ আছে।';
   }catch(error){status.textContent=error.message;}finally{save.disabled=false;}};
   payments.append(form,el('h3','সর্বশেষ অর্ডার'));if(!data.orders.length)payments.append(el('p','এখনো কোনো অর্ডার নেই.'));
   for(const order of data.orders)payments.append(el('p',order.status+' · '+order.currency+' '+(Number(order.total_minor)/100).toFixed(2)+' · '+new Date(order.created_at).toLocaleDateString('bn-BD')));
  }catch(error){payments.replaceChildren(el('p',error.message));}
 }
 window.addEventListener('hashchange',()=>{if(location.hash==='#archive')loadArchive();if(location.hash==='#payments')loadPayments();});
 if(location.hash==='#archive')loadArchive();if(location.hash==='#payments')loadPayments();
})();
