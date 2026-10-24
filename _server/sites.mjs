export const SITE_IDS=Object.freeze(['archive','secret']);
export function siteFrom(request){const value=new URL(request.url).searchParams.get('site')||'archive';if(!SITE_IDS.includes(value))throw new Error('Unknown site');return value;}
export function sitePrefix(site){if(!SITE_IDS.includes(site))throw new Error('Unknown site');return site==='secret'?'sites/secret/':'';}
export function secretRoute(value){if(typeof value!=='string'||value.length>2048)return '#library';const route=value.split('?')[0];return /^#(?:library|courses|categories|course-library|category\/(?:ai|hacking|marketing|editing|trading|coding|design|ecommerce|youtube))$/.test(route)?route:'#library';}
