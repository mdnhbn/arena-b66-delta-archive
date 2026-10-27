import {ownerPool} from './learning-admin.mjs';
import {auditActorId} from './request-actor.mjs';
import {cleanMembers} from './security.mjs';
const key='facebook-delta';
export function cleanRoster(input){
 if(!input||!Number.isSafeInteger(input.version)||input.version<0)throw Error('Roster version required');
 const members=cleanMembers(input.members);if(!members.length)throw Error('Empty replacement not allowed');
 const source=typeof input.source==='string'?input.source.trim().replace(/[\u0000-\u001f\u007f]/g,'').slice(0,160):'Owner import';
 return {members,source,version:input.version};
}
export async function readMemberRoster(db=ownerPool()){
 const {rows}=await db.query('SELECT payload,version,updated_at FROM learning.member_rosters WHERE key=$1',[key]);
 const row=rows[0];if(!row)return {members:[],source:'সদস্যতালিকা এখনও যোগ করা হয়নি',version:0,updatedAt:null};
 return {members:cleanMembers(row.payload.members),source:String(row.payload.source||'').slice(0,160),version:row.version,updatedAt:row.updated_at};
}
export async function saveMemberRoster(input,pool=ownerPool(),actorId=auditActorId()){
 const data=cleanRoster(input),db=await pool.connect();
 try{await db.query('BEGIN');await db.query('SELECT pg_advisory_xact_lock(hashtext($1))',['member-roster:'+key]);
  const current=(await db.query('SELECT payload,version FROM learning.member_rosters WHERE key=$1 FOR UPDATE',[key])).rows[0];
  if(data.version!==(current?.version||0)){const error=Error('Roster changed; reload before saving');error.status=409;throw error;}
  if(current)await db.query('INSERT INTO learning.member_roster_revisions(key,payload,version) VALUES($1,$2::jsonb,$3)',[key,JSON.stringify(current.payload),current.version]);
  const payload={members:data.members,source:data.source},result=(await db.query('INSERT INTO learning.member_rosters(key,payload) VALUES($1,$2::jsonb) ON CONFLICT(key) DO UPDATE SET payload=excluded.payload,version=learning.member_rosters.version+1,updated_at=now() RETURNING version,updated_at',[key,JSON.stringify(payload)])).rows[0];
  await db.query("INSERT INTO learning.admin_audit(actor_id,action,entity_type,entity_id,metadata) VALUES($1,'update','member_roster',$2,$3::jsonb)",[actorId,key,JSON.stringify({count:data.members.length,version:result.version})]);
  await db.query('COMMIT');return {saved:data.members.length,version:result.version,updatedAt:result.updated_at};
 }catch(error){await db.query('ROLLBACK');throw error;}finally{db.release();}
}
