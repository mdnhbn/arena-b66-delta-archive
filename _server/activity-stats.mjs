import {ownerPool} from './learning-admin.mjs';
// Overview and detailed history share consented sessions. Legacy Blob records
// remain untouched and are never added to overlapping session totals.
export async function readActivityStats(site,period,db=ownerPool(),now=Date.now()){
 if(!['archive','secret'].includes(site)||![7,28].includes(period))throw Error('Invalid statistics filter');
 const today=new Date(now).toISOString().slice(0,10),from=new Date(now-(period-1)*86400000).toISOString().slice(0,10);
 const [totals,countries,presence,start]=await Promise.all([
  db.query('SELECT day::text AS date,count(*)::int AS visits,count(DISTINCT visitor_key)::int AS visitors FROM learning.activity_sessions WHERE space=$1 AND day BETWEEN $2::date AND $3::date GROUP BY day',[site,from,today]),
  db.query('WITH visitors AS (SELECT DISTINCT ON(day,visitor_key) day,visitor_key,country FROM learning.activity_sessions WHERE space=$1 AND day BETWEEN $2::date AND $3::date ORDER BY day,visitor_key,last_seen DESC,id) SELECT day::text AS date,country AS code,count(*)::int AS count FROM visitors GROUP BY day,country ORDER BY day,count DESC,country',[site,from,today]),
  db.query('WITH visitors AS (SELECT DISTINCT ON(visitor_key) visitor_key,country FROM learning.activity_sessions WHERE space=$1 AND last_seen>$2::timestamptz AND last_seen<=$3::timestamptz ORDER BY visitor_key,last_seen DESC,id) SELECT country AS code,count(*)::int AS count FROM visitors GROUP BY country ORDER BY count DESC,country',[site,new Date(now-5*60000).toISOString(),new Date(now).toISOString()]),
  db.query('SELECT min(day)::text AS first_day FROM learning.activity_sessions WHERE space=$1',[site])
 ]);
 const startDate=start.rows[0]?.first_day||today,byDay=new Map(totals.rows.map(r=>[r.date,r])),days=[];
 for(let i=period-1;i>=0;i--){const date=new Date(now-i*86400000).toISOString().slice(0,10),collected=date>=startDate,row=byDay.get(date);days.push({date,visits:collected?(row?.visits||0):null,visitors:collected?(row?.visitors||0):null,countries:countries.rows.filter(r=>r.date===date).map(({code,count})=>({code,count})),collected,limited:false});}
 return {site,period,days,startDate,active:presence.rows.reduce((n,r)=>n+r.count,0),activeCountries:presence.rows,activeWindowMinutes:5,presenceUpdatedAt:new Date(now).toISOString(),presenceLimited:false,updatedAt:new Date(now).toISOString(),timeZone:'UTC',source:'consented-activity',legacyHistorySeparate:true,metric:'Estimates from consenting browsers; sessions match visitor history. Active means a signal within five minutes.'};
}
