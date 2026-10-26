export function configuredOwnerGitHubId(env=process.env){
 const id=env.CYBERNEST_OWNER_GITHUB_ACCOUNT_ID;
 return typeof id==='string'&&/^[1-9][0-9]{0,19}$/.test(id)?id:'';
}
export function canonicalOwnerMatches(binding,env=process.env){
 const id=configuredOwnerGitHubId(env);
 return !!id&&binding?.providerId==='github'&&binding.verified===true&&binding.accountId===id;
}
