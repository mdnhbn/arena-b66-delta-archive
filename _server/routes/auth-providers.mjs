import {accountJSON} from '../learning-auth.mjs';import {socialAvailability} from '../social-providers.mjs';
export async function GET(){return accountJSON(socialAvailability());}
