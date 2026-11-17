<div align="center">

# ⚙️ MentorLagbe API

### Secure Backend for the Smart Tuition & Mentorship Platform

[![API Health](https://img.shields.io/badge/API-ONLINE-0B7A6C?style=for-the-badge&logo=vercel&logoColor=white)](https://mentorlagbe-serverbd.vercel.app/api/health)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-111111?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe_Sandbox-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

[🌐 Open Frontend](https://mentorlagbe.vercel.app) · [💚 Check API Health](https://mentorlagbe-serverbd.vercel.app/api/health) · [🎨 Client Repository](https://github.com/kamrullab/mentorlagbe-client)

</div>

---

## ✨ Overview

This Express and TypeScript API powers MentorLagbe authentication, tuition management, applications, role authorization, MongoDB persistence, and Stripe Sandbox subscriptions.

## 🔐 Security and Features

- BetterAuth email/password sessions stored through a custom MongoDB adapter
- Short-lived JWT access tokens with issuer and audience validation
- `verifyToken`, `verifyStudent`, `verifyTutor`, and `verifyAdmin` middleware
- Credentialed CORS, secure production cookies, Helmet, and rate limiting
- Public registration restricted to Student and Tutor roles
- Ownership checks, strict Zod validation, and centralized safe errors
- Signed, idempotent Stripe webhook processing
- Server-side search, filtering, pagination, moderation, and analytics
- Exactly four physical MongoDB collections

## 🗄️ Database Architecture

| Collection | Purpose |
|---|---|
| `users` | BetterAuth records, profiles, roles, plans, and bookmarks |
| `tuitions` | Tutor listings, moderation state, availability, and reviews |
| `applications` | Student applications and Tutor decisions |
| `payments` | Successful Stripe Sandbox subscription transactions |

## 💳 Stripe Sandbox Demo

> [!IMPORTANT]
> Use test mode only. The following details do not represent a real payment card.

| Checkout field | Test value |
|---|---|
| Card number | `4242 4242 4242 4242` |
| Expiry date | `12 / 30` |
| CVC | `123` |
| Cardholder name | `Kamrul Hossain` |

The webhook endpoint is:

```text
https://mentorlagbe-serverbd.vercel.app/api/payments/webhook
```

It listens for `checkout.session.completed` and upgrades the user plan after a successful Sandbox payment.

## 🏃 Local Setup

```bash
git clone https://github.com/kamrullab/mentorlagbe-server.git
cd mentorlagbe-server
npm install
```

Copy `.env.example` to `.env`, add your private credentials, and run:

```bash
npm run seed
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm test
npm run build
```

## 🌍 Required Production Values

```env
NODE_ENV=production
BETTER_AUTH_URL=https://mentorlagbe-serverbd.vercel.app
CLIENT_URL=https://mentorlagbe.vercel.app
```

MongoDB, JWT, BetterAuth, ImgBB, Admin, and Stripe values must be configured privately through Vercel environment variables. Never commit `.env` files or copy secrets into logs.

## 🌱 Seed Data

The seed command creates an environment-configured Admin, three connected Tutors, and twelve approved tuition listings across multiple subjects. It preserves the required four-collection architecture.

## 🔗 Project Links

- **Live site:** https://mentorlagbe.vercel.app
- **API health:** https://mentorlagbe-serverbd.vercel.app/api/health
- **Client repository:** https://github.com/kamrullab/mentorlagbe-client
- **Server repository:** https://github.com/kamrullab/mentorlagbe-server

---

<div align="center">

Securely built for the MentorLagbe learning ecosystem.

</div>
