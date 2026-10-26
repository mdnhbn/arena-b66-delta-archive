import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
import path from 'node:path';
import {existsSync} from 'node:fs';
import {assertSafePublicTree} from './public-safety.mjs';
const workspace=path.resolve('.'),output=path.resolve('public');
if(path.dirname(output)!==workspace||path.basename(output)!=='public')throw Error('Unexpected build output');
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
for(const file of ['language.js','language.css','index.html','privacy.html','privacy.css','app.js','theme.js','style.css','modern.css','modern.js','learning-library.css','learning-library.js','academy.css','account.js','catalog.js','admin-ui.js','admin-secret.js','admin-curriculum.js','admin-enrollments.js','admin-operations.js','admin-managed.js','admin-history.js','admin-integrations.js','admin-campaigns.js','ad-campaigns.js','admin-team.js','admin-permissions.js','activity.js','site-operations.js','admin-ui.css'])await copyFile(file,path.join(output,file));
if(existsSync('assets')){await assertSafePublicTree('assets');await cp('assets',path.join(output,'assets'),{recursive:true});}
await mkdir(path.join(output,'vault'),{recursive:true});
for(const file of ['index.html','app.js','course-player.css','course-player.js','icon.svg','learning-library.css','learning-library.js','library-theme.js','portal-controls.js','readable.css','style.css'])await copyFile(path.join('vault',file),path.join(output,'vault',file));
await mkdir(path.join(output,'ads'),{recursive:true});await copyFile('ads/controller.js',path.join(output,'ads/controller.js'));
await assertSafePublicTree(output);
console.log('Built previews and shared account UI. Full data, course files and server code are excluded from static output.');
