import {timingSafeEqual} from 'node:crypto';
export function bridgeAllowed(request,key=process.env.SECRET_COURSE_BRIDGE_KEY){const supplied=request.headers.get('x-secret-course-key')||'';return /^[a-f0-9]{64}$/.test(key||'')&&/^[a-f0-9]{64}$/.test(supplied)&&timingSafeEqual(Buffer.from(supplied),Buffer.from(key));}
