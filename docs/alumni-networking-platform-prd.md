# BMS College of Engineering Alumni Networking Platform

## 1. Product Requirements Document

### 1.1 Product summary

Build a web-based alumni networking platform for BMS College of Engineering (BMSCE) that helps current students and alumni connect for mentorship, referrals, professional networking, events, jobs, discussions, and community building. The product should launch quickly with a focused MVP, validate engagement, and then expand into richer community and career workflows.

### 1.2 Goals

- Create a verified alumni and student directory for BMSCE.
- Make it easy for students to find relevant alumni by company, industry, location, graduation year, branch, and skills.
- Enable lightweight mentorship and referral-oriented conversations.
- Centralize alumni events, jobs, and discussions in one trusted community space.
- Give admins tools to verify users, moderate content, and manage community operations.

### 1.3 Non-goals for MVP

- Replacing the college ERP, placement portal, or official alumni association systems.
- Building complex social media feeds, gamification, payments, or fundraising.
- Supporting mobile native apps before the web product validates usage.
- Building AI matching, recommendation engines, or video calling in the first release.

### 1.4 Target users

#### Current students

- Need mentorship, career guidance, referrals, internship/job leads, event visibility, and authentic advice.
- Likely access through college Google accounts or personal email.

#### Alumni

- Want to give back, mentor selectively, discover peers, hire talent, attend reunions, and stay connected to BMSCE.
- Need privacy controls and low-friction participation.

#### Admins

- Manage user verification, content moderation, events, job postings, announcements, and platform analytics.
- Need auditability and simple operational workflows.

### 1.5 Key success metrics

#### Activation

- Percentage of invited users who complete a verified profile.
- Percentage of alumni profiles with company, location, graduation year, branch, and skills.

#### Engagement

- Student-to-alumni search sessions per week.
- Messages sent per active user.
- Mentorship requests created and accepted.
- Event RSVPs and job applications/click-throughs.

#### Trust and quality

- Verification approval time.
- Reported content rate.
- Admin moderation resolution time.
- Percentage of conversations receiving an alumni reply.

### 1.6 Core product principles

- Trust before scale: verification, moderation, and privacy are core.
- Fast connection loops: search, profile view, request, message.
- Low alumni burden: clear availability settings, templated requests, digest alerts.
- Practical career value: mentorship, referrals, jobs, and events should be discoverable within a few clicks.
- Build simple workflows first, then add automation after usage patterns are clear.

## 2. Scope and Feature Requirements

### 2.1 Authentication and onboarding

#### MVP requirements

- Support Google OAuth.
- Support email/password authentication with email verification.
- Collect role during onboarding: student, alumni, or admin-invited admin.
- Require basic profile completion before accessing the directory:
  - Full name
  - Role
  - Email
  - Department/branch
  - Graduation year or expected graduation year
  - Location
  - Headline
- Alumni verification options:
  - Admin approval after signup
  - Import allowlist by email or alumni ID, if available
  - College domain auto-verification for eligible users, where appropriate

#### Phase 2 requirements

- LinkedIn import or profile enrichment.
- Alumni association membership linkage.
- SSO with institutional identity provider if available.
- Invite campaigns and referral invites.

### 2.2 User profiles

#### MVP requirements

- Public profile fields:
  - Name, role, profile photo, headline, location
  - BMSCE department/branch and graduation year
  - Current company, title, industry
  - Skills
  - Mentorship availability
  - Referral availability
  - Short bio
  - Work history
  - Education history
  - Social links, including LinkedIn and personal website
- Privacy controls:
  - Show/hide email
  - Show/hide phone
  - Allow/disallow direct messages
  - Allow/disallow mentorship requests
- Admin badge for verified users.

#### Phase 2 requirements

- Recommendations and endorsements.
- Profile completeness scoring.
- Badges for mentors, speakers, recruiters, and chapter leads.
- Rich media and project portfolios.

### 2.3 Alumni search and directory

#### MVP requirements

- Directory of verified alumni.
- Search and filters:
  - Name
  - Company
  - Location
  - Industry
  - Graduation year
  - Department/branch
  - Skills
  - Mentorship availability
  - Referral availability
- Sort options:
  - Relevance
  - Recently active
  - Graduation year
  - Name
- Saved search URL state for sharing.

#### Phase 2 requirements

- Saved alumni lists.
- Recommended mentors based on student goals.
- Alumni map by location.
- Advanced boolean search.

### 2.4 Direct messaging and email alerts

#### MVP requirements

- One-to-one messaging between verified users.
- Conversations can begin from profile pages, mentorship requests, or job posts.
- Email alert on new direct message.
- Basic abuse controls:
  - Block user
  - Report conversation
  - Admin moderation view
- Message read status.

#### Phase 2 requirements

- Attachments.
- Message templates for mentorship and referrals.
- Weekly digest emails.
- Group messaging for event cohorts or chapters.

### 2.5 Mentorship requests

#### MVP requirements

- Students can request mentorship from alumni who are open to mentoring.
- Request includes:
  - Topic
  - Goal
  - Short message
  - Preferred communication mode
- Request statuses:
  - Pending
  - Accepted
  - Declined
  - Cancelled
  - Completed
- Email alerts to alumni on new requests and students on status changes.
- Accepted mentorship creates or links to a direct message conversation.

#### Phase 2 requirements

- Mentor availability slots.
- Structured programs by department, industry, or cohort.
- Feedback after mentorship sessions.
- Mentorship analytics for admins.

### 2.6 Event management

#### MVP requirements

- Admins can create, update, publish, cancel, and delete events.
- Event fields:
  - Title
  - Description
  - Start and end time
  - Location or virtual meeting URL
  - Organizer
  - Capacity
  - Audience: students, alumni, or both
  - Tags
- Users can RSVP and cancel RSVP.
- Email reminders for published events and RSVP confirmations.

#### Phase 2 requirements

- Event check-ins with QR code.
- Speaker profiles.
- Recurring events.
- Chapter-based events.
- Calendar integrations.

### 2.7 Job board

#### MVP requirements

- Alumni and admins can post jobs and internships.
- Admin moderation required before public listing, configurable later.
- Job fields:
  - Title
  - Company
  - Location
  - Remote/hybrid/on-site
  - Employment type
  - Description
  - Required skills
  - Experience level
  - Application URL or contact instructions
  - Referral contact, if available
  - Expiration date
- Students and alumni can browse, search, and filter jobs.
- Users can save jobs and mark jobs as applied.

#### Phase 2 requirements

- In-platform applications.
- Resume uploads.
- Recruiter dashboards.
- Referral request workflow tied to job posts.

### 2.8 Discussion forums

#### MVP requirements

- Topic-based forums with posts and threaded comments.
- Initial categories:
  - Career advice
  - Higher studies
  - Entrepreneurship
  - Referrals and jobs
  - Events
  - Campus updates
  - Batch and department groups
- Users can create posts, comment, edit own content, and delete own content.
- Admins can pin, lock, hide, and delete posts/comments.
- Reporting for posts/comments.

#### Phase 2 requirements

- Rich text editor.
- Polls.
- Anonymous student questions with moderation.
- Digest summaries.

### 2.9 Admin dashboard

#### MVP requirements

- Admin login with role-based permissions.
- Dashboard sections:
  - User verification queue
  - User management
  - Reported content and conversations
  - Event management
  - Job moderation
  - Basic analytics
- Admin actions:
  - Approve/reject verification
  - Suspend/reactivate users
  - Change user role
  - Remove content
  - Publish/cancel events
  - Approve/reject job posts
- Audit log for sensitive admin actions.

#### Phase 2 requirements

- Bulk imports and exports.
- Campaign management.
- Advanced analytics and cohort funnels.
- Delegated admins for departments, batches, and city chapters.

## 3. User Stories

### 3.1 Authentication and onboarding

- As a student, I want to sign up with Google so that I can join without creating another password.
- As an alumnus, I want to verify my BMSCE connection so that other members can trust my profile.
- As an admin, I want to review new alumni accounts so that only valid alumni enter the directory.
- As a user, I want to complete my profile during onboarding so that others can understand my background.

### 3.2 Profiles

- As an alumnus, I want to add my education and work history so that students can evaluate whether I am a relevant mentor.
- As a student, I want to list my skills and goals so that alumni can understand how to help me.
- As a user, I want privacy controls so that I can choose what contact information is visible.
- As an alumnus, I want to mark myself available for mentorship or referrals so that students know when it is appropriate to contact me.

### 3.3 Search and directory

- As a student, I want to search alumni by company so that I can find people working at companies I am targeting.
- As a student, I want to filter alumni by skills and industry so that I can find domain-specific guidance.
- As an alumnus, I want to find batchmates by graduation year and branch so that I can reconnect with peers.
- As an admin, I want the directory to show only verified alumni by default so that trust remains high.

### 3.4 Messaging

- As a student, I want to message an alumnus after viewing their profile so that I can ask for advice.
- As an alumnus, I want email alerts for new messages so that I do not need to check the platform constantly.
- As a user, I want to block or report abusive messages so that I can feel safe using the platform.
- As an admin, I want to inspect reported conversations so that I can resolve abuse reports.

### 3.5 Mentorship

- As a student, I want to send a structured mentorship request so that alumni receive useful context.
- As an alumnus, I want to accept or decline mentorship requests so that I can manage my availability.
- As a student, I want to see the status of my requests so that I know whether to follow up.
- As an admin, I want to track accepted mentorship requests so that the college can measure program impact.

### 3.6 Events

- As an admin, I want to publish alumni events so that students and alumni can discover them.
- As a user, I want to RSVP to an event so that organizers can estimate attendance.
- As an event organizer, I want to limit event capacity so that logistics remain manageable.
- As a user, I want email reminders so that I do not miss events I registered for.

### 3.7 Jobs

- As an alumnus, I want to post openings from my company so that BMSCE students can apply.
- As a student, I want to filter jobs by skills, location, and experience level so that I can find relevant roles.
- As an admin, I want to moderate job posts so that low-quality or spam posts do not appear.
- As a user, I want to save jobs and mark applications so that I can track opportunities.

### 3.8 Forums

- As a student, I want to ask career questions in forums so that multiple alumni can respond.
- As an alumnus, I want to share advice publicly so that repeated questions can benefit many students.
- As an admin, I want to pin important posts so that announcements are visible.
- As a user, I want to report inappropriate posts so that the community remains safe.

## 4. Database Schema

The schema below assumes PostgreSQL with UUID primary keys, full-text search, and optional Postgres extensions such as `pg_trgm` for fuzzy search. A rapid MVP can use Supabase, Neon, or managed Postgres with Prisma or Drizzle.

### 4.1 Entity overview

- `users`: account, role, verification, and status.
- `profiles`: public and private profile details.
- `education_history`: BMSCE and other education records.
- `work_history`: employment records.
- `skills` and `user_skills`: normalized skill taxonomy.
- `conversations`, `conversation_participants`, `messages`: direct messaging.
- `mentorship_requests`: structured mentorship workflow.
- `events` and `event_rsvps`: events and attendance.
- `jobs`, `job_skills`, `saved_jobs`, `job_applications`: job board.
- `forum_categories`, `forum_posts`, `forum_comments`: discussion forums.
- `reports`: abuse and content reporting.
- `admin_audit_logs`: sensitive action tracking.
- `notifications`: in-app and email notification queue.

### 4.2 PostgreSQL schema draft

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TYPE user_role AS ENUM ('student', 'alumni', 'admin');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'deleted');
CREATE TYPE mentorship_status AS ENUM ('pending', 'accepted', 'declined', 'cancelled', 'completed');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled');
CREATE TYPE rsvp_status AS ENUM ('going', 'cancelled', 'waitlisted');
CREATE TYPE job_status AS ENUM ('draft', 'pending_review', 'published', 'rejected', 'expired', 'closed');
CREATE TYPE report_status AS ENUM ('open', 'reviewing', 'resolved', 'dismissed');
CREATE TYPE notification_channel AS ENUM ('in_app', 'email');
CREATE TYPE notification_status AS ENUM ('queued', 'sent', 'failed', 'read');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email CITEXT UNIQUE NOT NULL,
  password_hash TEXT,
  google_id TEXT UNIQUE,
  role user_role NOT NULL,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  status user_status NOT NULL DEFAULT 'active',
  email_verified_at TIMESTAMPTZ,
  last_active_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  profile_photo_url TEXT,
  headline TEXT,
  bio TEXT,
  department TEXT NOT NULL,
  graduation_year INT NOT NULL,
  current_company TEXT,
  current_title TEXT,
  industry TEXT,
  location_city TEXT,
  location_country TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  phone TEXT,
  show_email BOOLEAN NOT NULL DEFAULT false,
  show_phone BOOLEAN NOT NULL DEFAULT false,
  allow_messages BOOLEAN NOT NULL DEFAULT true,
  open_to_mentorship BOOLEAN NOT NULL DEFAULT false,
  open_to_referrals BOOLEAN NOT NULL DEFAULT false,
  profile_completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE education_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT,
  field_of_study TEXT,
  start_year INT,
  end_year INT,
  is_bmsce BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE work_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  industry TEXT,
  location TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name CITEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE user_skills (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, skill_id)
);

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE conversation_participants (
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_read_at TIMESTAMPTZ,
  blocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE mentorship_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  goal TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_mode TEXT,
  status mentorship_status NOT NULL DEFAULT 'pending',
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT mentorship_not_self CHECK (student_id <> mentor_id)
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  location TEXT,
  virtual_url TEXT,
  organizer_name TEXT,
  capacity INT,
  audience user_role[],
  tags TEXT[] NOT NULL DEFAULT '{}',
  status event_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT event_time_order CHECK (ends_at > starts_at)
);

CREATE TABLE event_rsvps (
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status rsvp_status NOT NULL DEFAULT 'going',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (event_id, user_id)
);

CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  workplace_type TEXT,
  employment_type TEXT,
  experience_level TEXT,
  description TEXT NOT NULL,
  application_url TEXT,
  contact_email CITEXT,
  referral_contact_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ,
  status job_status NOT NULL DEFAULT 'pending_review',
  rejection_reason TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE job_skills (
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (job_id, skill_id)
);

CREATE TABLE saved_jobs (
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (job_id, user_id)
);

CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE (job_id, user_id)
);

CREATE TABLE forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES forum_categories(id) ON DELETE RESTRICT,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  hidden_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE forum_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES forum_comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  hidden_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status report_status NOT NULL DEFAULT 'open',
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  channel notification_channel NOT NULL,
  status notification_status NOT NULL DEFAULT 'queued',
  type TEXT NOT NULL,
  subject TEXT,
  body TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  sent_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 4.3 Indexing and search strategy

```sql
CREATE INDEX idx_users_role_verification ON users(role, verification_status, status);
CREATE INDEX idx_profiles_company ON profiles(current_company);
CREATE INDEX idx_profiles_location ON profiles(location_city, location_country);
CREATE INDEX idx_profiles_industry ON profiles(industry);
CREATE INDEX idx_profiles_graduation_year ON profiles(graduation_year);
CREATE INDEX idx_work_history_company ON work_history(company);
CREATE INDEX idx_messages_conversation_created ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_mentorship_mentor_status ON mentorship_requests(mentor_id, status);
CREATE INDEX idx_mentorship_student_status ON mentorship_requests(student_id, status);
CREATE INDEX idx_events_status_start ON events(status, starts_at);
CREATE INDEX idx_jobs_status_created ON jobs(status, created_at DESC);
CREATE INDEX idx_forum_posts_category_created ON forum_posts(category_id, created_at DESC);

-- Optional fuzzy/full-text search indexes for Postgres.
CREATE INDEX idx_profiles_name_trgm ON profiles USING gin (full_name gin_trgm_ops);
CREATE INDEX idx_profiles_company_trgm ON profiles USING gin (current_company gin_trgm_ops);
CREATE INDEX idx_skills_name_trgm ON skills USING gin (name gin_trgm_ops);
```

For MVP, Postgres queries with targeted indexes are enough. If search becomes a bottleneck, add Meilisearch, Typesense, or OpenSearch for directory and job search.

## 5. API Design

The API can be implemented as REST for speed and clarity. Use JSON over HTTPS, session cookies or JWTs, and role-based authorization middleware. A Next.js full-stack app can expose these as route handlers; a separate backend can expose the same contract.

### 5.1 API conventions

- Base path: `/api/v1`
- Authentication: secure HTTP-only session cookie or Bearer token.
- Pagination: `?limit=20&cursor=<opaque_cursor>`
- Sorting: `?sort=relevance|recent|name|graduation_year`
- Errors:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Graduation year is required",
    "fields": {
      "graduationYear": "Required"
    }
  }
}
```

### 5.2 Auth endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Register with email/password |
| POST | `/auth/login` | Public | Login with email/password |
| GET | `/auth/google/start` | Public | Start Google OAuth |
| GET | `/auth/google/callback` | Public | OAuth callback |
| POST | `/auth/logout` | User | End session |
| POST | `/auth/verify-email` | Public | Verify email token |
| GET | `/me` | User | Current user and profile status |

### 5.3 Profile endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/profiles/me` | User | Get own profile |
| PATCH | `/profiles/me` | User | Update own profile |
| GET | `/profiles/:userId` | User | Get public profile |
| POST | `/profiles/me/education` | User | Add education record |
| PATCH | `/profiles/me/education/:id` | User | Update education record |
| DELETE | `/profiles/me/education/:id` | User | Delete education record |
| POST | `/profiles/me/work` | User | Add work record |
| PATCH | `/profiles/me/work/:id` | User | Update work record |
| DELETE | `/profiles/me/work/:id` | User | Delete work record |
| PUT | `/profiles/me/skills` | User | Replace own skill list |

### 5.4 Directory and search endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/alumni` | User | Search alumni directory |
| GET | `/alumni/filters` | User | Fetch available filter values |

Example:

```http
GET /api/v1/alumni?q=google&company=Google&location=Bengaluru&industry=Software&graduationYear=2018&skills=React,Data%20Science&openToMentorship=true
```

### 5.5 Messaging endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/conversations` | User | List conversations |
| POST | `/conversations` | User | Start or reuse a one-to-one conversation |
| GET | `/conversations/:id/messages` | Participant | List messages |
| POST | `/conversations/:id/messages` | Participant | Send message |
| POST | `/conversations/:id/read` | Participant | Mark conversation read |
| POST | `/conversations/:id/block` | Participant | Block conversation participant |
| POST | `/conversations/:id/report` | Participant | Report conversation |

### 5.6 Mentorship endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/mentorship/requests` | User | List sent/received requests |
| POST | `/mentorship/requests` | Student | Create request |
| PATCH | `/mentorship/requests/:id` | Request participant | Accept, decline, cancel, or complete |

Create request payload:

```json
{
  "mentorId": "uuid",
  "topic": "Backend engineering career path",
  "goal": "Understand how to prepare for SDE interviews",
  "message": "I am a 3rd-year CSE student and would appreciate guidance.",
  "preferredMode": "chat"
}
```

### 5.7 Event endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/events` | User | List published events |
| GET | `/events/:id` | User | Get event |
| POST | `/events` | Admin | Create event |
| PATCH | `/events/:id` | Admin | Update event |
| POST | `/events/:id/publish` | Admin | Publish event |
| POST | `/events/:id/cancel` | Admin | Cancel event |
| POST | `/events/:id/rsvp` | User | RSVP |
| DELETE | `/events/:id/rsvp` | User | Cancel RSVP |

### 5.8 Job endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/jobs` | User | Search published jobs |
| GET | `/jobs/:id` | User | Get job |
| POST | `/jobs` | Alumni/Admin | Create job post |
| PATCH | `/jobs/:id` | Owner/Admin | Update job post |
| POST | `/jobs/:id/submit` | Owner | Submit draft for review |
| POST | `/jobs/:id/approve` | Admin | Approve job |
| POST | `/jobs/:id/reject` | Admin | Reject job |
| POST | `/jobs/:id/save` | User | Save job |
| DELETE | `/jobs/:id/save` | User | Unsave job |
| POST | `/jobs/:id/applications` | User | Mark applied |

### 5.9 Forum endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/forum/categories` | User | List categories |
| GET | `/forum/posts` | User | List posts by category/search |
| POST | `/forum/posts` | User | Create post |
| GET | `/forum/posts/:id` | User | Get post with comments |
| PATCH | `/forum/posts/:id` | Author/Admin | Update post |
| DELETE | `/forum/posts/:id` | Author/Admin | Delete or hide post |
| POST | `/forum/posts/:id/comments` | User | Add comment |
| PATCH | `/forum/comments/:id` | Author/Admin | Update comment |
| DELETE | `/forum/comments/:id` | Author/Admin | Delete or hide comment |
| POST | `/forum/posts/:id/report` | User | Report post |
| POST | `/forum/comments/:id/report` | User | Report comment |

### 5.10 Admin endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/admin/overview` | Admin | Analytics summary |
| GET | `/admin/users` | Admin | Search users |
| PATCH | `/admin/users/:id` | Admin | Update role/status |
| GET | `/admin/verifications` | Admin | Verification queue |
| POST | `/admin/verifications/:userId/approve` | Admin | Approve user |
| POST | `/admin/verifications/:userId/reject` | Admin | Reject user |
| GET | `/admin/reports` | Admin | Moderation queue |
| PATCH | `/admin/reports/:id` | Admin | Resolve or dismiss report |
| GET | `/admin/audit-logs` | Admin | Audit log |

## 6. System Architecture

### 6.1 Recommended startup stack

For rapid startup-style development:

- Frontend and backend: Next.js with TypeScript.
- UI: Tailwind CSS and shadcn/ui.
- Auth: Auth.js, Clerk, Supabase Auth, or Firebase Auth. Choose managed auth if speed matters more than deep control.
- Database: PostgreSQL on Supabase, Neon, or Railway.
- ORM: Prisma or Drizzle.
- File storage: S3-compatible storage or Supabase Storage for profile photos and future resumes.
- Email: Resend, Postmark, or SendGrid.
- Background jobs: Inngest, Trigger.dev, or a simple queue table with a worker for MVP.
- Search: Postgres full-text and trigram indexes initially; Meilisearch or Typesense later.
- Hosting: Vercel for web, managed Postgres, managed email provider.
- Observability: Sentry for errors, PostHog for product analytics, provider logs for email delivery.

### 6.2 High-level architecture

```text
Browser
  |
  | HTTPS
  v
Next.js Web App
  |-- UI routes: onboarding, directory, profiles, messages, mentorship, events, jobs, forums, admin
  |-- API routes / server actions
  |-- RBAC middleware
  |
  +--> Auth Provider
  |
  +--> PostgreSQL
  |      |-- application data
  |      |-- search indexes
  |
  +--> Object Storage
  |      |-- profile photos
  |      |-- future resumes and attachments
  |
  +--> Email Provider
  |      |-- verification emails
  |      |-- message alerts
  |      |-- mentorship notifications
  |      |-- event reminders
  |
  +--> Background Worker
         |-- notification dispatch
         |-- event reminders
         |-- digest generation
```

### 6.3 Core modules

#### Identity and access

- Handles login, OAuth callback, session management, roles, and verification status.
- Enforces access rules:
  - Unverified users can complete onboarding and view limited information.
  - Verified users can search, message, post, RSVP, and request mentorship.
  - Admins can moderate and manage platform resources.

#### Profile and directory

- Stores normalized profile, education, work, and skills data.
- Provides filtered alumni search and profile visibility rules.

#### Messaging and notifications

- Stores conversations and messages.
- Creates notification rows and dispatches email alerts asynchronously.
- Applies block/report safeguards.

#### Mentorship

- Owns structured request state transitions.
- Creates a conversation when a request is accepted.
- Emits notifications on request creation and status changes.

#### Community content

- Owns forum categories, posts, comments, moderation states, and reports.
- Keeps moderation state simple: visible, hidden, locked, pinned.

#### Events and jobs

- Events: publishing, RSVP, reminders.
- Jobs: posting, review, search, save/apply tracking.

#### Admin

- Verification queue.
- Moderation queue.
- Admin actions and audit log.
- Basic analytics.

### 6.4 Authorization matrix

| Capability | Student | Alumni | Admin |
| --- | --- | --- | --- |
| Complete profile | Yes | Yes | Yes |
| Search alumni | Verified only | Verified only | Yes |
| Message users | Verified only | Verified only | Yes |
| Request mentorship | Verified only | No by default | Yes for support |
| Receive mentorship requests | If enabled later | Yes if enabled | Yes for testing |
| Create events | No | No by default | Yes |
| RSVP to events | Verified only | Verified only | Yes |
| Create job posts | No by default | Yes | Yes |
| Moderate jobs | No | No | Yes |
| Create forum posts/comments | Verified only | Verified only | Yes |
| Moderate forums | No | No | Yes |
| Manage users | No | No | Yes |

### 6.5 Security, privacy, and compliance considerations

- Use email verification and alumni verification before granting full access.
- Store passwords only as strong hashes if email/password auth is self-managed.
- Use HTTP-only secure cookies for sessions where possible.
- Apply rate limits to login, signup, messaging, mentorship requests, and forum posting.
- Never expose hidden profile fields through public APIs.
- Log sensitive admin actions in `admin_audit_logs`.
- Implement content reporting and user blocking in MVP.
- Add data deletion and export workflows before broad launch.
- Keep email notifications privacy-safe: include enough context to drive return visits, but avoid exposing sensitive message bodies if policy requires it.

### 6.6 Analytics events

Track events such as:

- `user_signed_up`
- `profile_completed`
- `verification_submitted`
- `verification_approved`
- `alumni_search_performed`
- `profile_viewed`
- `message_sent`
- `mentorship_request_created`
- `mentorship_request_accepted`
- `event_rsvped`
- `job_saved`
- `job_applied_marked`
- `forum_post_created`
- `report_created`

## 7. MVP vs Phase 2 Roadmap

### 7.1 MVP: Validate trusted career networking

Ship the smallest complete loop: verified users can create profiles, find alumni, message them, request mentorship, discover events/jobs, and participate in basic forums.

#### MVP features

- Authentication:
  - Google OAuth
  - Email/password
  - Email verification
- Onboarding:
  - Role selection
  - Required profile fields
  - Alumni verification queue
- Profiles:
  - Profile edit and public profile pages
  - Education history
  - Work history
  - Skills
  - Privacy controls
- Directory:
  - Verified alumni directory
  - Search and filters
- Messaging:
  - One-to-one messages
  - Email alerts
  - Block/report
- Mentorship:
  - Structured requests
  - Accept/decline/cancel/complete
- Events:
  - Admin-created events
  - Published event list
  - RSVP
  - Reminder emails
- Jobs:
  - Alumni/admin job posting
  - Admin review
  - Search/filter
  - Save and mark applied
- Forums:
  - Categories
  - Posts
  - Comments
  - Basic moderation
- Admin:
  - Verification queue
  - User management
  - Job moderation
  - Content reports
  - Basic analytics

#### MVP build sequence

1. Foundation: Next.js app, database, auth, roles, email provider, deployment.
2. Onboarding and profile completion.
3. Alumni directory search.
4. Messaging and email alerts.
5. Mentorship request workflow.
6. Events and RSVPs.
7. Job board and moderation.
8. Forums and reporting.
9. Admin dashboard and analytics polish.

### 7.2 Phase 2: Scale community and improve matching

Add features after the MVP shows repeat usage and enough verified alumni density.

#### Phase 2 features

- LinkedIn/profile import.
- Recommended mentor matching.
- Saved alumni lists.
- Referral request workflow attached to jobs.
- Resume uploads and in-platform applications.
- Event check-ins, calendar integrations, and recurring events.
- Department, batch, and city chapters.
- Group messaging.
- Rich text forums, polls, anonymous questions, and digests.
- Alumni map.
- Advanced admin analytics and campaign management.
- Mobile app or PWA enhancements.
- AI-assisted search, mentor recommendations, and content summaries.

## 8. MVP Acceptance Criteria

- A new student can sign up, verify email, complete onboarding, and search verified alumni.
- A new alumnus can sign up, complete a profile, and become visible after admin verification.
- A student can filter alumni by company, location, industry, graduation year, and skills.
- A student can send a message to an alumnus and the alumnus receives an email alert.
- A student can submit a mentorship request and the alumnus can accept or decline it.
- An admin can create an event and users can RSVP.
- An alumnus can submit a job post and an admin can approve it for listing.
- Users can create forum posts and comments, and admins can moderate reports.
- Admins can approve/reject verifications and suspend users.
- Sensitive admin actions are recorded in audit logs.

## 9. Open Product Decisions

- Which identity provider should be authoritative for students: college Google Workspace, personal email, or both?
- Does BMSCE have an existing alumni database for initial verification/import?
- Should alumni be allowed to message students first, or only reply after student initiation?
- Are referral requests allowed directly, or should the MVP only support general messaging around referrals?
- Who owns event creation in MVP: only central admins, or department/chapter admins as well?
- Should job posting be limited to verified alumni and admins only?
- What data retention and deletion policy should the college require?

## 10. Launch Plan

### 10.1 Seed community

- Start with a focused cohort: selected departments, recent batches, active alumni volunteers, and placement/community coordinators.
- Import or invite known alumni first to ensure search results are useful on day one.
- Recruit a small group of alumni mentors across common target industries: software, core engineering, consulting, research, entrepreneurship, higher studies, and public sector.

### 10.2 Early operating model

- Assign at least one admin owner for verification and moderation.
- Define expected verification SLA and content rules.
- Create initial forum categories and seed useful posts.
- Publish a few launch events and job posts before inviting students broadly.

### 10.3 Feedback loops

- Add in-product feedback links on directory, messaging, mentorship, events, and jobs.
- Review analytics weekly by cohort, role, and feature.
- Interview students who sent requests and alumni who accepted or ignored them.
- Prioritize improvements that increase verified alumni density, response rates, and successful mentorship/job outcomes.
