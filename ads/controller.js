(() => {
  const slot=document.querySelector('.sponsor-slot');
  const frame=slot?.querySelector('[data-ad-frame]');
  const toggle=slot?.querySelector('.ad-toggle');
  if(!slot||!frame||!toggle)return;
  try{if(sessionStorage.getItem('delta-ad-hidden')==='1'){slot.hidden=true;return;}}catch{}
  // Keep the approved 300x250 creative size. Load only after visitor expansion.
  const origin='https://arena-b66-delta-ads.vercel.app';
  const providers=[origin+'/banner.html',origin+'/advertica.html'];
  let selected=0,loaded=false;
  try{const next=Number(localStorage.getItem('delta-ad-next')||0);selected=Number.isSafeInteger(next)&&next>=0?next%providers.length:0;}catch{}
  toggle.addEventListener('click',()=>{
    const expand=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(expand));
    toggle.textContent=expand?'ছোট করুন':'দেখুন ↗';
    frame.hidden=!expand;
    if(expand&&!loaded){frame.src=providers[selected];loaded=true;try{localStorage.setItem('delta-ad-next',String((selected+1)%providers.length));}catch{}}
  });
  window.addEventListener('message',event=>{
    if(slot.hidden||frame.getAttribute('src')!==providers[1])return;
    if(event.origin!==origin||event.source!==frame.contentWindow)return;
    if(event.data?.type!=='delta-ad-unavailable'||event.data?.path!=='/ads/advertica.html')return;
    frame.src=providers[0];
  });
  slot.querySelector('.ad-close')?.addEventListener('click',()=>{frame.removeAttribute('src');slot.hidden=true;try{sessionStorage.setItem('delta-ad-hidden','1');}catch{}});
})();
