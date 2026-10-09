// Banners are restricted to the three marked dashboard locations.
(()=>{
  const ids=['rail','middle','footer'],origin='https://arena-b66-delta-ads.vercel.app';let settings=null;const mounted=new Map();
  const element=(tag,text,cls)=>{const el=document.createElement(tag);if(text)el.textContent=text;if(cls)el.className=cls;return el;};
  function dispose(id){const item=mounted.get(id);if(!item)return;item.observer?.disconnect();item.frame.removeAttribute('src');item.target.replaceChildren();item.target.hidden=true;mounted.delete(id);}
  function mount(target,id){
    const previous=mounted.get(id);
    const hide=()=>{dispose(id);target.hidden=true;};
    if(!settings?.enabled||!settings.placements?.[id]?.enabled){hide();return;}
    try{if(sessionStorage.getItem('delta-ad-hidden:'+id)==='1'){hide();return;}}catch{}
    if(id==='rail'&&document.documentElement.clientWidth<=760){hide();return;}
    target.hidden=false;
    const space=id==='rail'?180:target.getBoundingClientRect().width,mobile=id!=='rail'&&space<750,variant=mobile?'mobile':'desktop';
    const width=id==='rail'?160:mobile?320:728,height=id==='rail'?600:mobile?50:90;
    if(id!=='rail'&&space<width+2){hide();return;}
    if(previous?.target===target&&previous.variant===variant)return;dispose(id);target.hidden=false;
    const caption=element('div',null,'sponsor-caption'),label=element('span','বিজ্ঞাপন','ad-label'),controls=element('div',null,'ad-controls'),toggle=element('button','ছোট করুন','ad-toggle'),close=element('button','×','ad-close'),frame=element('iframe',null,'ad-banner');
    toggle.type=close.type='button';close.setAttribute('aria-label','বিজ্ঞাপন বন্ধ করুন');
    frame.id='banner-'+id;frame.title='বিজ্ঞাপন';frame.width=width;frame.height=height;frame.style.width=width+'px';frame.style.height=height+'px';
    frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');frame.setAttribute('referrerpolicy','no-referrer');frame.setAttribute('allow',"autoplay 'none'; camera 'none'; microphone 'none'; geolocation 'none'");toggle.setAttribute('aria-controls',frame.id);
    controls.append(toggle,close);caption.append(label,controls);target.append(caption,frame);target.hidden=false;
    const item={target,frame,variant,observer:null,visible:false,loaded:false};mounted.set(id,item);
    const load=()=>{if(item.visible&&!frame.hidden&&!item.loaded){frame.src=origin+'/api/custom?'+new URLSearchParams({slot:id,variant});item.loaded=true;}};
    function expanded(value){toggle.setAttribute('aria-expanded',String(value));toggle.textContent=value?'ছোট করুন':'দেখুন';frame.hidden=!value;load();}
    toggle.addEventListener('click',()=>expanded(toggle.getAttribute('aria-expanded')!=='true'));
    close.addEventListener('click',()=>{dispose(id);try{sessionStorage.setItem('delta-ad-hidden:'+id,'1');}catch{}});
    expanded(settings.defaultExpanded!==false);
    if('IntersectionObserver' in window){item.observer=new IntersectionObserver(entries=>{item.visible=entries.some(entry=>entry.isIntersecting);load();},{threshold:0.01});item.observer.observe(target);}else{item.visible=true;load();}
  }
  function render(){for(const id of ids){const target=document.querySelector('[data-ad-position="'+id+'"]');if(!document.body.classList.contains('home-banner-layout')||!target){dispose(id);continue;}mount(target,id);}}
  window.addEventListener('delta:page',render);window.addEventListener('resize',render);
  fetch('/api/ads-config',{cache:'no-store',credentials:'omit'}).then(async response=>{if(response.ok){settings=await response.json();render();}}).catch(()=>{});
})();
