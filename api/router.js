import * as route0 from '../_server/routes/account.mjs';
import * as route1 from '../_server/routes/ad-code.mjs';
import * as route2 from '../_server/routes/admin/ads.mjs';
import * as route3 from '../_server/routes/admin/courses.mjs';
import * as route4 from '../_server/routes/admin/curriculum.mjs';
import * as route5 from '../_server/routes/admin/enrollments.mjs';
import * as route6 from '../_server/routes/admin/members.mjs';
import * as route7 from '../_server/routes/admin/page.mjs';
import * as route8 from '../_server/routes/admin/stats.mjs';
import * as route9 from '../_server/routes/ads-config.mjs';
import * as route10 from '../_server/routes/enrollment.mjs';
import * as route11 from '../_server/routes/learning-auth.mjs';
import * as route12 from '../_server/routes/learning-courses.mjs';
import * as route13 from '../_server/routes/learning-curriculum.mjs';
import * as route14 from '../_server/routes/learning-file.mjs';
import * as route15 from '../_server/routes/learning-library.mjs';
import * as route16 from '../_server/routes/secret/courses.mjs';
import * as route17 from '../_server/routes/secret/curriculum.mjs';
import * as route18 from '../_server/routes/secret/visit.mjs';
import * as route19 from '../_server/routes/visit.mjs';
import * as archiveRoute from '../_server/routes/admin/archive.mjs';
import * as paymentRoute from '../_server/routes/admin/payments.mjs';
import * as operationRoute from '../_server/routes/admin/operations.mjs';
import * as configRoute from '../_server/routes/site-config.mjs';
import {withRequestActor} from '../_server/request-actor.mjs';
import * as campaignsRoute from '../_server/routes/admin/campaigns.mjs';
import * as publicCampaignsRoute from '../_server/routes/ad-campaigns.mjs';
import * as campaignCodeRoute from '../_server/routes/ad-campaign-code.mjs';
import * as providersRoute from '../_server/routes/auth-providers.mjs';
import * as integrationsRoute from '../_server/routes/admin/integrations.mjs';
import * as teamRoute from '../_server/routes/admin/team.mjs';
import * as meRoute from '../_server/routes/admin/me.mjs';
import * as studioRoute from '../_server/routes/staff/page.mjs';
import * as activityRoute from '../_server/routes/activity.mjs';
import * as historyRoute from '../_server/routes/admin/history.mjs';
import {operations,blockedFeature,unavailable} from '../_server/operations.mjs';
const routes={"account":route0,"ad-code":route1,"admin/ads":route2,"admin/courses":route3,"admin/curriculum":route4,"admin/enrollments":route5,"admin/members":route6,"admin/page":route7,"admin/stats":route8,"ads-config":route9,"enrollment":route10,"learning-auth":route11,"learning-courses":route12,"learning-curriculum":route13,"learning-file":route14,"learning-library":route15,"secret/courses":route16,"secret/curriculum":route17,"secret/visit":route18,"visit":route19};
async function handler(request){
 const url=new URL(request.url),route=url.searchParams.get('__route');
 if(typeof route!=='string'||route.length>160||route.split('/').some(part=>! /^[a-z0-9-]+$/.test(part)))return new Response(null,{status:404});
 url.searchParams.delete('__route');url.pathname='/api/'+route;
 const destination=route==='admin/campaigns'?campaignsRoute:route==='ad-campaigns'?publicCampaignsRoute:route==='ad-campaign-code'?campaignCodeRoute:route==='auth-providers'?providersRoute:route==='admin/integrations'?integrationsRoute:route==='admin/team'?teamRoute:route==='admin/me'?meRoute:route==='staff/page'?studioRoute:route==='activity'?activityRoute:route==='admin/history'?historyRoute:route==='admin/archive'?archiveRoute:route==='admin/payments'?paymentRoute:route==='admin/operations'?operationRoute:route==='site-config'?configRoute:route.startsWith('auth/')?routes['learning-auth']:routes[route];
 if(!destination?.[request.method])return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});
 if(!route.startsWith('admin/')&&!route.startsWith('staff/')&&route!=='site-config'&&route!=='activity'&&route!=='auth-providers'&&!['visit','secret/visit','account','auth/get-session','auth/sign-out'].includes(route)){
  try{const {settings}=await operations();if(blockedFeature(route,url.pathname,settings))return unavailable(settings.message);}catch{return unavailable('সেবা সাময়িকভাবে পাওয়া যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।');}
 }
 if(route.startsWith('auth/')){url.pathname='/api/learning-auth';url.searchParams.set('path',route.slice(5));}
 if(!destination?.[request.method])return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});
 return destination[request.method](new Request(url,request));
}
const wrapped=request=>withRequestActor(()=>handler(request));export {wrapped as GET,wrapped as POST};
