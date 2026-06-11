# BMSCE Alumni Networking Platform

Production-ready alumni networking platform for BMS College of Engineering built with Next.js 15, TypeScript, Tailwind CSS, Supabase, and PostgreSQL.

## Features

- Authentication with Supabase Auth, Google OAuth, and email/password.
- Verified alumni directory with search and filters.
- Alumni profile pages with skills, work, education, mentorship, and referral signals.
- Mentorship requests.
- Direct messaging with notification queue hooks.
- Event discovery and admin-created events.
- Admin dashboard for verification, moderation, events, and metrics.
- Row-level security, database migrations, and seed data.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app renders preview data without Supabase credentials. Configure `.env.local` to enable authentication and writes.

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
- [Deployment and operations guide](docs/deployment.md)
