# Deployment and Operations Guide

## Prerequisites

- Node.js 20 or newer.
- npm 10 or newer.
- A Supabase project.
- A Vercel project.
- Optional local Supabase CLI for local database development.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key.
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for future admin jobs. Do not expose this to the browser.
- `NEXT_PUBLIC_SITE_URL`: App URL, such as `http://localhost:3000` locally or the Vercel production URL.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The app can render preview data without Supabase credentials. Authentication, writes, and protected data require Supabase environment variables.

## Supabase database setup

### Hosted Supabase

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/migrations/202606110001_initial_schema.sql`.
4. Optionally run `supabase/seed.sql` for demo data.
5. In Authentication > Providers, enable:
   - Email
   - Google OAuth
6. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-production-domain.com/auth/callback`

### Local Supabase CLI

If the Supabase CLI is installed:

```bash
supabase start
supabase db reset
```

The local reset applies migrations and seed data.

## Row-level security

The migration enables RLS on all application tables. Important policies:

- Verified profiles are readable by authenticated users.
- Users can manage only their own profile, education, work history, and skills.
- Mentorship requests are visible only to the student, mentor, or admins.
- Conversations and messages are visible only to participants or admins.
- Events are public to authenticated users when published; only admins can manage them.
- Reports and audit logs are restricted to owners/admins.

Direct messages are created through the `public.create_direct_message` RPC so participants, message rows, and notification rows are written atomically under controlled server-side logic.

## Vercel deployment

1. Import the repository into Vercel.
2. Set the framework preset to Next.js.
3. Add the environment variables from `.env.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
5. Deploy.
6. Add the production auth callback URL to Supabase.

## Production validation checklist

- `npm run typecheck`
- `npm run build`
- Supabase migration applied successfully.
- RLS is enabled on all app tables.
- Google OAuth redirects to `/auth/callback`.
- Email verification works.
- Directory search returns verified alumni only.
- Mentorship request inserts are restricted to signed-in users.
- Direct messaging creates a conversation, participants, message, and notification row.
- Admin-only event creation returns 403 for non-admin profiles.

## Scaling notes

- Keep cursor pagination for directory, conversations, messages, events, and admin queues as data grows.
- Monitor slow Postgres queries and add indexes based on real usage.
- Upgrade Supabase compute and enable connection pooling as active usage increases.
- Move alumni directory search to Meilisearch, Typesense, or OpenSearch only after Postgres trigram/full-text search is no longer sufficient.
- Dispatch emails through a background worker such as Inngest or Trigger.dev rather than in request paths.
