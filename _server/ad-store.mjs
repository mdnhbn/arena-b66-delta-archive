import {get,put} from '@vercel/blob';
import {DEFAULT_ADS,storedAds} from './ads.mjs';
const path='settings/ads.json';
export async function readAds(){const file=await get(path,{access:'private',useCache:false});if(!file || file.statusCode===404)return {...DEFAULT_ADS};if(file.statusCode!==200)throw new Error('Storage unavailable');return storedAds(await new Response(file.stream).json());}
export async function saveAds(settings){const data=storedAds({...settings,updatedAt:new Date().toISOString()});await put(path,JSON.stringify(data),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true});return data;}
