# BMSCE Alumni Networking Platform

Production-ready alumni networking platform for BMS College of Engineering built with Next.js 15, TypeScript, Tailwind CSS, Supabase, and PostgreSQL.

## Features

- Authentication with Supabase Auth, Google OAuth, and email/password.
- Verified alumni directory with search and filters.
- Alumni profile pages with skills, work, education, mentorship, and referral signals.
- Mentorship requests.
- Direct messaging after accepted mentorship/referral requests, with notification queue hooks.
- Admin dashboard for verification, moderation, and request-response metrics.
- Row-level security, database migrations, and seed data.

## Quick start

```bash
npm install
cp .env.example .env.local
supabase start
supabase db reset
npm run dev
```

Use the values from `supabase status` in `.env.local`. See the local development guide for the seeded Student test account.

## Project structure

```text
app/                  Next.js App Router pages and API routes
components/           Reusable responsive UI components
lib/                  Supabase clients, auth helpers, data access, validation
supabase/             Local Supabase config, migrations, seed data
types/                Shared TypeScript domain types
docs/                 Product, architecture, stack, and deployment docs
```

## Product and technical specification

- [Alumni networking platform PRD, user stories, schema, API, architecture, and roadmap](docs/alumni-networking-platform-prd.md)
- [Tech stack recommendation and tradeoff comparison](docs/tech-stack-recommendation.md)
- [Local development guide and test account](docs/local-development.md)
- [Deployment and operations guide](docs/deployment.md)
- [CTO MVP implementation task tracker](docs/mvp-implementation-tasks.md)
