import {accountJSON} from '../learning-auth.mjs';
import {vaultCatalog} from '../learning-content.mjs';
export async function GET(){try{return accountJSON({courses:await vaultCatalog()});}catch{return accountJSON({error:'Course catalog unavailable'},503);}}
