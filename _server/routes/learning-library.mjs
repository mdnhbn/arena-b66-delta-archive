import {learningSession,grantedCourses,accountJSON} from '../learning-auth.mjs';
import {archiveContent} from '../learning-content.mjs';
export async function GET(request){try{return accountJSON(await archiveContent(await grantedCourses(await learningSession(request))));}catch{return accountJSON(await archiveContent());}}
