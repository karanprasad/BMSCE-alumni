import { createClient } from "@/lib/supabase/server";
import {
  mockAdminMetrics,
  mockConversations,
  mockEvents,
  mockMentorshipRequests,
  mockProfiles,
  mockReports
} from "@/lib/mock-data";
import type { AdminMetric, Conversation, Event, MentorshipRequest, Profile, ReportSummary } from "@/types/domain";

type DirectoryFilters = {
  q?: string;
  company?: string;
  location?: string;
  industry?: string;
  graduationYear?: string;
  skills?: string;
};

function matchesText(value: string | null | undefined, needle: string) {
  return value?.toLowerCase().includes(needle.toLowerCase()) ?? false;
}

function filterMockProfiles(filters: DirectoryFilters) {
  return mockProfiles.filter((profile) => {
    const q = filters.q?.trim();
    const skills = filters.skills
      ?.split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter(Boolean);

    return (
      profile.role === "alumni" &&
      profile.verification_status === "verified" &&
      (!q ||
        matchesText(profile.full_name, q) ||
        matchesText(profile.current_company, q) ||
        matchesText(profile.headline, q) ||
        profile.skills.some((skill) => matchesText(skill, q))) &&
      (!filters.company || matchesText(profile.current_company, filters.company)) &&
      (!filters.location ||
        matchesText(profile.location_city, filters.location) ||
        matchesText(profile.location_country, filters.location)) &&
      (!filters.industry || matchesText(profile.industry, filters.industry)) &&
      (!filters.graduationYear || String(profile.graduation_year) === filters.graduationYear) &&
      (!skills?.length || skills.every((skill) => profile.skills.some((item) => item.toLowerCase().includes(skill))))
    );
  });
}

export async function getAlumniProfiles(filters: DirectoryFilters = {}): Promise<Profile[]> {
  const supabase = await createClient();

  if (!supabase) {
    return filterMockProfiles(filters);
  }

  let query = supabase
    .from("profiles")
    .select("*, profile_skills(skills(name))")
    .eq("role", "alumni")
    .eq("verification_status", "verified")
    .order("created_at", { ascending: false })
    .limit(50);

  if (filters.q) {
    query = query.or(
      `full_name.ilike.%${filters.q}%,headline.ilike.%${filters.q}%,current_company.ilike.%${filters.q}%`
    );
  }

  if (filters.company) query = query.ilike("current_company", `%${filters.company}%`);
  if (filters.location) query = query.or(`location_city.ilike.%${filters.location}%,location_country.ilike.%${filters.location}%`);
  if (filters.industry) query = query.ilike("industry", `%${filters.industry}%`);
  if (filters.graduationYear) query = query.eq("graduation_year", Number(filters.graduationYear));

  const { data, error } = await query;

  if (error || !data) {
    return filterMockProfiles(filters);
  }

  const requestedSkills = filters.skills
    ?.split(",")
    .map((skill) => skill.trim().toLowerCase())
    .filter(Boolean);

  return data
    .map((row) => ({
      ...row,
      skills: (row.profile_skills ?? [])
        .map((item: { skills: { name: string } | null }) => item.skills?.name)
        .filter(Boolean)
    }))
    .filter((profile) => {
      if (!requestedSkills?.length) return true;
      return requestedSkills.every((skill) =>
        profile.skills.some((item: string) => item.toLowerCase().includes(skill))
      );
    }) as Profile[];
}

export async function getProfile(id: string): Promise<Profile | null> {
  const supabase = await createClient();

  if (!supabase) {
    return mockProfiles.find((profile) => profile.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*, profile_skills(skills(name))")
    .eq("id", id)
    .single();

  if (error || !data) {
    return mockProfiles.find((profile) => profile.id === id) ?? null;
  }

  return {
    ...data,
    skills: (data.profile_skills ?? [])
      .map((item: { skills: { name: string } | null }) => item.skills?.name)
      .filter(Boolean)
  } as Profile;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*, profile_skills(skills(name))")
    .eq("auth_user_id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    skills: (data.profile_skills ?? [])
      .map((item: { skills: { name: string } | null }) => item.skills?.name)
      .filter(Boolean)
  } as Profile;
}

export async function getMentorshipRequests(): Promise<MentorshipRequest[]> {
  const supabase = await createClient();

  if (!supabase) {
    return mockMentorshipRequests;
  }

  const { data, error } = await supabase
    .from("mentorship_request_summaries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(25);

  if (error || !data) {
    return mockMentorshipRequests;
  }

  return data as MentorshipRequest[];
}

export async function getConversations(): Promise<Conversation[]> {
  const supabase = await createClient();

  if (!supabase) {
    return mockConversations;
  }

  const { data, error } = await supabase
    .from("conversation_summaries")
    .select("*")
    .order("last_message_at", { ascending: false })
    .limit(25);

  if (error || !data) {
    return mockConversations;
  }

  return data as Conversation[];
}

export async function getEvents(): Promise<Event[]> {
  const supabase = await createClient();

  if (!supabase) {
    return mockEvents;
  }

  const { data, error } = await supabase
    .from("event_summaries")
    .select("*")
    .eq("status", "published")
    .order("starts_at", { ascending: true });

  if (error || !data) {
    return mockEvents;
  }

  return data as Event[];
}

export async function getAdminMetrics(): Promise<AdminMetric[]> {
  const supabase = await createClient();

  if (!supabase) {
    return mockAdminMetrics;
  }

  const [
    { count: alumniCount },
    { count: studentCount },
    { count: mentorshipCount },
    { count: reportCount }
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "alumni").eq("verification_status", "verified"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("mentorship_requests").select("*", { count: "exact", head: true }),
    supabase.from("reports").select("*", { count: "exact", head: true }).eq("status", "open")
  ]);

  return [
    { label: "Verified alumni", value: String(alumniCount ?? 0), helper: "Approved directory members" },
    { label: "Students onboarded", value: String(studentCount ?? 0), helper: "Student profiles created" },
    { label: "Mentorship requests", value: String(mentorshipCount ?? 0), helper: "All-time requests" },
    { label: "Open reports", value: String(reportCount ?? 0), helper: "Needs admin review" }
  ];
}

export async function getPendingProfiles(): Promise<Profile[]> {
  const supabase = await createClient();

  if (!supabase) {
    return mockProfiles.filter((profile) => profile.verification_status === "pending");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*, profile_skills(skills(name))")
    .eq("verification_status", "pending")
    .order("created_at", { ascending: true })
    .limit(25);

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    ...row,
    skills: (row.profile_skills ?? [])
      .map((item: { skills: { name: string } | null }) => item.skills?.name)
      .filter(Boolean)
  })) as Profile[];
}

export async function getReports(): Promise<ReportSummary[]> {
  const supabase = await createClient();

  if (!supabase) {
    return mockReports as ReportSummary[];
  }

  const { data, error } = await supabase
    .from("reports")
    .select("id, reason, target_type, status, created_at")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(25);

  if (error || !data) {
    return [];
  }

  return data as ReportSummary[];
}
