import { adminAllowed, ADMIN_ORIGIN, json } from '../../_server/security.mjs';
import { adminPage } from '../../_server/admin-page.mjs';
export function GET() {
  if (process.env.VERCEL_ENV === 'production') return new Response(null,{status:302,headers:{Location:ADMIN_ORIGIN+'/admin','Cache-Control':'no-store','Referrer-Policy':'no-referrer'}});
  if (!adminAllowed()) return json({error:'Not found'},404);
  return new Response(adminPage,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store, max-age=0','X-Robots-Tag':'noindex,nofollow','X-Frame-Options':'DENY','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; worker-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"}});
}
