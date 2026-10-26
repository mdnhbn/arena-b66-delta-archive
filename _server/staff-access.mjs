import {adminAllowed,json,PUBLIC_ORIGIN,PROJECT_ID} from './security.mjs';
import {learningSession,authPool,profileFor} from './learning-auth.mjs';
import {recordActor} from './request-actor.mjs';
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
 const {rows}=await authPool().query('SELECT role,course_ids FROM learning.staff_roles WHERE user_id=$1 AND revoked_at IS NULL',[session.user.id]),role=rows[0]?.role,permissions=ROLE_PERMISSIONS[role];
 if(!session.user.emailVerified||!(Array.isArray(permission)?permission.some(p=>permissions?.includes(p)):permissions?.includes(permission)))return {response:json({error:'Not permitted'},403)};
 const actorId=await profileFor(session);recordActor(actorId);return {owner:false,role,permissions,courseIds:rows[0].course_ids||[],actorId,userId:session.user.id};
 }catch{return {response:json({error:'Management access unavailable'},503)};}
}
