# MentorLagbe Server

Express and MongoDB API for the MentorLagbe smart tuition platform.

**Live API:** https://mentorlagbe-serverbd.vercel.app/api/health

## Security and features

- Exactly four application collections: `users`, `tuitions`, `applications`, `payments`
- BetterAuth user, account, session and verification records share the `users` collection through a custom MongoDB adapter
- BetterAuth sessions are exchanged for short-lived JWT access tokens for protected Express APIs
- Short-lived JWT access tokens plus four role middlewares
- Ownership checks, duplicate application index, free tutor quota and admin moderation
- Monthly Stripe Sandbox subscriptions with signed, idempotent webhook processing
- Credentialed CORS and production-safe BetterAuth session cookies
- Server-side search, filters and pagination

## Setup

1. Copy `.env.example` to `.env` and provide MongoDB, JWT, Stripe and client values.
2. Run `npm install`, `npm run seed`, then `npm run dev`.
3. Validate with `npm run typecheck && npm run build`.

## Production environment

Set `NODE_ENV=production`, `BETTER_AUTH_URL=https://mentorlagbe-serverbd.vercel.app`, and `CLIENT_URL=https://mentorlagbe.vercel.app`. Configure the MongoDB, BetterAuth, JWT and Stripe Sandbox secrets in Vercel for Production, Preview and Development. The Stripe webhook endpoint is `https://mentorlagbe-serverbd.vercel.app/api/payments/webhook` and must listen for `checkout.session.completed`.

The seed creates an environment-configured admin, three tutors and twelve approved tuitions. Admin and quick-test credentials belong in the private assignment submission form, not in this public repository. Never commit secrets.
