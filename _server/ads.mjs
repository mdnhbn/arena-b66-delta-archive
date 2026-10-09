export const PLACEMENT_IDS=Object.freeze(['rail','middle','footer']);
export const bannerFormat=(slot,variant='desktop')=>slot==='rail'?'160x600':variant==='mobile'?'320x50':'728x90';
const defaults=()=>Object.fromEntries(PLACEMENT_IDS.map(id=>[id,{enabled:true,desktopCode:'',mobileCode:''}]));
export const DEFAULT_ADS = Object.freeze({enabled:true,provider:'placements',defaultExpanded:true,format:'728x90',customCode:'',placements:defaults(),updatedAt:null});
function cleanCode(code=''){
  if(typeof code!=='string'||code.length>20000)throw new Error('Invalid banner');
  if(/BEGIN [\w ]*PRIVATE KEY|gh[pousr]_[a-zA-Z0-9]{25,}|BLOB_READ_WRITE_TOKEN|Bearer\s+[a-zA-Z0-9._-]{20,}|sk-(?:proj-)?[a-zA-Z0-9_-]{30,}/i.test(code))throw new Error('Credential in code');
  if(/serviceWorker\s*\.\s*register|<object\b|<embed\b|<form\b|\bpopunder\b|\bwindow\s*\.\s*open\s*\(/i.test(code))throw new Error('Unsupported banner');
  return code.trim();
}
function cleanPlacements(input){
  if(input===undefined)return defaults();
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(id=>!PLACEMENT_IDS.includes(id)))throw new Error('Invalid placements');
  return Object.fromEntries(PLACEMENT_IDS.map(id=>{const p=input[id];if(!p||typeof p!=='object'||Array.isArray(p)||Object.keys(p).some(k=>!['enabled','desktopCode','mobileCode'].includes(k))||typeof p.enabled!=='boolean')throw new Error('Invalid placement');const desktopCode=cleanCode(p.desktopCode),mobileCode=cleanCode(p.mobileCode);if(id==='rail'&&mobileCode)throw new Error('No mobile rail');return [id,{enabled:p.enabled,desktopCode,mobileCode}];}));
}
export function cleanAds(input) {
  if(!input || typeof input!=='object' || Array.isArray(input) || Object.keys(input).some(k=>!['enabled','provider','defaultExpanded','format','customCode','placements'].includes(k)))throw new Error('Invalid settings');
  if(typeof input.enabled!=='boolean' || typeof input.defaultExpanded!=='boolean' || !['rotate','adsterra','advertica','custom','placements'].includes(input.provider))throw new Error('Invalid settings');
  const format=input.format||'300x250',customCode=input.customCode===undefined?'':input.customCode;
  if(!['300x250','320x50','320x100','160x600','728x90'].includes(format) || typeof customCode!=='string' || customCode.length>20000)throw new Error('Invalid banner');
  if(/BEGIN [\w ]*PRIVATE KEY|gh[pousr]_[a-zA-Z0-9]{25,}|BLOB_READ_WRITE_TOKEN|Bearer\s+[a-zA-Z0-9._-]{20,}|sk-(?:proj-)?[a-zA-Z0-9_-]{30,}/i.test(customCode))throw new Error('Credential in code');
  if(/serviceWorker\s*\.\s*register|<object\b|<embed\b|<form\b/i.test(customCode))throw new Error('Unsupported banner');
  if(input.enabled && input.provider==='custom' && !customCode.trim())throw new Error('Missing banner code');
  return {enabled:input.enabled,provider:input.provider,defaultExpanded:input.defaultExpanded,format,customCode:cleanCode(customCode),placements:cleanPlacements(input.placements)};
}
export function storedAds(input=DEFAULT_ADS){
  const settings=cleanAds({enabled:input.enabled,provider:input.provider,defaultExpanded:input.defaultExpanded,format:input.format,customCode:input.customCode,placements:input.placements});
  return {...settings,updatedAt:typeof input.updatedAt==='string' && !Number.isNaN(Date.parse(input.updatedAt))?input.updatedAt:null};
}
export function publicAds(input=DEFAULT_ADS){const s=storedAds(input);return {enabled:s.enabled,defaultExpanded:s.defaultExpanded,placements:Object.fromEntries(PLACEMENT_IDS.map(id=>[id,{enabled:s.placements[id].enabled,desktopFormat:bannerFormat(id),...(id==='rail'?{}:{mobileFormat:bannerFormat(id,'mobile')})}])),updatedAt:s.updatedAt};}
