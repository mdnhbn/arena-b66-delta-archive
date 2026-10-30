import {PUBLIC_ORIGIN,PROJECT_ID} from './security.mjs';
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
export function trustedManagementRequest(request){
 return !!request&&process.env.VERCEL_ENV==='production'&&process.env.VERCEL_PROJECT_ID===PROJECT_ID&&new URL(request.url).origin===PUBLIC_ORIGIN;
}
// Only server-verified account bindings and current database roles establish staff identity.
// Reading course access never creates an enrollment, payment or permanent staff grant.
export async function verifiedStaffIdentity(session,database){
 if(!session?.user?.id)return null;
 if(configuredOwnerGitHubId()){
  const {rows}=await database.query('SELECT a."providerId",a."accountId",v.verified FROM public.cybernest_account a JOIN learning.verified_identity v ON v.id=a."userId" WHERE a."userId"=$1 AND a."providerId"=$2 AND a."accountId"=$3 LIMIT 1',[session.user.id,'github',configuredOwnerGitHubId()]);
  if(canonicalOwnerMatches(rows[0]))return {owner:true,role:'super_admin',permissions:ROLE_PERMISSIONS.super_admin,courseIds:[],userId:session.user.id};
 }
 const {rows}=await database.query('SELECT r.role,r.course_ids,v.verified FROM learning.staff_roles r JOIN learning.verified_identity v ON v.id=r.user_id WHERE r.user_id=$1 AND r.revoked_at IS NULL',[session.user.id]);
 const row=rows[0];
 if(row?.verified!==true||!Object.hasOwn(ROLE_PERMISSIONS,row.role)||!Array.isArray(row.course_ids)||row.course_ids.some(id=>typeof id!=='string'||id.length>64||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)))return null;
 return {owner:false,role:row.role,permissions:ROLE_PERMISSIONS[row.role],courseIds:row.course_ids,userId:session.user.id};
}
