export function emailVerificationReady(env=process.env){return typeof env.RESEND_API_KEY==='string'&&env.RESEND_API_KEY.startsWith('re_')&&env.RESEND_API_KEY.length>10&&typeof env.CYBERNEST_EMAIL_FROM==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.CYBERNEST_EMAIL_FROM);}
export async function sendVerificationEmail({user,url},env=process.env){
 if(!emailVerificationReady(env))throw new Error('Email verification is not configured');
 const target=new URL(url),expected=new URL(env.CYBERNEST_AUTH_URL||'https://cybernest-learn.vercel.app');if(target.origin!==expected.origin||expected.protocol!=='https:')throw new Error('Invalid verification destination');
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:env.CYBERNEST_EMAIL_FROM,to:[user.email],subject:'Verify your CyberNest account',text:'Confirm your email address for CyberNest by opening this secure link:\n\n'+target.href+'\n\nThis link expires in one hour. If you did not request this, ignore this message.'}),signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw new Error('Verification email delivery failed');
}
