import {authPool} from './learning-auth.mjs';
import {ownerPool} from './learning-admin.mjs';
import {saveControl} from './control-store.mjs';
import {DEFAULT_ADS,storedAds} from './ads.mjs';
import {sitePrefix} from './sites.mjs';
function pathFor(site){sitePrefix(site);return site==='secret'?'settings/secret-ads.json':'settings/ads.json';}
export async function readAds(site='archive'){pathFor(site);const db=process.env.CYBERNEST_ADMIN_DATABASE_URL?ownerPool():authPool();const {rows}=await db.query('SELECT payload FROM learning.site_controls WHERE key=$1',['ads:'+site]);if(rows[0])return storedAds(rows[0].payload);return site==='secret'?{...DEFAULT_ADS,enabled:false,placements:{...DEFAULT_ADS.placements,rail:{...DEFAULT_ADS.placements.rail,enabled:false}}}:{...DEFAULT_ADS};}
export async function saveAds(settings,site='archive'){pathFor(site);const data=storedAds({...settings,updatedAt:new Date().toISOString()});await saveControl('ads:'+site,data);return data;}
