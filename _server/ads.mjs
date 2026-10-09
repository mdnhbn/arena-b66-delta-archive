export const DEFAULT_ADS = Object.freeze({enabled:true,provider:'rotate',defaultExpanded:true,format:'300x250',customCode:'',updatedAt:null});
export function cleanAds(input) {
  if(!input || typeof input!=='object' || Array.isArray(input) || Object.keys(input).some(k=>!['enabled','provider','defaultExpanded','format','customCode'].includes(k)))throw new Error('Invalid settings');
  if(typeof input.enabled!=='boolean' || typeof input.defaultExpanded!=='boolean' || !['rotate','adsterra','advertica','custom'].includes(input.provider))throw new Error('Invalid settings');
  const format=input.format||'300x250',customCode=input.customCode===undefined?'':input.customCode;
  if(!['300x250','320x50','320x100'].includes(format) || typeof customCode!=='string' || customCode.length>20000)throw new Error('Invalid banner');
  if(/BEGIN [\w ]*PRIVATE KEY|gh[pousr]_[a-zA-Z0-9]{25,}|BLOB_READ_WRITE_TOKEN|Bearer\s+[a-zA-Z0-9._-]{20,}|sk-(?:proj-)?[a-zA-Z0-9_-]{30,}/i.test(customCode))throw new Error('Credential in code');
  if(/serviceWorker\s*\.\s*register|<object\b|<embed\b|<form\b/i.test(customCode))throw new Error('Unsupported banner');
  if(input.enabled && input.provider==='custom' && !customCode.trim())throw new Error('Missing banner code');
  return {enabled:input.enabled,provider:input.provider,defaultExpanded:input.defaultExpanded,format,customCode:customCode.trim()};
}
export function storedAds(input=DEFAULT_ADS){
  const settings=cleanAds({enabled:input.enabled,provider:input.provider,defaultExpanded:input.defaultExpanded,format:input.format,customCode:input.customCode});
  return {...settings,updatedAt:typeof input.updatedAt==='string' && !Number.isNaN(Date.parse(input.updatedAt))?input.updatedAt:null};
}
export function publicAds(input=DEFAULT_ADS){const {customCode,...settings}=storedAds(input);return {...settings,format:settings.provider==='custom'?settings.format:'300x250'};}
