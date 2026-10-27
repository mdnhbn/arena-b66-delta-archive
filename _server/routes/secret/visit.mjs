import {json} from '../../security.mjs';
import {bridgeAllowed} from '../../secret-auth.mjs';
export async function POST(request){
 if(!bridgeAllowed(request))return json({error:'Forbidden'},403);
 return json({error:'Legacy visitor collection retired; use consented activity'},410);
}
