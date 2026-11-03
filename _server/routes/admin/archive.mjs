import {adminAccess,privateCourseAllowed} from '../../staff-access.mjs';
import {adminMutationAllowed,json,limitedJSON} from '../../security.mjs';
import {ownerPool} from '../../learning-admin.mjs';
import {controlValue,saveControl} from '../../control-store.mjs';
import {cleanArchivePatch,cleanArchiveCreate} from '../../archive-control.mjs';
import {ARCHIVE_COURSE} from '../../course-policy.mjs';
import {archiveSnapshot} from '../../archive-snapshot.mjs';

export async function GET(request){
 const access=await adminAccess(request,'archive.manage');
 if(access.response)return access.response;
 if(!privateCourseAllowed(access,ARCHIVE_COURSE))return json({error:'Not permitted'},403);
 try{
  const [snapshot,saved]=await Promise.all([
   archiveSnapshot(ownerPool()),
   controlValue('archive-edits')
  ]);
  const payload=saved?.payload||{};
  return json({entries:[
   ...snapshot.entries.map(e=>({...e,...payload[e.id]})),
   ...(Array.isArray(payload.__newEntries)?payload.__newEntries:[])
  ],version:saved?.version||0});
 }catch{return json({error:'Archive unavailable'},503);}
}

export async function POST(request){
 const access=await adminAccess(request,'archive.manage');
 if(access.response)return access.response;
 if(!privateCourseAllowed(access,ARCHIVE_COURSE))return json({error:'Not permitted'},403);
 if(!adminMutationAllowed(request))return json({error:'Forbidden'},403);
 let input,patch;
 try{
  input=await limitedJSON(request,180000);
  if(!Number.isInteger(input.version))throw Error();
  if(input.create===true)patch=cleanArchiveCreate(input.entry);
  else patch=cleanArchivePatch(input.entry);
 }catch{return json({error:'Invalid class information'},400);}
 try{
  const old=await controlValue('archive-edits');
  const savedPayload=old?.payload||{};
  const snapshot=await archiveSnapshot(ownerPool());
  const sourceEntries=snapshot.entries;
  if(input.create===true){
   const extra=Array.isArray(savedPayload.__newEntries)?savedPayload.__newEntries:[];
   if(sourceEntries.some(e=>e.id===patch.id)||extra.some(e=>e.id===patch.id))return json({error:'Class already exists'},409);
   const serials=[...sourceEntries,...extra].filter(e=>e.category==='recordings'&&Number.isSafeInteger(e.recordingSerial)).map(e=>e.recordingSerial);
   const nextSerial=Math.max(0,...serials)+1;
   if(patch.recordingSerial!==nextSerial)return json({error:'Class serial changed; reload the editor'},409);
   const next={...savedPayload,__newEntries:[...extra,patch]};
   const saved=await saveControl('archive-edits',next,input.version);
   return json({saved:true,created:true,version:saved.version});
  }
  const sourceExists=sourceEntries.some(e=>e.id===patch.id);
  if(sourceExists){
   const saved=await saveControl('archive-edits',{...savedPayload,[patch.id]:patch},input.version);
   return json({saved:true,version:saved.version});
  }
  const extra=Array.isArray(savedPayload.__newEntries)?savedPayload.__newEntries:[];
  const index=extra.findIndex(e=>e.id===patch.id);
  if(index<0)return json({error:'Unknown class'},404);
  const updated=extra.map((e,i)=>i===index?{...e,...patch}:e);
  const saved=await saveControl('archive-edits',{...savedPayload,__newEntries:updated},input.version);
  return json({saved:true,version:saved.version});
 }catch(e){
  return json({error:e.status===409?'Changed elsewhere; reload':'Could not save class'},e.status===409?409:503);
 }
}
