import {adminAllowed,json} from './security.mjs';
import {learningSession,authPool,profileFor} from './learning-auth.mjs';
import {recordActor} from './request-actor.mjs';
import {ROLE_PERMISSIONS,trustedManagementRequest,verifiedStaffIdentity} from './staff-policy.mjs';
export {ROLE_PERMISSIONS,courseScopeAllowed} from './staff-policy.mjs';
export async function adminAccess(request,permission){
 if(adminAllowed()){recordActor(process.env.CYBERNEST_OWNER_PROFILE_ID);return {owner:true,role:'super_admin',permissions:ROLE_PERMISSIONS.super_admin,courseIds:[],actorId:process.env.CYBERNEST_OWNER_PROFILE_ID};}
 if(!trustedManagementRequest(request))return {response:json({error:'Not found'},404)};
 try{const session=await learningSession(request);if(!session?.user?.id)return {response:json({error:'Not found'},404)};
 const access=await verifiedStaffIdentity(session,authPool());
 if(!access||!(Array.isArray(permission)?permission.some(p=>access.permissions.includes(p)):access.permissions.includes(permission)))return {response:json({error:'Not permitted'},403)};
 const actorId=await profileFor(session);recordActor(actorId);return {...access,actorId};
 }catch{return {response:json({error:'Management access unavailable'},503)};}
}
