import {createCipheriv,createDecipheriv,hkdfSync,randomBytes} from 'node:crypto';
import {gzipSync,gunzipSync} from 'node:zlib';
const MAGIC=Buffer.from('CNBACKUP1'),MAX=256*1024*1024;
function master(value){const b=Buffer.from(value||'','base64');if(b.length!==32||b.toString('base64')!==value)throw Error('A 32-byte base64 backup key is required');return b;}
const derive=(key,salt)=>Buffer.from(hkdfSync('sha256',master(key),salt,'cybernest-course-backup/v1',32));
export function sealBackup(payload,key){
 const plaintext=Buffer.from(JSON.stringify(payload));if(plaintext.length>MAX)throw Error('Backup exceeds local size limit');
 const salt=randomBytes(16),iv=randomBytes(12),header=Buffer.from(JSON.stringify({version:1,salt:salt.toString('base64'),iv:iv.toString('base64'),compression:'gzip'})),size=Buffer.alloc(4);size.writeUInt32BE(header.length);
 const cipher=createCipheriv('aes-256-gcm',derive(key,salt),iv);cipher.setAAD(Buffer.concat([MAGIC,header]));const encrypted=Buffer.concat([cipher.update(gzipSync(plaintext)),cipher.final()]);
 return Buffer.concat([MAGIC,size,header,encrypted,cipher.getAuthTag()]);
}
export function openBackup(bytes,key){
 if(!Buffer.isBuffer(bytes)||bytes.length<MAGIC.length+4+16||!bytes.subarray(0,MAGIC.length).equals(MAGIC))throw Error('Invalid backup format');
 const n=bytes.readUInt32BE(MAGIC.length),start=MAGIC.length+4,end=start+n;if(n<2||n>4096||end+16>=bytes.length)throw Error('Invalid backup header');const header=bytes.subarray(start,end),meta=JSON.parse(header);
 if(meta.version!==1||meta.compression!=='gzip'||! /^[A-Za-z0-9+/]{22}==$/.test(meta.salt||'')||! /^[A-Za-z0-9+/]{16}$/.test(meta.iv||''))throw Error('Unsupported backup format');
 const decipher=createDecipheriv('aes-256-gcm',derive(key,Buffer.from(meta.salt,'base64')),Buffer.from(meta.iv,'base64'));decipher.setAAD(Buffer.concat([MAGIC,header]));decipher.setAuthTag(bytes.subarray(-16));
 const plain=gunzipSync(Buffer.concat([decipher.update(bytes.subarray(end,-16)),decipher.final()]),{maxOutputLength:MAX});return JSON.parse(plain);
}
