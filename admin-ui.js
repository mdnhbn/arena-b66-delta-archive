(() => {
  const $=id=>document.getElementById(id);
  let members=[];
  const number=x=>new Intl.NumberFormat('bn-BD').format(x);
  const node=(tag,text,cls)=>{const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;return el;};
  async function read(path){const response=await fetch(path,{cache:'no-store',credentials:'same-origin'});if(!response.ok)throw new Error('Private data access failed ('+response.status+')');return response.json();}
  function renderMembers(){const query=$('member-search').value.toLocaleLowerCase();const visible=members.filter(m=>m.name.toLocaleLowerCase().includes(query));$('members').replaceChildren();for(const member of visible){const row=node('li','');row.append(node('span',member.name));if(member.profile){const u=new URL(member.profile);if(u.protocol==='https:'&&['facebook.com','www.facebook.com'].includes(u.hostname)&&!u.username&&!u.password){const link=node('a','Profile ↗');link.href=u.href;link.target='_blank';link.rel='noopener noreferrer';row.append(link);}}$('members').append(row);}if(!visible.length)$('members').append(node('li',members.length?'এই নামে সদস্য পাওয়া যায়নি।':'একটি যাচাইকৃত সদস্যতালিকা যোগ করুন।','hint'));}
  async function load(){
    $('refresh').disabled=true;
    try{const [stats,roster]=await Promise.all([read('/api/admin/stats'),read('/api/admin/members')]);const today=stats.days.at(-1);$('today-visits').textContent=number(today.visits);$('today-visitors').textContent=number(today.visitors);$('week-visits').textContent=number(stats.days.reduce((a,d)=>a+d.visits,0));members=roster.members;$('member-count').textContent=number(members.length);$('roster-status').textContent=roster.updatedAt?'Private snapshot':'তালিকা প্রয়োজন';$('roster-source').textContent=roster.source+(roster.updatedAt?' · আপডেট '+new Date(roster.updatedAt).toLocaleString('bn-BD'):'');
      const max=Math.max(1,...stats.days.map(d=>d.visits||0));$('visit-chart').replaceChildren();for(const day of stats.days){const column=node('div','','chart-day');column.append(node('strong',day.collected===false?'—':number(day.visits)));if(day.collected===false){column.append(node('span','গণনা হয়নি','hint'));}else{const meter=document.createElement('meter');meter.min=0;meter.max=max;meter.value=day.visits;meter.setAttribute('aria-label',day.date+' visits '+day.visits);column.append(meter);}column.append(node('small',day.date.slice(5)));$('visit-chart').append(column);}
      renderMembers();$('status').textContent='সুরক্ষিত সংযোগ · সর্বশেষ আপডেট '+new Date(stats.updatedAt).toLocaleString('bn-BD');
    }catch(error){$('status').textContent='Private data পাওয়া যাচ্ছে না। Owner login ও storage connection পরীক্ষা করুন।';}
    finally{$('refresh').disabled=false;}
  }
  $('member-search').addEventListener('input',renderMembers);
  $('refresh').addEventListener('click',load);
  $('save-roster').addEventListener('click',async()=>{
    const list=$('roster-input').value.split(/\r?\n/).filter(line=>line.trim()).map(line=>{const [name,profile='']=line.split('\t');return {name:name.trim(),profile:profile.trim()};});
    if(!list.length){$('status').textContent='সংরক্ষণের আগে সদস্যদের নাম দিন।';return;}
    $('save-roster').disabled=true;
    try{const response=await fetch('/api/admin/members',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-Delta-Admin':'1'},body:JSON.stringify({members:list,source:$('source-input').value})});if(!response.ok)throw new Error('Save failed');$('roster-input').value='';await load();$('status').textContent='Private সদস্যতালিকা সংরক্ষণ হয়েছে।';}
    catch{$('status').textContent='সংরক্ষণ হয়নি। নাম ও Facebook profile URL পরীক্ষা করুন।';}
    finally{$('save-roster').disabled=false;}
  });
  load();
})();
