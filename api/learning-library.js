import {learningSession,grantedCourses,accountJSON} from '../_server/learning-auth.mjs';
import {archiveContent} from '../_server/learning-content.mjs';
export async function GET(request){try{return accountJSON(await archiveContent(await grantedCourses(await learningSession(request))));}catch{return accountJSON(await archiveContent());}}
