CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TYPE public.user_role AS ENUM ('student', 'alumni', 'admin');
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE public.mentorship_status AS ENUM ('pending', 'accepted', 'declined', 'cancelled', 'completed');
CREATE TYPE public.event_status AS ENUM ('draft', 'published', 'cancelled');
CREATE TYPE public.rsvp_status AS ENUM ('going', 'cancelled', 'waitlisted');
CREATE TYPE public.report_status AS ENUM ('open', 'reviewing', 'resolved', 'dismissed');
CREATE TYPE public.notification_channel AS ENUM ('in_app', 'email');
CREATE TYPE public.notification_status AS ENUM ('queued', 'sent', 'failed', 'read');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE,
  full_name TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'student',
  verification_status public.verification_status NOT NULL DEFAULT 'pending',
  headline TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  department TEXT NOT NULL,
  graduation_year INT NOT NULL,
  current_company TEXT,
  current_title TEXT,
  industry TEXT,
  location_city TEXT NOT NULL,
  location_country TEXT NOT NULL DEFAULT 'India',
  profile_photo_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  show_email BOOLEAN NOT NULL DEFAULT false,
  allow_messages BOOLEAN NOT NULL DEFAULT true,
  open_to_mentorship BOOLEAN NOT NULL DEFAULT false,
  open_to_referrals BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.education_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT,
  field_of_study TEXT,
  start_year INT,
  end_year INT,
  is_bmsce BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.work_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  industry TEXT,
  location TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name CITEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.profile_skills (
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (profile_id, skill_id)
);

CREATE TABLE public.mentorship_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_auth_user_id UUID NOT NULL,
  mentor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mentor_auth_user_id UUID NOT NULL,
  topic TEXT NOT NULL,
  goal TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_mode TEXT,
  status public.mentorship_status NOT NULL DEFAULT 'pending',
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT mentorship_not_self CHECK (student_auth_user_id <> mentor_auth_user_id)
);

CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.conversation_participants (
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  auth_user_id UUID NOT NULL,
  last_read_at TIMESTAMPTZ,
  blocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, auth_user_id)
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_auth_user_id UUID NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by_auth_user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  location TEXT,
  virtual_url TEXT,
  capacity INT,
  audience public.user_role[] NOT NULL DEFAULT ARRAY['student'::public.user_role, 'alumni'::public.user_role],
  status public.event_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT event_time_order CHECK (ends_at > starts_at)
);

CREATE TABLE public.event_rsvps (
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  auth_user_id UUID NOT NULL,
  status public.rsvp_status NOT NULL DEFAULT 'going',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (event_id, auth_user_id)
);

CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_auth_user_id UUID NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status public.report_status NOT NULL DEFAULT 'open',
  resolved_by_auth_user_id UUID,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID NOT NULL,
  channel public.notification_channel NOT NULL,
  status public.notification_status NOT NULL DEFAULT 'queued',
  type TEXT NOT NULL,
  subject TEXT,
  body TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  sent_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_auth_user_id UUID NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER mentorship_requests_set_updated_at BEFORE UPDATE ON public.mentorship_requests
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER events_set_updated_at BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER event_rsvps_set_updated_at BEFORE UPDATE ON public.event_rsvps
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE auth_user_id = auth.uid()
      AND role = 'admin'
      AND verification_status = 'verified'
  );
$$;

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  requested_role public.user_role;
BEGIN
  requested_role := CASE
    WHEN NEW.raw_user_meta_data->>'role' IN ('student', 'alumni', 'admin')
      THEN (NEW.raw_user_meta_data->>'role')::public.user_role
    ELSE 'student'::public.user_role
  END;

  INSERT INTO public.profiles (
    auth_user_id,
    full_name,
    role,
    verification_status,
    headline,
    department,
    graduation_year,
    location_city,
    location_country
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1), 'BMSCE member'),
    requested_role,
    CASE WHEN requested_role = 'student' THEN 'verified'::public.verification_status ELSE 'pending'::public.verification_status END,
    'BMSCE community member',
    COALESCE(NEW.raw_user_meta_data->>'department', 'Undeclared'),
    CASE
      WHEN NEW.raw_user_meta_data->>'graduation_year' ~ '^[0-9]{4}$'
        THEN (NEW.raw_user_meta_data->>'graduation_year')::INT
      ELSE EXTRACT(YEAR FROM now())::INT
    END,
    COALESCE(NEW.raw_user_meta_data->>'location_city', 'Bengaluru'),
    COALESCE(NEW.raw_user_meta_data->>'location_country', 'India')
  )
  ON CONFLICT (auth_user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

CREATE INDEX idx_profiles_role_verification ON public.profiles(role, verification_status);
CREATE INDEX idx_profiles_company_trgm ON public.profiles USING gin (current_company gin_trgm_ops);
CREATE INDEX idx_profiles_location ON public.profiles(location_city, location_country);
CREATE INDEX idx_profiles_industry ON public.profiles(industry);
CREATE INDEX idx_profiles_graduation_year ON public.profiles(graduation_year);
CREATE INDEX idx_skills_name_trgm ON public.skills USING gin (name gin_trgm_ops);
CREATE INDEX idx_mentorship_student ON public.mentorship_requests(student_auth_user_id, status);
CREATE INDEX idx_mentorship_mentor ON public.mentorship_requests(mentor_auth_user_id, status);
CREATE INDEX idx_messages_conversation_created ON public.messages(conversation_id, created_at DESC);
CREATE INDEX idx_events_status_start ON public.events(status, starts_at);
CREATE INDEX idx_notifications_user_status ON public.notifications(auth_user_id, status);
CREATE INDEX idx_reports_status ON public.reports(status, created_at DESC);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_verified_or_own_or_admin"
ON public.profiles FOR SELECT TO authenticated
USING (verification_status = 'verified' OR auth_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "profiles_insert_own"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "profiles_update_own_or_admin"
ON public.profiles FOR UPDATE TO authenticated
USING (auth_user_id = auth.uid() OR public.is_admin())
WITH CHECK (auth_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "education_select_visible_profiles"
ON public.education_history FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = education_history.profile_id
    AND (profiles.verification_status = 'verified' OR profiles.auth_user_id = auth.uid() OR public.is_admin())
));

CREATE POLICY "education_manage_own_or_admin"
ON public.education_history FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = education_history.profile_id
    AND (profiles.auth_user_id = auth.uid() OR public.is_admin())
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = education_history.profile_id
    AND (profiles.auth_user_id = auth.uid() OR public.is_admin())
));

CREATE POLICY "work_select_visible_profiles"
ON public.work_history FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = work_history.profile_id
    AND (profiles.verification_status = 'verified' OR profiles.auth_user_id = auth.uid() OR public.is_admin())
));

CREATE POLICY "work_manage_own_or_admin"
ON public.work_history FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = work_history.profile_id
    AND (profiles.auth_user_id = auth.uid() OR public.is_admin())
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = work_history.profile_id
    AND (profiles.auth_user_id = auth.uid() OR public.is_admin())
));

CREATE POLICY "skills_select_all_authenticated"
ON public.skills FOR SELECT TO authenticated
USING (true);

CREATE POLICY "profile_skills_select_visible_profiles"
ON public.profile_skills FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = profile_skills.profile_id
    AND (profiles.verification_status = 'verified' OR profiles.auth_user_id = auth.uid() OR public.is_admin())
));

CREATE POLICY "profile_skills_manage_own_or_admin"
ON public.profile_skills FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = profile_skills.profile_id
    AND (profiles.auth_user_id = auth.uid() OR public.is_admin())
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = profile_skills.profile_id
    AND (profiles.auth_user_id = auth.uid() OR public.is_admin())
));

CREATE POLICY "mentorship_select_participants_or_admin"
ON public.mentorship_requests FOR SELECT TO authenticated
USING (student_auth_user_id = auth.uid() OR mentor_auth_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "mentorship_insert_student"
ON public.mentorship_requests FOR INSERT TO authenticated
WITH CHECK (student_auth_user_id = auth.uid());

CREATE POLICY "mentorship_update_participants_or_admin"
ON public.mentorship_requests FOR UPDATE TO authenticated
USING (student_auth_user_id = auth.uid() OR mentor_auth_user_id = auth.uid() OR public.is_admin())
WITH CHECK (student_auth_user_id = auth.uid() OR mentor_auth_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "conversations_select_participants_or_admin"
ON public.conversations FOR SELECT TO authenticated
USING (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.conversation_participants
    WHERE conversation_participants.conversation_id = conversations.id
      AND conversation_participants.auth_user_id = auth.uid()
  )
);

CREATE POLICY "conversation_participants_select_self_or_admin"
ON public.conversation_participants FOR SELECT TO authenticated
USING (auth_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "messages_select_participants_or_admin"
ON public.messages FOR SELECT TO authenticated
USING (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.conversation_participants
    WHERE conversation_participants.conversation_id = messages.conversation_id
      AND conversation_participants.auth_user_id = auth.uid()
  )
);

CREATE POLICY "messages_insert_participants"
ON public.messages FOR INSERT TO authenticated
WITH CHECK (
  sender_auth_user_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.conversation_participants
    WHERE conversation_participants.conversation_id = messages.conversation_id
      AND conversation_participants.auth_user_id = auth.uid()
      AND conversation_participants.blocked_at IS NULL
  )
);

CREATE POLICY "events_select_published_or_admin"
ON public.events FOR SELECT TO authenticated
USING (status = 'published' OR created_by_auth_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "events_admin_manage"
ON public.events FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "event_rsvps_select_own_or_admin"
ON public.event_rsvps FOR SELECT TO authenticated
USING (auth_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "event_rsvps_insert_own"
ON public.event_rsvps FOR INSERT TO authenticated
WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "event_rsvps_update_own"
ON public.event_rsvps FOR UPDATE TO authenticated
USING (auth_user_id = auth.uid())
WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "reports_select_own_or_admin"
ON public.reports FOR SELECT TO authenticated
USING (reporter_auth_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "reports_insert_own"
ON public.reports FOR INSERT TO authenticated
WITH CHECK (reporter_auth_user_id = auth.uid());

CREATE POLICY "reports_admin_update"
ON public.reports FOR UPDATE TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "notifications_select_own_or_admin"
ON public.notifications FOR SELECT TO authenticated
USING (auth_user_id = auth.uid() OR public.is_admin());

CREATE POLICY "notifications_insert_system_or_admin"
ON public.notifications FOR INSERT TO authenticated
WITH CHECK (public.is_admin() OR auth_user_id = auth.uid());

CREATE POLICY "admin_audit_logs_select_admin"
ON public.admin_audit_logs FOR SELECT TO authenticated
USING (public.is_admin());

CREATE POLICY "admin_audit_logs_insert_admin"
ON public.admin_audit_logs FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

CREATE OR REPLACE VIEW public.event_summaries
WITH (security_invoker = on)
AS
SELECT
  events.*,
  COUNT(event_rsvps.auth_user_id) FILTER (WHERE event_rsvps.status = 'going')::INT AS attendee_count
FROM public.events
LEFT JOIN public.event_rsvps ON event_rsvps.event_id = events.id
GROUP BY events.id;

CREATE OR REPLACE VIEW public.conversation_summaries
WITH (security_invoker = on)
AS
SELECT
  conversations.id,
  COALESCE(other_profile.full_name, 'BMSCE member') AS participant_name,
  COALESCE(other_profile.headline, 'Community member') AS participant_headline,
  COALESCE(latest_message.body, '') AS last_message,
  COALESCE(latest_message.created_at, conversations.created_at) AS last_message_at,
  COUNT(unread_messages.id)::INT AS unread_count
FROM public.conversations
JOIN public.conversation_participants current_participant
  ON current_participant.conversation_id = conversations.id
  AND current_participant.auth_user_id = auth.uid()
JOIN public.conversation_participants other_participant
  ON other_participant.conversation_id = conversations.id
  AND other_participant.auth_user_id <> auth.uid()
LEFT JOIN public.profiles other_profile
  ON other_profile.auth_user_id = other_participant.auth_user_id
LEFT JOIN LATERAL (
  SELECT body, created_at
  FROM public.messages
  WHERE messages.conversation_id = conversations.id
    AND messages.deleted_at IS NULL
  ORDER BY created_at DESC
  LIMIT 1
) latest_message ON true
LEFT JOIN public.messages unread_messages
  ON unread_messages.conversation_id = conversations.id
  AND unread_messages.sender_auth_user_id <> auth.uid()
  AND unread_messages.deleted_at IS NULL
  AND (
    current_participant.last_read_at IS NULL
    OR unread_messages.created_at > current_participant.last_read_at
  )
GROUP BY conversations.id, other_profile.full_name, other_profile.headline, latest_message.body, latest_message.created_at;

CREATE OR REPLACE FUNCTION public.create_direct_message(recipient_profile_id UUID, message_body TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recipient_auth_user_id UUID;
  new_conversation_id UUID;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT profiles.auth_user_id
    INTO recipient_auth_user_id
  FROM public.profiles
  WHERE profiles.id = recipient_profile_id
    AND profiles.allow_messages = true
    AND profiles.verification_status = 'verified';

  IF recipient_auth_user_id IS NULL THEN
    RAISE EXCEPTION 'Recipient is not available for messages';
  END IF;

  IF recipient_auth_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot message yourself';
  END IF;

  INSERT INTO public.conversations DEFAULT VALUES
  RETURNING id INTO new_conversation_id;

  INSERT INTO public.conversation_participants (conversation_id, auth_user_id)
  VALUES
    (new_conversation_id, auth.uid()),
    (new_conversation_id, recipient_auth_user_id);

  INSERT INTO public.messages (conversation_id, sender_auth_user_id, body)
  VALUES (new_conversation_id, auth.uid(), message_body);

  INSERT INTO public.notifications (auth_user_id, channel, type, subject, body, metadata)
  VALUES (
    recipient_auth_user_id,
    'email',
    'direct_message',
    'New message on BMSCE Alumni Network',
    'You have a new message from a BMSCE community member.',
    jsonb_build_object('conversationId', new_conversation_id)
  );

  RETURN new_conversation_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_direct_message(UUID, TEXT) TO authenticated;
