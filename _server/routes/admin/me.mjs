import {adminAccess} from '../../staff-access.mjs';import {json} from '../../security.mjs';
export async function GET(request){const access=await adminAccess(request,'studio.open');if(access.response)return access.response;return json({role:access.role,owner:access.owner,permissions:access.permissions,courseIds:access.courseIds});}
