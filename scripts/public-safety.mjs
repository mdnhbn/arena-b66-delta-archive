import {lstat,readdir,readFile} from 'node:fs/promises';
import path from 'node:path';

// Only browser assets belong in the deployment's static directory.
const extensions=new Set(['.html','.css','.js','.json','.svg','.png','.jpg','.jpeg','.webp','.avif','.gif','.ico','.woff','.woff2','.txt']);
const credentialPatterns=[
 /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
 /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/,
 /\bAKIA[A-Z0-9]{16}\b/,
 /vercel_blob_rw_[A-Za-z0-9_]{15,}/,
 /GOCSPX-[A-Za-z0-9_-]{20,}/,
 /postgres(?:ql)?:\/\/[^\s:/"']+:[^\s@"']{12,}@/,
 /\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}/
];

export function runtimeSecrets(env=process.env){
 const secrets=[];
 for(const [name,value]of Object.entries(env)){
  if(!/(?:SECRET|TOKEN|PASSWORD|PRIVATE_KEY|DATABASE_URL|BRIDGE_KEY)/i.test(name)||typeof value!=='string'||value.length<20)continue;
  secrets.push(value);
  if(value.startsWith('postgres')){try{const password=decodeURIComponent(new URL(value).password);if(password.length>=12)secrets.push(password);}catch{}}
 }
 return [...new Set(secrets)];
}

export async function assertSafePublicTree(root,{secrets=runtimeSecrets()}={}){
 let count=0;
 async function visit(directory){
  for(const entry of await readdir(directory,{withFileTypes:true})){
   const file=path.join(directory,entry.name),relative=path.relative(root,file).split(path.sep).join('/');
   if(entry.name.startsWith('.')||/(?:^|[._-])(?:backup|credentials|node_modules|_server)(?:$|[._-])/i.test(entry.name)||/\.local(?:\.|$)/i.test(entry.name))throw Error('Private path in public output: '+relative);
   if((await lstat(file)).isSymbolicLink())throw Error('Symbolic link in public output: '+relative);
   if(entry.isDirectory()){await visit(file);continue;}
   if(!entry.isFile()||!extensions.has(path.extname(entry.name).toLowerCase()))throw Error('Unsupported public asset: '+relative);
   const data=await readFile(file),text=data.toString('utf8');
   if(credentialPatterns.some(pattern=>pattern.test(text))||secrets.some(secret=>data.includes(Buffer.from(secret))))throw Error('Credential-like content in public output: '+relative);
   count++;
  }
 }
 await visit(root);return count;
}
