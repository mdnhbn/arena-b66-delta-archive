import {adminAccess} from '../../staff-access.mjs';
import {json} from '../../security.mjs';
import {siteFrom} from '../../sites.mjs';
import {readActivityStats} from '../../activity-stats.mjs';
export async function GET(request){
 const access=await adminAccess(request,'analytics.aggregate');if(access.response)return access.response;
 let site;try{site=siteFrom(request);}catch{return json({error:'Invalid site'},400);}
 const period=new URL(request.url).searchParams.get('days')==='28'?28:7;
 try{return json(await readActivityStats(site,period));}
 catch{return json({error:'Visitor statistics unavailable'},503);}
}
