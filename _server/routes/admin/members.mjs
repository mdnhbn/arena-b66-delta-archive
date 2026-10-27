import {adminAccess} from '../../staff-access.mjs';
import {adminMutationAllowed,json,limitedJSON} from '../../security.mjs';
import {cleanRoster,readMemberRoster,saveMemberRoster} from '../../member-roster.mjs';
export async function GET(request){
 const access=await adminAccess(request,'members.manage');if(access.response)return access.response;
 try{return json(await readMemberRoster());}catch{return json({error:'Private roster unavailable'},503);}
}
export async function POST(request){
 const access=await adminAccess(request,'members.manage');if(access.response)return access.response;
 if(!adminMutationAllowed(request))return json({error:'Forbidden'},403);
 let input;try{input=cleanRoster(await limitedJSON(request,256000));}catch{return json({error:'Invalid member list or missing version'},400);}
 try{return json(await saveMemberRoster(input));}catch(error){return json({error:error.status===409?'Roster changed; reload before saving':'Could not save private roster'},error.status===409?409:503);}
}
