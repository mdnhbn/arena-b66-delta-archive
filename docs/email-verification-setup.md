# Email sign-up verification

CyberNest email/password registration is deliberately unavailable until it can send and verify an email address. Google and GitHub sign-in remain separate.

To enable verified email registration in Vercel, configure these **Production** environment variables:

- `RESEND_API_KEY` — a Resend API key with email-send permission.
- `CYBERNEST_EMAIL_FROM` — a sender address on a domain verified in Resend, such as `accounts@your-domain.example`.

Verify the sending domain with Resend and publish its DNS records before enabling registration. Do not use a test sender for student addresses. After saving the variables, redeploy and check `/api/auth-providers`; it must return `emailVerification: true` and `emailPassword: true`. The app then sends a one-hour verification link, blocks password sign-in until verification, and keeps social sign-in available.

No mail-provider credential or verified sending domain is currently configured in the CyberNest Vercel project. Do not put API keys in the repository or browser code.
