const ID=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE=/^20\d{2}-\d{2}-\d{2}$/;
function validDate(value){return typeof value==='string'&&DATE.test(value)&&new Date(value).toISOString().slice(0,10)===value;}
function cleanYouTubeVideos(list){
 if(!Array.isArray(list)||list.length<1||list.length>40)throw Error('Invalid YouTube video list');
 const seen=new Set();
 return list.map(v=>{
  if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!['videoId','label','playbackVerified','part'].includes(k))||typeof v.videoId!=='string'||!/^[A-Za-z0-9_-]{11}$/.test(v.videoId)||typeof v.playbackVerified!=='boolean')throw Error('Invalid YouTube video');
  if(seen.has(v.videoId))throw Error('Duplicate YouTube video');seen.add(v.videoId);
  const item={videoId:v.videoId,playbackVerified:v.playbackVerified};
  if(v.part!==undefined){if(!Number.isSafeInteger(v.part)||v.part<1||v.part>1000)throw Error('Invalid video part');item.part=v.part;}
  if(v.label!==undefined){if(typeof v.label!=='string'||v.label.length>160)throw Error('Invalid video label');if(v.label.trim())item.label=v.label.trim();}
  return item;
 });
}
function cleanDailymotionVideos(list){
 if(!Array.isArray(list)||list.length<1||list.length>40)throw Error('Invalid Dailymotion video list');
 const seen=new Set();
 return list.map(v=>{
  if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!['privateId','videoId','label','playbackVerified','part'].includes(k))||typeof v.playbackVerified!=='boolean')throw Error('Invalid Dailymotion video');
  const id=typeof v.privateId==='string'?v.privateId:v.videoId;
  if(typeof id!=='string'||!/^k[A-Za-z0-9]{4,39}$/.test(id)||seen.has(id))throw Error('Invalid or duplicate Dailymotion private video ID');seen.add(id);
  const item={privateId:id,videoId:id,visibility:'private',playbackVerified:v.playbackVerified};
  if(v.part!==undefined){if(!Number.isSafeInteger(v.part)||v.part<1||v.part>1000)throw Error('Invalid video part');item.part=v.part;}
  if(v.label!==undefined){if(typeof v.label!=='string'||v.label.length>160)throw Error('Invalid video label');if(v.label.trim())item.label=v.label.trim();}
  return item;
 });
}
function validateDocumentURL(value){const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||u.href.length>2048||[...u.searchParams.keys()].some(k=>/^(password|access_token|api_key|secret)$/i.test(k)))throw Error('Invalid file');return u.href;}
export function cleanArchivePatch(input){
 const allowed=new Set(['id','title','topicTitle','text','noteText','youtubeId','youtubeVideos','dailymotionVideos','expectedVideoParts','documentUrl','classDate','playbackVerified']);
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!allowed.has(k))||!ID.test(input.id||'')||input.id.length>100)throw Error('Invalid class');
 const p={};
 for(const [k,max]of [['title',500],['topicTitle',500],['text',50000],['noteText',80000]]){if(typeof input[k]!=='string'||input[k].length>max)throw Error('Invalid text');p[k]=input[k].trim();}
 if(!p.title)throw Error('Missing title');
 if(input.playbackVerified!==undefined&&typeof input.playbackVerified!=='boolean')throw Error('Invalid playback state');
 if(input.youtubeId&&input.youtubeVideos!==undefined)throw Error('Use one YouTube video format');
 if(input.youtubeId){
  if(!/^[A-Za-z0-9_-]{11}$/.test(input.youtubeId)||typeof input.playbackVerified!=='boolean')throw Error('Invalid video');
  p.youtubeId=input.youtubeId;p.youtubeVideos=[{videoId:input.youtubeId,playbackVerified:input.playbackVerified}];
 }
 if(input.youtubeVideos!==undefined){p.youtubeVideos=cleanYouTubeVideos(input.youtubeVideos);p.youtubeId=p.youtubeVideos[0].videoId;}
 if(input.dailymotionVideos!==undefined)p.dailymotionVideos=cleanDailymotionVideos(input.dailymotionVideos);
 if(input.expectedVideoParts!==undefined){if(!Number.isSafeInteger(input.expectedVideoParts)||input.expectedVideoParts<1||input.expectedVideoParts>40)throw Error('Invalid expected part count');p.expectedVideoParts=input.expectedVideoParts;}
 const clips=[...(p.youtubeVideos||[]),...(p.dailymotionVideos||[])];
 if(clips.length){p.playbackVerified=clips.every(v=>v.playbackVerified);p.videoStatus=p.playbackVerified?'ready':'uploaded-processing';}
 if(input.documentUrl)p.documentUrl=validateDocumentURL(input.documentUrl);
 if(input.classDate){if(!validDate(input.classDate))throw Error('Invalid date');p.classDate=input.classDate;p.classDateVerified=true;}
 return p;
}
export function cleanArchiveCreate(input){
 const allowed=new Set(['id','category','recordingSerial','topic','topicTitle','title','classDate','duration','text','noteText','dailymotionVideos','expectedVideoParts']);
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!allowed.has(k)))throw Error('Invalid new class');
 const date=input.classDate;
 if(!validDate(date)||input.id!=='class-'+date||input.category!=='recordings'||!Number.isSafeInteger(input.recordingSerial)||input.recordingSerial<1)throw Error('Invalid class identity');
 const day=new Date(date+'T00:00:00Z').getUTCDay();if(day!==0&&day!==5)throw Error('Class date is not on the regular schedule');
 for(const key of ['topic','topicTitle','title','text','noteText'])if(typeof input[key]!=='string'||input[key].length>(key==='noteText'?80000:50000))throw Error('Invalid class text');
 if(!input.title.trim()||!input.topicTitle.trim()||!input.topic.trim())throw Error('Class topic is required');
 if(input.duration!==undefined&&(typeof input.duration!=='string'||input.duration.length>30))throw Error('Invalid duration');
 if(!Number.isSafeInteger(input.expectedVideoParts)||input.expectedVideoParts<1||input.expectedVideoParts>40)throw Error('Invalid expected part count');
 const videos=cleanDailymotionVideos(input.dailymotionVideos);
 if(videos.length!==input.expectedVideoParts)throw Error('All video parts must be provided');
 return {id:input.id,category:'recordings',recordingSerial:input.recordingSerial,topic:input.topic.trim(),topicTitle:input.topicTitle.trim(),title:input.title.trim(),date,classDate:date,dateVerified:true,dateStatus:'verified',weekday:day===0?'Sunday':'Friday',duration:input.duration||'',relatedResourceIds:[],access:'preview',videoStatus:videos.every(v=>v.playbackVerified)?'ready':'uploaded-processing',expectedVideoParts:input.expectedVideoParts,dailymotionVideos:videos,text:input.text.trim(),noteText:input.noteText.trim()};
}
