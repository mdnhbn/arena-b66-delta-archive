import {accountJSON} from '../learning-auth.mjs';
import {operations} from '../operations.mjs';
export async function GET(){try{const v=await operations();return accountJSON({...v.settings,version:v.version});}catch{return accountJSON({error:'Settings unavailable'},503);}}
