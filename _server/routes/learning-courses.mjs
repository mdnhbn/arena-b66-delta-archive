import {accountJSON,learningSession,grantedCourses} from '../learning-auth.mjs';
import {vaultCatalog} from '../learning-content.mjs';
export async function GET(request){try{return accountJSON({courses:await vaultCatalog(await grantedCourses(await learningSession(request),request))});}catch{return accountJSON({error:'Course catalog unavailable'},503);}}
