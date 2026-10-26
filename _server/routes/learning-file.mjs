import {accountJSON,requireCourse,authPool} from '../learning-auth.mjs';
import {ARCHIVE_COURSE} from '../learning-content.mjs';
export async function GET(request){
 const key=new URL(request.url).searchParams.get('key');if(typeof key!=='string'||key.length>250||! /^(documents|notes|tools)\/[a-zA-Z0-9._-]+\.(pdf|md|txt|zip)$/.test(key))return accountJSON({error:'Not found'},404);
 try{const permission=await requireCourse(request,ARCHIVE_COURSE);if(permission.response)return permission.response;
  const {rows}=await authPool().query('SELECT name,mime,content FROM learning.resource_files WHERE path=$1 AND course_id=$2',[key,ARCHIVE_COURSE]);if(!rows[0])return accountJSON({error:'Not found'},404);
  const file=rows[0],bytes=file.content;const stream=new ReadableStream({start(controller){for(let at=0;at<bytes.length;at+=65536)controller.enqueue(bytes.subarray(at,at+65536));controller.close();}});
  return new Response(stream,{headers:{'Content-Type':file.mime,'Content-Disposition':(file.mime==='application/pdf'?'inline':'attachment')+'; filename="'+file.name.replace(/[^a-zA-Z0-9._-]/g,'_')+'"','Cache-Control':'private, no-store, max-age=0','Vary':'Cookie','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex,nofollow','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; sandbox"}});
 }catch{return accountJSON({error:'File unavailable'},503);}
}
