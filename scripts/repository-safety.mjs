import {existsSync,readFileSync} from 'node:fs';import path from 'node:path';
export const PRIVATE_CONTENT_PATHS=['data.json','CATALOG.md','sources','notes','documents','tools','tools-manifest.json','drive-backup-manifest.json'];
export function assertRepositorySafety(root=process.cwd()){
 for(const name of PRIVATE_CONTENT_PATHS)if(existsSync(path.join(root,name)))throw Error('Private course material must stay in protected storage: '+name);
 const preview=JSON.parse(readFileSync(path.join(root,'_server/archive-preview.json'),'utf8'));
 for(const entry of preview.entries){for(const name of ['noteText','source','links','youtubeId','youtubeVideos','dailymotionVideos','documentUrl','preservedFiles'])if(entry[name]!==undefined)throw Error('Private field in public preview: '+name);}
}
