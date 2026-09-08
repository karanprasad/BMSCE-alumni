# Tech Stack Recommendation

## 1. Recommendation

For the BMSCE alumni networking platform, use:

- Web app: Next.js with TypeScript
- UI: Tailwind CSS and shadcn/ui
- Backend model: Next.js server actions and route handlers
- Primary platform: Supabase
- Database: PostgreSQL through Supabase
- Auth: Supabase Auth for MVP
- ORM/query layer: Drizzle or Prisma
- File storage: Supabase Storage
- Realtime: Supabase Realtime for messaging presence and live message updates
- Email: Resend or Postmark
- Background jobs: Inngest or Trigger.dev
- Hosting: Vercel for the Next.js app
- Observability: Sentry and PostHog

This stack gives a small team the best balance of fast development, low operating cost, relational data modeling, mobile-friendly web delivery, and a credible path to 100,000 registered users.

## 2. Why this stack fits the PRD

The PRD is mostly a relational product:

- Users have roles, profiles, education, work history, skills, verification state, and privacy settings.
- Students search alumni by structured filters.
- Messaging, mentorship, jobs, events, forums, moderation, reports, and audit logs all need joins, indexes, transactions, and clear authorization rules.
- Admin workflows require reliable queries and reporting.

PostgreSQL is the strongest fit for this data model. Supabase packages PostgreSQL with auth, storage, realtime, row-level security, dashboard tooling, and good free/low-cost tiers, which reduces the number of services the team must operate early.

## 3. Recommended architecture

```text
Mobile browser / Desktop browser
  |
  v
Next.js on Vercel
  |-- App Router pages
  |-- Server actions / route handlers
  |-- TypeScript validation with Zod
  |-- Tailwind + shadcn/ui responsive UI
  |
  +--> Supabase Auth
  |      |-- Google OAuth
  |      |-- Email/password
  |      |-- Email verification
  |
  +--> Supabase PostgreSQL
  |      |-- Profiles, directory, jobs, events, forums
  |      |-- Full-text and trigram search indexes
  |      |-- Admin audit logs
  |      |-- Row-level security where useful
  |
  +--> Supabase Storage
  |      |-- Profile photos
  |      |-- Future resumes and attachments
  |
  +--> Supabase Realtime
  |      |-- Live direct message updates
  |
  +--> Resend/Postmark
  |      |-- Message alerts
  |      |-- Mentorship notifications
  |      |-- Event reminders
  |
  +--> Inngest/Trigger.dev
         |-- Email dispatch workflows
         |-- Event reminder jobs
         |-- Digest jobs
```

## 4. Comparison of requested technologies

| Technology | Best use in this product | Strengths | Tradeoffs | Recommendation |
| --- | --- | --- | --- | --- |
| Next.js | Main web application and backend routes | Fast full-stack development, excellent SEO, responsive web support, large ecosystem, easy Vercel deployment | Requires discipline around server/client boundaries and caching; not a complete backend platform by itself | Use as the main app framework |
| Supabase | Backend platform for auth, database, storage, realtime | Combines PostgreSQL, auth, storage, realtime, dashboard, and RLS; low initial cost; avoids building infrastructure | Supabase Auth is less polished than Clerk for complex auth UX; realtime and edge functions should be used selectively | Use as the primary backend platform |
| PostgreSQL | Primary system of record | Best fit for relational profiles, search filters, moderation, jobs, forums, analytics, and admin workflows | Needs indexing and query discipline as usage grows | Use as the primary database |
| Clerk | Authentication and user management | Excellent hosted auth UX, social login, account management, organizations, session handling | Adds another vendor and cost; duplicates parts of Supabase Auth; user data must be synchronized with the database | Do not use for MVP unless auth polish is the top priority |
| Firebase | Backend platform alternative | Very fast prototyping, strong auth, hosting, file storage, push notifications, realtime features | Firestore is document-first and awkward for relational search, admin reporting, and complex joins; lock-in can grow | Avoid for this PRD unless the product becomes chat/feed-first |
| Convex | Realtime backend alternative | Great developer experience, realtime-by-default, strong TypeScript story, fast iteration | Less natural for SQL-style alumni directory filtering and reporting; smaller ecosystem than Postgres; data portability considerations | Consider only if realtime collaboration becomes the core product |
| Neon | Serverless PostgreSQL hosting | Excellent Postgres, branching, autoscaling, cost controls, strong fit with Prisma/Drizzle | Does not include integrated auth, storage, or realtime; requires adding Clerk/Auth.js, S3, and more services | Good alternative if not using Supabase |

## 5. Final stack decision

### Choose: Next.js + Supabase + PostgreSQL

Use Supabase's PostgreSQL database as the source of truth and Supabase Auth for MVP authentication. This keeps the initial architecture simple:

- One primary backend platform.
- One relational data model.
- Built-in storage for profile photos.
- Built-in realtime for direct messages.
- Built-in Google and email authentication.
- Optional row-level security for sensitive tables.

### Add supporting services

- Resend or Postmark for product email.
- Inngest or Trigger.dev for background jobs.
- Sentry for error monitoring.
- PostHog for product analytics.
- Vercel for hosting.

## 6. Why not Clerk in the default MVP stack?

Clerk is excellent, especially for polished authentication screens, account management, multi-session UX, and enterprise-style auth requirements. For this platform, however, MVP requirements are straightforward:

- Google login
- Email/password login
- Email verification
- Role-based access
- Alumni verification controlled by app data

Supabase Auth can handle these with fewer vendors and lower cost. Clerk becomes attractive if:

- The team wants the fastest possible hosted auth UI.
- Auth UX polish matters more than minimizing vendors.
- Future requirements include organizations, SAML, enterprise SSO, or advanced account management.

If using Clerk, pair it with Neon or Supabase PostgreSQL, not Supabase Auth. Avoid running two auth systems.

## 7. Why not Firebase as the primary backend?

Firebase is great for prototypes and realtime apps, but the alumni platform needs structured relational queries:

- Search alumni by company, location, industry, graduation year, skills, and branch.
- Join profiles with work history, education history, skills, mentorship availability, and verification status.
- Support admin reporting, moderation queues, audit logs, and job/event workflows.

These workflows are more natural and maintainable in PostgreSQL. Firebase can still be useful later for push notifications if native mobile apps are built.

## 8. Why not Convex as the primary backend?

Convex is a strong option for realtime TypeScript products and can speed up development. The tradeoff is that this PRD is not primarily a collaborative realtime app; it is a directory, career network, and admin-heavy community platform. PostgreSQL gives better portability, SQL search, reporting, and ecosystem maturity for the core product.

Convex could be reconsidered if direct messaging, live groups, feeds, and collaborative event experiences become the product's dominant usage pattern.

## 9. Why not Neon as the default database provider?

Neon is an excellent Postgres provider and is a strong alternative to Supabase. The reason to prefer Supabase for MVP is integration:

- Supabase includes auth.
- Supabase includes file storage.
- Supabase includes realtime.
- Supabase has a useful admin dashboard for small teams.

Choose Neon if the team prefers:

- Clerk for auth.
- S3/R2 for storage.
- Pusher/Ably/custom WebSockets for realtime.
- A more modular architecture with best-of-breed services.

That modular approach is powerful, but it increases integration work and vendor coordination for a small team.

## 10. Scalability to 100,000 users

The recommended stack can scale to 100,000 registered users if implemented with sensible constraints.

### What should scale well

- Next.js on Vercel can serve responsive web pages globally.
- Supabase PostgreSQL can handle the relational workload with proper indexes and connection pooling.
- Postgres full-text and trigram indexes can support MVP directory search.
- Supabase Storage can handle profile photos and later resumes.
- Background jobs can keep email sending and reminders out of request paths.

### Engineering practices needed before scale

- Add indexes for all directory and job filters.
- Use cursor pagination for directory, messages, jobs, events, and forums.
- Keep messages paginated by conversation.
- Add rate limits for auth, messaging, mentorship requests, forum posts, and search.
- Keep email dispatch asynchronous.
- Cache public event/job/forum pages where safe.
- Use database connection pooling.
- Monitor slow queries and add indexes based on real usage.
- Move to dedicated search such as Meilisearch, Typesense, or OpenSearch if alumni search becomes slow or needs advanced ranking.

### Likely scaling thresholds

- Up to early traction: Supabase free/pro tiers plus Vercel should be enough.
- As active usage grows: upgrade Supabase compute, enable connection pooling, tune indexes, and add better observability.
- If search becomes complex: add a dedicated search service.
- If messaging becomes very active: consider message table partitioning, stricter pagination, and realtime channel limits.

## 11. Cost and operating complexity

### Lowest-complexity MVP

```text
Next.js + Supabase Auth + Supabase Postgres + Supabase Storage + Supabase Realtime + Resend + Vercel
```

This is the recommended default.

### More polished auth, more vendors

```text
Next.js + Clerk + Neon Postgres + S3/R2 Storage + Ably/Pusher + Resend + Vercel
```

Choose this if auth polish and modularity are more important than minimizing cost and vendor count.

### Realtime-first alternative

```text
Next.js + Convex + Clerk + Resend + Vercel
```

Choose this only if the product shifts toward realtime community interaction as the central value proposition.

### Firebase alternative

```text
Next.js or Firebase Hosting + Firebase Auth + Firestore + Cloud Storage + Cloud Functions
```

Choose this only if the team strongly prefers Firebase and accepts the data-model tradeoffs.

## 12. Implementation guidance

### MVP defaults

- Use Next.js App Router.
- Use server components for read-heavy pages.
- Use server actions or route handlers for mutations.
- Use Zod for request validation.
- Use Drizzle or Prisma migrations for schema management.
- Keep authorization checks in shared server-side helpers.
- Use Supabase RLS selectively, especially for user-owned records and storage.
- Use Postgres indexes and cursor pagination from the start.
- Use email templates for message alerts, mentorship updates, event reminders, and verification updates.

### Avoid in MVP

- Native mobile apps.
- Microservices.
- Custom WebSocket infrastructure.
- Separate search infrastructure before the directory has meaningful volume.
- Running both Clerk and Supabase Auth.
- Moving forum or messaging data into a separate database too early.

## 13. Summary

The best modern stack for this PRD is Next.js + Supabase + PostgreSQL, supported by Vercel, Resend/Postmark, Inngest/Trigger.dev, Sentry, and PostHog.

This stack is fast for a small team, low-cost at launch, mobile-friendly through responsive web, and scalable enough for 100,000 registered users with proper indexing, pagination, rate limiting, and background jobs.
