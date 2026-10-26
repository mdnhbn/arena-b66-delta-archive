import pg from 'pg';
let pool;
export function ownerPool(){if(pool)return pool;const u=new URL(process.env.CYBERNEST_ADMIN_DATABASE_URL);if(u.protocol!=='postgresql:'||!u.hostname.endsWith('.neon.tech')||u.searchParams.get('sslmode')!=='require')throw Error('Secure owner storage required');u.searchParams.delete('sslmode');pool=new pg.Pool({connectionString:u.href,ssl:{rejectUnauthorized:true},max:2,connectionTimeoutMillis:5000,statement_timeout:8000});pool.on('error',()=>{});return pool;}
