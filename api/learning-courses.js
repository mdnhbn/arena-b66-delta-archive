import {accountJSON} from '../_server/learning-auth.mjs';
import {vaultCatalog} from '../_server/learning-content.mjs';
export async function GET(){try{return accountJSON({courses:await vaultCatalog()});}catch{return accountJSON({error:'Course catalog unavailable'},503);}}
