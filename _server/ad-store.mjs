import {get,put} from '@vercel/blob';
import {DEFAULT_ADS,storedAds} from './ads.mjs';
import {sitePrefix} from './sites.mjs';
function pathFor(site){sitePrefix(site);return site==='secret'?'settings/secret-ads.json':'settings/ads.json';}
export async function readAds(site='archive'){const file=await get(pathFor(site),{access:'private',useCache:false});if(!file || file.statusCode===404)return site==='secret'?{...DEFAULT_ADS,enabled:false,placements:{...DEFAULT_ADS.placements,rail:{...DEFAULT_ADS.placements.rail,enabled:false}}}:{...DEFAULT_ADS};if(file.statusCode!==200)throw new Error('Storage unavailable');return storedAds(await new Response(file.stream).json());}
export async function saveAds(settings,site='archive'){const data=storedAds({...settings,updatedAt:new Date().toISOString()});await put(pathFor(site),JSON.stringify(data),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true});return data;}
