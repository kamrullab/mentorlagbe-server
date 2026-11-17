# MentorLagbe Server

Express and MongoDB API for the MentorLagbe smart tuition platform.

## Security and features

- Exactly four application collections: `users`, `tuitions`, `applications`, `payments`
- BetterAuth user, account, session and verification records share the `users` collection through a custom MongoDB adapter
- BetterAuth sessions are exchanged for short-lived JWT access tokens for protected Express APIs
- Short-lived JWT access tokens plus four role middlewares
- Ownership checks, duplicate application index, free tutor quota and admin moderation
- Stripe Checkout with signed, idempotent webhook processing
- Server-side search, filters and pagination

## Setup

1. Copy `.env.example` to `.env` and provide MongoDB, JWT, Stripe and client values.
2. Run `npm install`, `npm run seed`, then `npm run dev`.
3. Validate with `npm run typecheck && npm run build`.

The seed creates an environment-configured admin, three tutors and twelve approved tuitions. Never commit secrets.
