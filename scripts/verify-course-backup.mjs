import {mkdirSync,readFileSync,writeFileSync,realpathSync} from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash,randomBytes} from 'node:crypto';import pg from 'pg';import {sealBackup,openBackup} from './private-backup-format.mjs';
const TABLES=['courses','lessons','lesson_resources','resource_files','source_snapshots','site_controls','member_rosters'];
const canonical=value=>value&&typeof value==='object'?Array.isArray(value)?value.map(canonical):Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])])):value;
const digestRows=rows=>createHash('sha256').update(JSON.stringify(rows.map(r=>JSON.stringify(canonical(r))).sort())).digest('hex');
export async function verifyCourseBackup({databaseURL,key,outputDirectory}){
 const u=new URL(databaseURL);if(u.protocol!=='postgresql:'||!u.hostname.endsWith('.neon.tech')||u.searchParams.get('sslmode')!=='require')throw Error('Secure direct database connection required');u.searchParams.delete('sslmode');
 if(!path.isAbsolute(outputDirectory))throw Error('Absolute private backup directory required');mkdirSync(outputDirectory,{recursive:true,mode:0o700});const dir=realpathSync(outputDirectory),repo=realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')),relative=path.relative(repo,dir);if(!relative||(!relative.startsWith('..'+path.sep)&&!path.isAbsolute(relative)))throw Error('Backups must be outside application source');
 const db=new pg.Client({connectionString:u.href,ssl:{rejectUnauthorized:true},connectionTimeoutMillis:10000,statement_timeout:60000,query_timeout:90000});await db.connect();let snapshot;
 try{
  await db.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY');
  const size=Number((await db.query('SELECT COALESCE(sum(octet_length(content)),0)::text AS bytes FROM learning.resource_files')).rows[0].bytes);if(size>80*1024*1024)throw Error('Use streaming backup for this volume');
  snapshot={version:1,createdAt:new Date().toISOString(),scope:'Protected course content and member roster; excludes account credentials, sessions, orders, analytics history and video binaries',tables:{}};
  for(const table of TABLES)snapshot.tables[table]=(await db.query('SELECT to_jsonb(t) AS row FROM learning."'+table+'" t')).rows.map(r=>r.row);
  await db.query('COMMIT');
  for(const file of snapshot.tables.resource_files){if(typeof file.content!=='string'||!file.content.startsWith('\\x')||createHash('sha256').update(Buffer.from(file.content.slice(2),'hex')).digest('hex')!==file.sha256)throw Error('Stored resource checksum mismatch');}
  const encrypted=sealBackup(snapshot,key),name='cybernest-course-'+snapshot.createdAt.replace(/[:.]/g,'-')+'-'+randomBytes(3).toString('hex')+'.cnbackup',output=path.join(dir,name);writeFileSync(output,encrypted,{flag:'wx',mode:0o600});
  // Decrypt the file read back from disk, not the in-memory original.
  const restored=openBackup(readFileSync(output),key),proof=[];
  await db.query('BEGIN');
  for(let i=0;i<TABLES.length;i++){
   const table=TABLES[i],rows=restored.tables[table];if(!Array.isArray(rows))throw Error('Missing backup table');
   const temp='cn_backup_restore_'+i;await db.query('CREATE TEMP TABLE "'+temp+'" (LIKE learning."'+table+'") ON COMMIT DROP');
   if(rows.length)await db.query('INSERT INTO pg_temp."'+temp+'" SELECT * FROM jsonb_populate_recordset(NULL::learning."'+table+'",$1::jsonb)',[JSON.stringify(rows)]);
   const actual=(await db.query('SELECT to_jsonb(t) AS row FROM pg_temp."'+temp+'" t')).rows.map(r=>r.row),expectedHash=digestRows(snapshot.tables[table]);if(actual.length!==rows.length||digestRows(actual)!==expectedHash)throw Error('Typed restore differs from snapshot');proof.push({table,rows:actual.length,sha256:expectedHash});
  }
  await db.query('ROLLBACK');
  const result={createdAt:snapshot.createdAt,output,encryptedBytes:encrypted.length,encryptedSHA256:createHash('sha256').update(encrypted).digest('hex'),scope:snapshot.scope,verified:true,productionRowsModified:false,temporaryTablesRolledBack:true,tables:proof};writeFileSync(output+'.verification.json',JSON.stringify(result,null,2),{flag:'wx',mode:0o600});return result;
 }catch(error){await db.query('ROLLBACK').catch(()=>{});throw error;}finally{await db.end();}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const r=await verifyCourseBackup({databaseURL:process.env.CYBERNEST_BACKUP_DATABASE_URL,key:process.env.CYBERNEST_BACKUP_KEY,outputDirectory:process.env.CYBERNEST_BACKUP_DIRECTORY});console.log(JSON.stringify({verified:r.verified,encryptedBytes:r.encryptedBytes,tables:r.tables.map(({table,rows})=>({table,rows})),productionRowsModified:false}));}
 catch(error){console.error('Course backup verification failed:',error.message);process.exitCode=1;}
}
