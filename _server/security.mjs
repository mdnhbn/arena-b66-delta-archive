import { createHmac, timingSafeEqual } from 'node:crypto';
export const PUBLIC_ORIGIN = 'https://arena-b66-delta-archive.vercel.app';
export const ADMIN_ORIGIN = 'https://arena-b66-delta-archive-git-admin-mdnhbns-projects.vercel.app';
export const PROJECT_ID = 'prj_Ts514bqmcaw8dmhGxNXa9on4LwTl';
export function adminAllowed(env = process.env) {
  // Preview URLs are behind existing Vercel Authentication (one confirmed owner).
  // Production never serves private admin data, including the custom public domain.
  return env.VERCEL_ENV === 'preview' && env.VERCEL_GIT_COMMIT_REF === 'admin' && env.VERCEL_PROJECT_ID === PROJECT_ID && env.ADMIN_PREVIEW_ENABLED === '1';
}
export function json(value, status = 200) {
  return Response.json(value, { status, headers: { 'Cache-Control': 'private, no-store, max-age=0', 'X-Content-Type-Options':'nosniff', 'X-Robots-Tag':'noindex, nofollow', 'Referrer-Policy':'no-referrer' } });
}
function key() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('Private storage is not configured');
  return createHmac('sha256', token).update('delta-anonymous-visits/v1').digest();
}
export function digest(value) { return createHmac('sha256', key()).update(value).digest('hex'); }
export function sign(value) { const body = Buffer.from(JSON.stringify(value)).toString('base64url'); return body + '.' + digest(body); }
export function verify(token, now = Date.now()) {
  try {
    if (typeof token !== 'string' || token.length > 600) return null;
    const [body, signature, extra] = token.split('.');
    if (extra || !/^[a-f0-9]{64}$/.test(signature || '')) return null;
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(digest(body)))) return null;
    const value = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!/^[a-f0-9]{32}$/.test(value.id) || !Number.isSafeInteger(value.exp) || value.exp <= now || value.exp > now + 31*86400000) return null;
    return value;
  } catch { return null; }
}
export function cookies(request) {
  return Object.fromEntries((request.headers.get('cookie') || '').split(';').filter(x=>x.includes('=')).map(x=>{ const i=x.indexOf('='); return [x.slice(0,i).trim(),x.slice(i+1).trim()]; }));
}
export function safeRoute(value) {
  return typeof value === 'string' && /^#(?:overview|classes|resources|tools|roadmap|preservation|schedule|notices|about|class\/entry-\d{1,4})$/.test(value) ? value : '#overview';
}
export function adminMutationAllowed(request) {
  const allowed = [ADMIN_ORIGIN, ...(process.env.VERCEL_URL ? ['https://' + process.env.VERCEL_URL] : [])];
  return allowed.includes(request.headers.get('origin')) && request.headers.get('x-delta-admin') === '1' && request.headers.get('content-type')?.split(';')[0] === 'application/json';
}
export async function limitedJSON(request, maxBytes) {
  if (Number(request.headers.get('content-length') || 0) > maxBytes) throw new Error('Payload too large');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing body');
  let size=0; const chunks=[];
  while (true) { const {value,done}=await reader.read(); if(done)break; size+=value.length; if(size>maxBytes){await reader.cancel();throw new Error('Payload too large');} chunks.push(value); }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export function cleanMembers(input) {
  if (!Array.isArray(input) || input.length > 1000) throw new Error('Maximum 1000 members');
  const seen=new Set();
  return input.map(item=>{
    if (!item || typeof item.name !== 'string') throw new Error('Invalid name');
    const name=item.name.trim().replace(/[\u0000-\u001f\u007f]/g,'');
    if (!name || name.length>160) throw new Error('Invalid name length');
    let profile='';
    if(item.profile){const u=new URL(item.profile);if(u.protocol!=='https:'||!['www.facebook.com','facebook.com'].includes(u.hostname)||u.username||u.password)throw new Error('Invalid profile URL');u.hash='';profile=u.href;}
    const identity=profile||name;
    if(seen.has(identity))return null;
    seen.add(identity);return {name,profile};
  }).filter(Boolean);
}
