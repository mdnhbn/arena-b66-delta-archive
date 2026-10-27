import {PUBLIC_ORIGINS,json} from '../security.mjs';
// Retired duplicate collector. Current clients use consented /api/activity.
export async function POST(request){
 if(!PUBLIC_ORIGINS.includes(request.headers.get('origin'))||request.headers.get('sec-fetch-site')!=='same-origin')return json({error:'Forbidden'},403);
 if(request.headers.get('dnt')==='1'||request.headers.get('sec-gpc')==='1')return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
 return json({error:'Legacy visitor collection retired; use consented activity'},410);
}
