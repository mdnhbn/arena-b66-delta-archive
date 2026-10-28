export function cleanArchivePatch(input){
 const allowed=new Set(['id','title','topicTitle','text','noteText','youtubeId','youtubeVideos','documentUrl','classDate','playbackVerified']);
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!allowed.has(k))||! /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.id||'')||input.id.length>100)throw Error('Invalid class');
 const p={};
 for(const [k,max]of [['title',500],['topicTitle',500],['text',50000],['noteText',80000]]){if(typeof input[k]!=='string'||input[k].length>max)throw Error('Invalid text');p[k]=input[k].trim();}
 if(!p.title)throw Error('Missing title');
 if(input.playbackVerified!==undefined&&typeof input.playbackVerified!=='boolean')throw Error('Invalid playback state');
 if(input.youtubeId&&input.youtubeVideos!==undefined)throw Error('Use one video format');
 if(input.youtubeId){
  if(!/^[A-Za-z0-9_-]{11}$/.test(input.youtubeId)||typeof input.playbackVerified!=='boolean')throw Error('Invalid video');
  p.youtubeId=input.youtubeId;p.youtubeVideos=[{videoId:input.youtubeId,playbackVerified:input.playbackVerified}];p.playbackVerified=input.playbackVerified;p.videoStatus=input.playbackVerified?'ready':'uploaded-processing';
 }
 if(input.youtubeVideos!==undefined){
  if(!Array.isArray(input.youtubeVideos)||input.youtubeVideos.length<1||input.youtubeVideos.length>40)throw Error('Invalid video list');
  const seen=new Set();
  p.youtubeVideos=input.youtubeVideos.map(v=>{
   if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!['videoId','label','playbackVerified'].includes(k))||typeof v.videoId!=='string'||!/^[A-Za-z0-9_-]{11}$/.test(v.videoId)||typeof v.playbackVerified!=='boolean')throw Error('Invalid video');
   if(seen.has(v.videoId))throw Error('Duplicate video');seen.add(v.videoId);
   const item={videoId:v.videoId,playbackVerified:v.playbackVerified};
   if(v.label!==undefined){if(typeof v.label!=='string'||v.label.length>160)throw Error('Invalid video label');if(v.label.trim())item.label=v.label.trim();}
   return item;
  });
  p.youtubeId=p.youtubeVideos[0].videoId;p.playbackVerified=p.youtubeVideos.every(v=>v.playbackVerified);
 }
 if(input.documentUrl){const u=new URL(input.documentUrl);if(u.protocol!=='https:'||u.username||u.password||u.href.length>2048||[...u.searchParams.keys()].some(k=>/^(password|access_token|api_key|secret)$/i.test(k)))throw Error('Invalid file');p.documentUrl=u.href;}
 if(input.classDate){if(!/^20\\d{2}-\\d{2}-\\d{2}$/.test(input.classDate)||new Date(input.classDate).toISOString().slice(0,10)!==input.classDate)throw Error('Invalid date');p.classDate=input.classDate;p.classDateVerified=true;}
 return p;
}
