export async function GET(request){
  const params=new URL(request.url).searchParams,slot=params.get('slot'),variant=params.get('variant')||'desktop';
  if(!['rail','middle','footer'].includes(slot)||!['desktop','mobile'].includes(variant)||slot==='rail'&&variant==='mobile')return new Response(null,{status:404});
  try{
    const response=await fetch('https://arena-b66-delta-archive.vercel.app/api/ad-code?'+new URLSearchParams({slot,variant}),{cache:'no-store',signal:AbortSignal.timeout(8000)});
    if(response.status===204)return new Response(null,{status:204});
    if(!response.ok)throw new Error('Unavailable');
    const expected=slot==='rail'?'160x600':variant==='mobile'?'320x50':'728x90',data=await response.json();
    if(typeof data.code!=='string'||data.code.length>20000||data.format!==expected)throw new Error('Invalid banner');
    return new Response('<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>বিজ্ঞাপন</title><style>html,body{margin:0;padding:0;width:100%;height:100%}body{display:grid;place-items:center}</style></head><body>'+data.code+'</body></html>',{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex,nofollow','Referrer-Policy':'no-referrer'}});
  }catch{return new Response(null,{status:503});}
}
