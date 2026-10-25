export const PREVIEW_BRANCH = 'access-payments-preview';
const PROJECT = 'prj_Ts514bqmcaw8dmhGxNXa9on4LwTl';
export function isReadOnlyPreview(env = process.env) {
  return env.VERCEL_ENV === 'preview' && env.VERCEL_PROJECT_ID === PROJECT &&
    env.VERCEL_GIT_COMMIT_REF === PREVIEW_BRANCH;
}
export function previewHTML(html, env = process.env) {
  if (env.VERCEL_ENV === 'production' && env.VERCEL_GIT_COMMIT_REF === PREVIEW_BRANCH)
    throw new Error('The step 1 test branch must not be deployed to production.');
  if (!isReadOnlyPreview(env)) return html;
  for (const src of ["ads/controller.js","modern.js"])
    html = html.replace(new RegExp('<script\\b[^>]*\\bsrc="' + src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[^>]*>\\s*</script>', 'g'), '');
  html = html.replace(/<p class="privacy-(?:note|notice)">[^<]*<\/p>/g, '');
  return html.replace('</head>', '<link rel="stylesheet" href="/preview.css"></head>')
    .replace('</body>', '<aside class="stage1-notice" role="note">পরীক্ষার কপি · চলতি সাইট বদলায়নি। বিজ্ঞাপন ও ভিজিট গণনা বন্ধ। <a href="/preview-check.html">বিস্তারিত</a></aside></body>');
}
