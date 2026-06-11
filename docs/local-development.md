# Local Development Guide

## Student test account

Use this account after running the local Supabase seed:

- Email: `student@bmsce.test`
- Password: `BmsceStudent123!`
- Role: Student
- Profile: Priya S, Computer Science and Engineering, class of 2027

This account is for local development only.

## Exact local setup steps

### 1. Install dependencies

```bash
npm install
```

### 2. Start local Supabase

Install the Supabase CLI if you do not already have it, then run:

```bash
supabase start
```

### 3. Apply migrations and seed data

```bash
supabase db reset
```

This applies:

- `supabase/migrations/202606110001_initial_schema.sql`
- `supabase/seed.sql`

It also creates the local Student test account above.

### 4. Create `.env.local`

```bash
cp .env.example .env.local
supabase status
```

Open `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from supabase status>
SUPABASE_SERVICE_ROLE_KEY=<service_role key from supabase status>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run the Next.js app

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 6. Sign in as Student

1. Go to `http://localhost:3000/auth/login`.
2. Use email/password login.
3. Enter:
   - Email: `student@bmsce.test`
   - Password: `BmsceStudent123!`
4. After login, go to:
   - `/directory` to search alumni
   - `/mentorship` to create or view requests
   - `/onboarding` to edit the Student profile

## Preview mode without Supabase

If you only run:

```bash
npm install
npm run dev
```

the app still renders preview data, but authentication and write actions are disabled until Supabase environment variables are configured.
