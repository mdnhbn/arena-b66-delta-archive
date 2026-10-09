import {PROJECT_ID,json} from '../_server/security.mjs';
import {readAds} from '../_server/ad-store.mjs';
export async function GET(){
  if(process.env.VERCEL_ENV!=='production' || process.env.VERCEL_PROJECT_ID!==PROJECT_ID)return json({error:'Not found'},404);
  try{const settings=await readAds();if(!settings.enabled || settings.provider!=='custom')return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});return json({code:settings.customCode,format:settings.format});}catch{return json({error:'Unavailable'},503);}
}
