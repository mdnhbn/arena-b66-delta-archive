import {AsyncLocalStorage} from 'node:async_hooks';
import {adminAllowed} from './security.mjs';
const actors=new AsyncLocalStorage();
export const withRequestActor=fn=>actors.run({},fn);
export function recordActor(id){const context=actors.getStore();if(context)context.actorId=id;}
export function auditActorId(){const id=actors.getStore()?.actorId||(adminAllowed()?process.env.CYBERNEST_OWNER_PROFILE_ID:null);if(!/^[a-f0-9-]{36}$/.test(id||''))throw Error('Verified actor required');return id;}
