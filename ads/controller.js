(async()=>{
  const slot=document.querySelector('.sponsor-slot'),frame=slot?.querySelector('[data-ad-frame]'),toggle=slot?.querySelector('.ad-toggle');
  if(!slot||!frame||!toggle)return;slot.hidden=true;
  try{if(sessionStorage.getItem('delta-ad-hidden')==='1')return;}catch{}
  let settings;
  try{const response=await fetch('/api/ads-config',{cache:'no-store',credentials:'omit'});if(!response.ok)return;settings=await response.json();}catch{return;}
  if(settings?.enabled!==true || !['rotate','adsterra','advertica','custom'].includes(settings.provider) || typeof settings.defaultExpanded!=='boolean' || !['300x250','320x50','320x100'].includes(settings.format))return;
  const origin='https://arena-b66-delta-ads.vercel.app',providers=[origin+'/banner.html',origin+'/advertica.html',origin+'/api/custom'];
  let selected=settings.provider==='custom'?2:settings.provider==='advertica'?1:0,loaded=false;
  if(settings.provider==='rotate')try{const next=Number(localStorage.getItem('delta-ad-next')||0);selected=Number.isSafeInteger(next)&&next>=0?next%2:0;}catch{}
  const [width,height]=settings.format.split('x').map(Number);
  frame.width=width;frame.height=height;frame.style.width=width+'px';frame.style.height=height+'px';slot.style.setProperty('--ad-width',width+'px');slot.classList.toggle('ad-wide',width===320);
  if(width>document.documentElement.clientWidth)return;slot.hidden=false;
  function setExpanded(expand){toggle.setAttribute('aria-expanded',String(expand));toggle.textContent=expand?'ছোট করুন':'দেখুন ↗';frame.hidden=!expand;if(expand&&!loaded){frame.src=providers[selected];loaded=true;if(settings.provider==='rotate')try{localStorage.setItem('delta-ad-next',String((selected+1)%2));}catch{}}}
  toggle.addEventListener('click',()=>setExpanded(toggle.getAttribute('aria-expanded')!=='true'));setExpanded(settings.defaultExpanded);
  window.addEventListener('message',event=>{
    if(slot.hidden||frame.getAttribute('src')!==providers[1]||event.origin!==origin||event.source!==frame.contentWindow||event.data?.type!=='delta-ad-unavailable'||event.data?.path!=='/ads/advertica.html')return;
    if(settings.provider==='rotate')frame.src=providers[0];else{frame.removeAttribute('src');slot.hidden=true;}
  });
  slot.querySelector('.ad-close')?.addEventListener('click',()=>{frame.removeAttribute('src');slot.hidden=true;try{sessionStorage.setItem('delta-ad-hidden','1');}catch{}});
})();
