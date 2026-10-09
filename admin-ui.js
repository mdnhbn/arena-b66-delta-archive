(()=>{
  const $=id=>document.getElementById(id),num=x=>new Intl.NumberFormat('bn-BD').format(x),text=(tag,value,cls)=>{const el=document.createElement(tag);el.textContent=value;if(cls)el.className=cls;return el;};
  let members=[],stats=null,busy=false,liveSamples=[],period=28;
  const regions=new Intl.DisplayNames(['bn'],{type:'region'});
  async function read(path){const response=await fetch(path,{cache:'no-store',credentials:'same-origin',signal:AbortSignal.timeout(20000)});if(!response.ok)throw new Error('Access unavailable');return response.json();}

  const titles={overview:'সাইট অ্যানালিটিক্স',audience:'দর্শক ও দেশ',ads:'বিজ্ঞাপন নিয়ন্ত্রণ',members:'সদস্যতালিকা'};
  function closeMenu(){$('admin-sidebar').classList.remove('is-open');$('admin-backdrop').hidden=true;$('admin-menu').setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}
  $('admin-menu').addEventListener('click',()=>{const open=!$('admin-sidebar').classList.contains('is-open');$('admin-sidebar').classList.toggle('is-open',open);$('admin-backdrop').hidden=!open;$('admin-menu').setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);});
  $('admin-backdrop').addEventListener('click',closeMenu);window.addEventListener('resize',closeMenu);
  function theme(mode){document.documentElement.dataset.theme=mode;const label=mode==='dark'?'লাইট মোড':'ডার্ক মোড';$('theme-name').textContent=label;$('admin-theme').setAttribute('aria-label',label+' চালু করুন');try{localStorage.setItem('delta-admin-theme',mode);}catch{}}
  let savedTheme='light';try{if(localStorage.getItem('delta-admin-theme')==='dark')savedTheme='dark';}catch{}theme(savedTheme);
  $('admin-theme').addEventListener('click',()=>theme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
  $('admin-search').addEventListener('input',()=>{const q=$('admin-search').value.trim().toLocaleLowerCase(),target=$('admin-search-results');target.replaceChildren();target.hidden=!q;if(!q)return;const matches=Object.entries(titles).filter(([,name])=>name.toLocaleLowerCase().includes(q));for(const [id,name]of matches){const b=text('button',name);b.type='button';b.addEventListener('click',()=>{location.hash=id;view(id);$('admin-search').value='';target.hidden=true;closeMenu();});target.append(b);}if(!matches.length)target.append(text('p','কোনো বিভাগ পাওয়া যায়নি।','hint'));});
  $('admin-search').addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();$('admin-search-results').querySelector('button')?.click();}if(event.key==='Escape'){$('admin-search-results').hidden=true;closeMenu();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();$('admin-search-results').hidden=true;}});
  document.querySelectorAll('[data-chart-choice]').forEach(button=>button.addEventListener('click',()=>{$('chart-metric').value=button.dataset.chartChoice;drawStats();}));
  function view(name){if(!['overview','audience','ads','members'].includes(name))name='overview';$('admin-title').textContent=titles[name];closeMenu();document.querySelectorAll('[data-admin-panel]').forEach(el=>{el.hidden=el.dataset.adminPanel!==name;});document.querySelectorAll('[data-admin-view]').forEach(el=>{const active=el.dataset.adminView===name;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});}
  document.querySelectorAll('[data-admin-view]').forEach(el=>el.addEventListener('click',()=>view(el.dataset.adminView)));
  window.addEventListener('hashchange',()=>view(location.hash.slice(1)));view(location.hash.slice(1)||'overview');
  function svgElement(tag,attrs,label){const el=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value]of Object.entries(attrs||{}))el.setAttribute(key,String(value));if(label!==undefined)el.textContent=label;return el;}
  function chart(target,points,label,small=false){
    target.replaceChildren();const W=800,H=small?160:260,left=42,right=18,top=20,bottom=36,max=Math.max(1,...points.filter(p=>p.value!==null).map(p=>p.value));const svg=svgElement('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':label});
    const x=i=>left+i*(W-left-right)/Math.max(1,points.length-1),y=v=>H-bottom-v*(H-top-bottom)/max;
    for(let i=0;i<=4;i++){const value=max*i/4;svg.append(svgElement('line',{x1:left,y1:y(value),x2:W-right,y2:y(value),class:'gridline'}));if(!small)svg.append(svgElement('text',{x:left-10,y:y(value)+4,'text-anchor':'end',class:'axis-label'},num(Math.round(value))));}
    let path='';points.forEach((p,i)=>{if(p.value===null){path+=' ';return;}const last=i>0&&points[i-1].value!==null;path+=(last?'L':'M')+x(i)+','+y(p.value)+' ';});
    if(small){const barWidth=Math.min(34,(W-left-right)/Math.max(1,points.length)-6);points.forEach((p,i)=>{if(p.value===null)return;const bar=svgElement('rect',{x:x(i)-barWidth/2,y:y(p.value),width:barWidth,height:H-bottom-y(p.value),rx:2,class:'trend-bar'});bar.append(svgElement('title',{},p.label+' · '+num(p.value)));svg.append(bar);});}
    else{
      let start=-1;for(let i=0;i<=points.length;i++){const valid=i<points.length&&points[i].value!==null;if(valid&&start<0)start=i;if(!valid&&start>=0){if(i-start>1){let area='M'+x(start)+','+(H-bottom);for(let j=start;j<i;j++)area+='L'+x(j)+','+y(points[j].value);area+='L'+x(i-1)+','+(H-bottom)+'Z';svg.append(svgElement('path',{d:area,class:'trend-area'}));}start=-1;}}
      svg.append(svgElement('path',{d:path,fill:'none',class:'trend-line'}));
      points.forEach((p,i)=>{if(p.value===null)return;const dot=svgElement('circle',{cx:x(i),cy:y(p.value),r:5,class:'trend-dot'});dot.append(svgElement('title',{},p.label+' · '+num(p.value)));svg.append(dot);});
    }
    [...new Set([0,Math.floor((points.length-1)/2),points.length-1])].forEach(i=>{if(!points[i])return;svg.append(svgElement('text',{x:x(i),y:H-8,'text-anchor':i===0?'start':i===points.length-1?'end':'middle',class:'axis-label'},points[i].label));});
    target.append(svg);
  }
  function countryList(target,items){target.replaceChildren();const maximum=Math.max(1,...items.map(x=>x.count));for(const item of items){const row=text('div','','country-row'),name=item.code==='ZZ'?'অজানা':regions.of(item.code)||item.code,meter=document.createElement('meter');meter.min=0;meter.max=maximum;meter.value=item.count;meter.setAttribute('aria-label',name+' '+num(item.count)+' দর্শক');row.append(text('span',name),meter,text('strong',num(item.count)));target.append(row);}if(!items.length)target.append(text('p','এখনও দেশভিত্তিক তথ্য পাওয়া যায়নি।','hint'));}
  function drawStats(){
    if(!stats)return;const today=stats.days.at(-1),yesterday=stats.days.at(-2),metric=$('chart-metric').value;
    $('today-visitors').textContent=num(today.visitors||0);$('today-visits').textContent=num(today.visits||0);$('yesterday-visitors').textContent=yesterday?.collected===false?'—':num(yesterday?.visitors||0);$('yesterday-note').textContent=yesterday?.collected===false?'গণনা হয়নি':yesterday.date+' · UTC';
    $('period-visits').textContent=num(stats.days.reduce((n,day)=>n+(day.visits||0),0));$('period-label').textContent='শেষ '+num(period)+' দিনের ভিজিট';
    $('date-range-label').textContent=stats.days[0].date+' – '+today.date+' · UTC';$('realtime-today-visits').textContent=num(today.visits||0);countryList($('realtime-countries'),(today.countries||[]).slice(0,3));document.querySelectorAll('[data-chart-choice]').forEach(button=>button.closest('article').classList.toggle('metric-active',button.dataset.chartChoice===metric));
    $('active-visitors').textContent=num(stats.active);$('live-status').textContent='প্রতি মিনিটে আপডেট · '+new Date(stats.presenceUpdatedAt).toLocaleTimeString('bn-BD');
    chart($('visit-chart'),stats.days.map(day=>({label:day.date.slice(5),value:day.collected===false?null:day[metric]})),num(period)+' দিনের '+(metric==='visitors'?'দর্শক':'ভিজিট'));
    $('chart-summary').textContent='শেষ '+num(period)+' দিনে '+num(stats.days.reduce((n,day)=>n+(day.visits||0),0))+'টি ভিজিট রেকর্ড হয়েছে।';
    if(liveSamples.at(-1)?.at!==stats.presenceUpdatedAt){liveSamples.push({at:stats.presenceUpdatedAt,value:stats.active});liveSamples=liveSamples.slice(-12);}
    chart($('live-chart'),liveSamples.map(sample=>({label:new Date(sample.at).toLocaleTimeString('bn-BD',{hour:'2-digit',minute:'2-digit'}),value:sample.value})),'এই প্যানেল খোলার পরের সক্রিয় দর্শক',true);
    countryList($('today-countries'),today.countries);countryList($('active-countries'),stats.activeCountries);
    const history=$('day-history');history.replaceChildren();for(const day of stats.days.slice().reverse()){const row=text('tr','');row.append(text('td',day.date),text('td',day.collected===false?'গণনা হয়নি':num(day.visitors)),text('td',day.collected===false?'—':num(day.visits)));history.append(row);}
    $('status').textContent='সুরক্ষিত সংযোগ · আপডেট '+new Date(stats.updatedAt).toLocaleString('bn-BD');
  }
  async function loadStats(){if(busy)return;busy=true;$('refresh').disabled=true;try{stats=await read('/api/admin/stats?days='+period);drawStats();}catch{$('status').textContent='অ্যানালিটিক্স পাওয়া যাচ্ছে না। লগইন বা storage সংযোগ পরীক্ষা করুন।';$('live-status').textContent='লাইভ আপডেট সাময়িক বন্ধ';$('active-visitors').textContent='—';}finally{busy=false;$('refresh').disabled=false;}}
  function renderMembers(){const query=$('member-search').value.toLocaleLowerCase();$('members').replaceChildren();const visible=members.filter(m=>m.name.toLocaleLowerCase().includes(query));for(const member of visible){const row=text('li','');row.append(text('span',member.name));if(member.profile){const u=new URL(member.profile);if(u.protocol==='https:'&&['facebook.com','www.facebook.com'].includes(u.hostname)&&!u.username&&!u.password){const link=text('a','Profile ↗');link.href=u.href;link.target='_blank';link.rel='noopener noreferrer';row.append(link);}}$('members').append(row);}if(!visible.length)$('members').append(text('li',members.length?'এই নামে সদস্য পাওয়া যায়নি।':'যাচাইকৃত সদস্যতালিকা যোগ করুন।','hint'));}
  async function loadMembers(){try{const roster=await read('/api/admin/members');members=roster.members;$('member-count').textContent=num(members.length);$('roster-source').textContent=roster.source+(roster.updatedAt?' · আপডেট '+new Date(roster.updatedAt).toLocaleString('bn-BD'):'');renderMembers();}catch{$('roster-source').textContent='সদস্যতালিকা পাওয়া যাচ্ছে না।';}}

  function applyAds(s){
    $('ads-enabled').checked=s.enabled;$('ads-display').value=String(s.defaultExpanded);
    for(const id of ['rail','middle','footer']){const p=s.placements[id];$('ad-'+id+'-enabled').checked=p.enabled;$('ad-'+id+'-desktop').value=p.desktopCode;if(id!=='rail')$('ad-'+id+'-mobile').value=p.mobileCode;}
    $('ads-status').textContent=s.updatedAt?'প্রকাশিত · '+new Date(s.updatedAt).toLocaleString('bn-BD'):'চিহ্নিত তিন জায়গার বর্তমান ব্যানার চালু আছে।';$('publish-ads').disabled=false;
  }
  async function loadAds(){try{applyAds(await read('/api/admin/ads'));}catch{$('ads-status').textContent='বিজ্ঞাপনের সেটিংস পাওয়া যাচ্ছে না।';}}
  $('ads-form').addEventListener('submit',async event=>{
    event.preventDefault();$('publish-ads').disabled=true;$('ads-status').textContent='প্রকাশ করা হচ্ছে…';
    const placements=Object.fromEntries(['rail','middle','footer'].map(id=>[id,{enabled:$('ad-'+id+'-enabled').checked,desktopCode:$('ad-'+id+'-desktop').value,mobileCode:id==='rail'?'':$('ad-'+id+'-mobile').value}]));
    try{const response=await fetch('/api/admin/ads',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-Delta-Admin':'1'},body:JSON.stringify({enabled:$('ads-enabled').checked,defaultExpanded:$('ads-display').value==='true',provider:'placements',format:'728x90',customCode:'',placements})});if(!response.ok)throw new Error();applyAds(await response.json());}
    catch{$('ads-status').textContent='প্রকাশ করা যায়নি। কোড ও সংযোগ পরীক্ষা করুন।';}finally{$('publish-ads').disabled=false;}
  });
  $('member-search').addEventListener('input',renderMembers);
  $('refresh').addEventListener('click',loadStats);$('chart-metric').addEventListener('change',drawStats);$('period').addEventListener('change',()=>{period=Number($('period').value);loadStats();});
  $('save-roster').addEventListener('click',async()=>{
    const list=$('roster-input').value.split(/\r?\n/).filter(line=>line.trim()).map(line=>{const [name,profile='']=line.split('\t');return {name:name.trim(),profile:profile.trim()};});if(!list.length){$('roster-feedback').textContent='সংরক্ষণের আগে সদস্যদের নাম দিন।';return;}$('save-roster').disabled=true;
    try{const response=await fetch('/api/admin/members',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-Delta-Admin':'1'},body:JSON.stringify({members:list,source:$('source-input').value})});if(!response.ok)throw new Error('Save failed');$('roster-input').value='';await loadMembers();$('roster-feedback').textContent='Private সদস্যতালিকা সংরক্ষণ হয়েছে।';}catch{$('roster-feedback').textContent='সংরক্ষণ হয়নি। নাম ও profile URL পরীক্ষা করুন।';}finally{$('save-roster').disabled=false;}
  });
  setInterval(()=>{if(document.visibilityState==='visible')loadStats();},60000);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')loadStats();});
  loadStats();loadMembers();loadAds();
})();
