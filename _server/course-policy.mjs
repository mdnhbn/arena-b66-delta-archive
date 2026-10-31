export const ARCHIVE_COURSE='arena-b66-delta';
export function privateCourseAllowed(access,courseId){
 if(courseId!==ARCHIVE_COURSE)return access?.owner===true||!access?.courseIds?.length||access.courseIds.includes(courseId);
 return access?.owner===true||access?.courseIds?.includes(ARCHIVE_COURSE)===true;
}
