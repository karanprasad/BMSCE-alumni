export type UserRole = "student" | "alumni" | "admin";

export type VerificationStatus = "pending" | "verified" | "rejected";

export type Profile = {
  id: string;
  auth_user_id?: string | null;
  full_name: string;
  role: UserRole;
  verification_status: VerificationStatus;
  headline: string;
  bio: string;
  department: string;
  graduation_year: number;
  current_company: string | null;
  current_title: string | null;
  industry: string | null;
  location_city: string;
  location_country: string;
  profile_photo_url?: string | null;
  linkedin_url?: string | null;
  website_url?: string | null;
  show_email: boolean;
  allow_messages: boolean;
  open_to_mentorship: boolean;
  open_to_referrals: boolean;
  skills: string[];
  created_at?: string;
};

export type MentorshipRequest = {
  id: string;
  student_name: string;
  mentor_name: string;
  topic: string;
  goal: string;
  status: "pending" | "accepted" | "declined" | "cancelled" | "completed";
  created_at: string;
};

export type Conversation = {
  id: string;
  participant_name: string;
  participant_headline: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  location: string | null;
  virtual_url: string | null;
  audience: UserRole[];
  status: "draft" | "published" | "cancelled";
  attendee_count: number;
};

export type AdminMetric = {
  label: string;
  value: string;
  helper: string;
};
