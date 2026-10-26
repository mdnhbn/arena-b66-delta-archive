import {readFileSync} from 'node:fs';
import {authPool} from './learning-auth.mjs';
import {operations} from './operations.mjs';
export const ARCHIVE_COURSE='arena-b66-delta';
const preview=JSON.parse(readFileSync(new URL('./archive-preview.json',import.meta.url),'utf8'));
const ALLOWED=['id','category','recordingSerial','topic','topicTitle','title','date','classDate','verifiedClassDate','dateVerified','dateSource','dateStatus','weekday','duration','relatedTopics','relatedRecordingId','relatedRecordingIds','relatedResourceIds','classType'];
export function previewEntry(entry){const value={};for(const key of ALLOWED)if(entry[key]!==undefined)value[key]=entry[key];value.access='preview';value.videoStatus='enrollment-required';value.text='ক্লাসের বিষয়বস্তু দেখুন। সম্পূর্ণ ভিডিও, নোট ও ফাইল পেতে সাইন ইন এবং কোর্সে ভর্তির অনুমতি প্রয়োজন।';return value;}
export function protectedURL(value){
 if(typeof value!=='string')return value;
 try{const u=new URL(value,'https://cybernest-learn.vercel.app');if(['cybernest-learn.vercel.app','arena-b66-delta-archive.vercel.app'].includes(u.hostname)&&/^\/(?:documents|notes|tools)\/[a-zA-Z0-9._/-]+$/.test(u.pathname))return '/api/learning-file?key='+encodeURIComponent(u.pathname.slice(1));}catch{}return value;
}
function rewriteFiles(value){if(typeof value==='string')return protectedURL(value);if(Array.isArray(value))return value.map(rewriteFiles);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,rewriteFiles(v)]));return value;}
export async function archiveContent(grants=new Set()){
 const allowed=grants.has(ARCHIVE_COURSE);
 if(!allowed)return structuredClone(preview);
 const {rows}=await authPool().query("SELECT payload FROM learning.source_snapshots WHERE payload ? 'entries' AND jsonb_typeof(payload->'entries')='array' LIMIT 1");
 if(!rows[0])throw Error('Archive unavailable');
 const archive=structuredClone(rows[0].payload);
 const {settings}=await operations();if(!settings.enabled.videos)for(const e of archive.entries){for(const key of ['youtubeId','pendingYoutubeId','youtubeVideos','dailymotionVideos','videoUrl','recordingUrl'])delete e[key];e.videoStatus='maintenance';}
 const result={updatedAt:archive.updatedAt,title:'CyberNest',entries:archive.entries.map(e=>allowed?{...rewriteFiles(e),access:'granted'}:previewEntry(e)),access:{courseId:ARCHIVE_COURSE,granted:allowed}};
 if(archive.syllabus){result.syllabus=structuredClone(archive.syllabus);if(allowed)result.syllabus=rewriteFiles(result.syllabus);else{delete result.syllabus.documentUrl;delete result.syllabus.sourceUrl;for(const s of result.syllabus.stages||[]){delete s.notes;delete s.resources;}}}
 result.schedule={exceptions:[]};result.studyGuideAudit=allowed?archive.studyGuideAudit:{};return result;
}
export async function vaultCatalog(){const {rows}=await authPool().query("SELECT id,serial,title,payload FROM learning.courses WHERE space='secret' ORDER BY serial");return rows.map(({id,serial,title,payload})=>({id,serial,title,category:payload.category||'other',categories:payload.categories||[],description:(payload.description||'').slice(0,250),tags:payload.tags||[],url:'https://cybernest-learn.vercel.app/vault/#course/'+id,access:'preview'}));}
export async function vaultCurriculum(courseId){const {settings}=await operations();const {rows}=await authPool().query('SELECT id,serial,title,payload FROM learning.lessons WHERE course_id=$1 ORDER BY serial',[courseId]);return {courseId,lessons:rows.map(r=>({...r.payload,id:r.id,serial:r.serial,title:r.title,...!settings.enabled.videos?{videos:[]}:{} ,...!settings.enabled.resources?{documents:[],tools:[]}:{} }))};}
export async function vaultPreview(courseId){const {rows}=await authPool().query("SELECT id,serial,title FROM learning.lessons WHERE course_id=$1 ORDER BY serial",[courseId]);return {courseId,access:'preview',lessons:rows.map(r=>({id:r.id,serial:r.serial,title:r.title,videos:[],documents:[],tools:[]}))};}
