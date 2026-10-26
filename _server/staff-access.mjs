import {adminAllowed,json,PUBLIC_ORIGIN,PROJECT_ID} from './security.mjs';
import {learningSession,authPool,profileFor} from './learning-auth.mjs';
import {recordActor} from './request-actor.mjs';
import {configuredOwnerGitHubId,canonicalOwnerMatches} from './owner-identity.mjs';
export const ROLE_PERMISSIONS=Object.freeze({
 super_admin:['studio.open','analytics.aggregate','analytics.history','courses.manage','lessons.manage','archive.manage','ads.manage','students.manage','members.manage','settings.manage','payments.manage','team.manage','integrations.read'],
 admin:['studio.open','analytics.aggregate','analytics.history','courses.manage','lessons.manage','archive.manage','ads.manage','students.manage','members.manage','settings.manage','payments.manage','integrations.read'],
 course_manager:['studio.open','analytics.aggregate','courses.manage','lessons.manage','archive.manage'],
 editor:['studio.open','analytics.aggregate','lessons.manage','archive.manage'],
 marketer:['studio.open','analytics.aggregate','ads.manage'],
 finance_manager:['studio.open','analytics.aggregate','payments.manage'],
 analyst:['studio.open','analytics.aggregate']
});
export function courseScopeAllowed(access,courseId){return access.owner||!access.courseIds?.length||access.courseIds.includes(courseId);}
export async function adminAccess(request,permission){
 if(adminAllowed()){recordActor(process.env.CYBERNEST_OWNER_PROFILE_ID);return {owner:true,role:'super_admin',permissions:ROLE_PERMISSIONS.super_admin,courseIds:[],actorId:process.env.CYBERNEST_OWNER_PROFILE_ID};}
 if(!request||process.env.VERCEL_ENV!=='production'||process.env.VERCEL_PROJECT_ID!==PROJECT_ID||new URL(request.url).origin!==PUBLIC_ORIGIN)return {response:json({error:'Not found'},404)};
 try{const session=await learningSession(request);if(!session?.user?.id)return {response:json({error:'Not found'},404)};
 if(configuredOwnerGitHubId()){
  const identity=await authPool().query('SELECT a."providerId",a."accountId",v.verified FROM public.cybernest_account a JOIN learning.verified_identity v ON v.id=a."userId" WHERE a."userId"=$1 AND a."providerId"=$2 AND a."accountId"=$3 LIMIT 1',[session.user.id,'github',configuredOwnerGitHubId()]);
  if(canonicalOwnerMatches(identity.rows[0])){const actorId=await profileFor(session);recordActor(actorId);return {owner:true,role:'super_admin',permissions:ROLE_PERMISSIONS.super_admin,courseIds:[],actorId,userId:session.user.id};}
 }
 const {rows}=await authPool().query('SELECT r.role,r.course_ids,v.verified FROM learning.staff_roles r JOIN learning.verified_identity v ON v.id=r.user_id WHERE r.user_id=$1 AND r.revoked_at IS NULL',[session.user.id]),role=rows[0]?.role,permissions=ROLE_PERMISSIONS[role];
 if(!rows[0]?.verified||!(Array.isArray(permission)?permission.some(p=>permissions?.includes(p)):permissions?.includes(permission)))return {response:json({error:'Not permitted'},403)};
 const actorId=await profileFor(session);recordActor(actorId);return {owner:false,role,permissions,courseIds:rows[0].course_ids||[],actorId,userId:session.user.id};
 }catch{return {response:json({error:'Management access unavailable'},503)};}
}
