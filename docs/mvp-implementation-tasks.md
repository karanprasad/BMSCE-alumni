# CTO MVP Implementation Task Tracker

## Launch thesis

The launch product is a verified BMSCE alumni directory with structured mentorship/referral requests and messaging only after acceptance.

This deliberately excludes jobs, forums, events, AI matching, native mobile apps, and broad social networking until the core request-response loop is validated.

## Completed in this implementation pass

- Hid non-MVP events from primary navigation and homepage positioning.
- Reframed the product around LinkedIn-style alumni search and Lunchclub-style structured requests.
- Added onboarding for minimum viable student/alumni profiles.
- Added request types:
  - Mentorship
  - Referral advice
  - Career guidance
- Added mentorship request accept/decline/complete/cancel API flow.
- Added `respond_to_mentorship_request` database RPC.
- Added `mentorship_request_summaries` database view.
- Gated direct messaging behind accepted mentorship requests in the database RPC and UI copy.
- Updated directory cards and profile pages to route users toward structured requests first.
- Added admin verification action API with audit logging.
- Expanded admin dashboard around:
  - Verification queue
  - Moderation queue
  - Mentorship activity
  - Request-response metrics
- Updated README to reflect the narrowed launch scope.

## Remaining launch-hardening tasks

### Product

- Define the first invite cohort:
  - 50 verified alumni
  - 100 students
  - 2 admins
- Write request templates for students.
- Write alumni email copy that sets expectations and reduces response burden.

### Engineering

- Add email worker integration for queued notifications.
- Add explicit admin-only route protection middleware for `/admin`.
- Add profile completeness guard before allowing requests.
- Add empty states for no accepted conversations.
- Add report/block actions in message threads.
- Add SQL migration smoke test in CI.

### Operations

- Create admin verification SOP.
- Define content/report handling policy.
- Track weekly metrics:
  - Alumni verified
  - Student profiles completed
  - Requests sent
  - Requests accepted
  - First response rate
  - Reports opened/resolved

## Phase 2 candidates after validation

- Jobs and referrals workflow.
- Events.
- Forums.
- Alumni chapters.
- Advanced search ranking.
- LinkedIn profile import.
- AI matching.
