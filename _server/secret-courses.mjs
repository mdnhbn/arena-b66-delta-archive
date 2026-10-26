import {readManagedCourses,saveManagedCourses} from './managed-catalog.mjs';
import {get,put,BlobPreconditionFailedError} from '@vercel/blob';
const path='settings/secret-courses.json';
export const CATEGORIES=Object.freeze(['ai','hacking','marketing','editing','trading','coding','design','ecommerce','youtube','other']);
export const DEFAULT_COURSES=[{id:'arena-b66-delta',title:'Arena Web Security — Batch 66 Delta',category:'hacking',description:'Class videos, notes, documents and tools',tags:['cyber security','ethical hacking','bangla','web security','arena','delta'],url:'https://arena-b66-delta-archive.vercel.app/#classes'}];
function cleanText(value,max){if(typeof value!=='string')throw new Error('Invalid text');const text=value.trim().replace(/[\u0000-\u001f\u007f]/g,'');if(text.length>max)throw new Error('Text too long');return text;}
export function cleanCourses(input){
 if(!Array.isArray(input)||input.length>1500)throw new Error('Maximum 1500 courses');const ids=new Set();
 return input.map(item=>{
  if(!item||typeof item!=='object'||Array.isArray(item)||Object.keys(item).some(k=>!['id','title','category','description','tags','url','categories','serial','sourceUrl'].includes(k)))throw new Error('Invalid course');
  const id=cleanText(item.id,64),title=cleanText(item.title,500),description=cleanText(item.description,300);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)||ids.has(id)||!title||!CATEGORIES.includes(item.category))throw new Error('Invalid course identity');ids.add(id);
  if(!Array.isArray(item.tags)||item.tags.length>20)throw new Error('Invalid tags');const tags=item.tags.map(t=>cleanText(t,60)).filter(Boolean);
  const url=new URL(item.url);if(url.protocol!=='https:'||url.username||url.password||url.href.length>2048)throw new Error('HTTPS course link required');
  if([...url.searchParams.keys()].some(k=>/^(?:password|access_token|api_key|secret)$/i.test(k)))throw new Error('Private credential in link');
  const categories=[...new Set(item.categories||[item.category])];if(!Array.isArray(item.categories||[])||categories.length>10||!categories.length||categories.some(c=>!CATEGORIES.includes(c))||!categories.includes(item.category))throw new Error('Invalid categories');let serial;if(item.serial!==undefined){if(!Number.isSafeInteger(item.serial)||item.serial<1||item.serial>1000000)throw new Error('Invalid serial');serial=item.serial;}let sourceUrl;if(item.sourceUrl){const u=new URL(item.sourceUrl);if(u.protocol!=='https:'||u.username||u.password||u.href.length>2048||[...u.searchParams.keys()].some(k=>/^(?:password|access_token|api_key|secret)$/i.test(k)))throw new Error('Invalid source');sourceUrl=u.href;}return {id,title,category:item.category,description,tags,url:url.href,...(item.categories?{categories}:{}),...(serial?{serial}:{}),...(sourceUrl?{sourceUrl}:{})};
 });
}
async function stored(){const file=await get(path,{access:'private',useCache:false});if(!file||file.statusCode===404)return {file:null,data:{courses:DEFAULT_COURSES,updatedAt:null}};if(file.statusCode!==200)throw new Error('Storage unavailable');const data=await new Response(file.stream).json();return {file,data:{courses:cleanCourses(data.courses),updatedAt:data.updatedAt}};}
export async function readCourses(){return readManagedCourses();}
export async function saveCourses(courses,expectedUpdatedAt){return saveManagedCourses(cleanCourses(courses),expectedUpdatedAt);}
