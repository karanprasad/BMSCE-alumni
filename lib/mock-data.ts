import type { AdminMetric, Conversation, Event, MentorshipRequest, Profile } from "@/types/domain";

export const mockProfiles: Profile[] = [
  {
    id: "9b5b8a43-64d9-481a-9331-9f90b33a1001",
    full_name: "Ananya Rao",
    role: "alumni",
    verification_status: "verified",
    headline: "Senior Product Engineer at Google",
    bio: "BMSCE CSE alumna mentoring students on product engineering, interviews, and early-career growth.",
    department: "Computer Science and Engineering",
    graduation_year: 2016,
    current_company: "Google",
    current_title: "Senior Product Engineer",
    industry: "Software",
    location_city: "Bengaluru",
    location_country: "India",
    profile_photo_url: null,
    linkedin_url: "https://linkedin.com",
    website_url: null,
    show_email: false,
    allow_messages: true,
    open_to_mentorship: true,
    open_to_referrals: true,
    skills: ["React", "TypeScript", "System Design", "Product Engineering"]
  },
  {
    id: "9b5b8a43-64d9-481a-9331-9f90b33a1002",
    full_name: "Rahul Menon",
    role: "alumni",
    verification_status: "verified",
    headline: "Data Scientist at Microsoft",
    bio: "Works on applied ML and helps students prepare for data science internships and graduate programs.",
    department: "Information Science and Engineering",
    graduation_year: 2018,
    current_company: "Microsoft",
    current_title: "Data Scientist",
    industry: "Artificial Intelligence",
    location_city: "Hyderabad",
    location_country: "India",
    profile_photo_url: null,
    linkedin_url: "https://linkedin.com",
    website_url: null,
    show_email: false,
    allow_messages: true,
    open_to_mentorship: true,
    open_to_referrals: false,
    skills: ["Python", "Machine Learning", "Data Science", "Statistics"]
  },
  {
    id: "9b5b8a43-64d9-481a-9331-9f90b33a1003",
    full_name: "Meera Iyer",
    role: "alumni",
    verification_status: "verified",
    headline: "Founder at CircuitWorks",
    bio: "Electronics entrepreneur building industrial IoT products and supporting student founders.",
    department: "Electronics and Communication Engineering",
    graduation_year: 2012,
    current_company: "CircuitWorks",
    current_title: "Founder",
    industry: "Industrial IoT",
    location_city: "Pune",
    location_country: "India",
    profile_photo_url: null,
    linkedin_url: "https://linkedin.com",
    website_url: "https://example.com",
    show_email: false,
    allow_messages: true,
    open_to_mentorship: true,
    open_to_referrals: false,
    skills: ["IoT", "Hardware", "Entrepreneurship", "Embedded Systems"]
  },
  {
    id: "9b5b8a43-64d9-481a-9331-9f90b33a1004",
    full_name: "Vikram Bhat",
    role: "alumni",
    verification_status: "verified",
    headline: "Engineering Manager at Atlassian",
    bio: "Mentors students and alumni on engineering leadership, backend systems, and career transitions.",
    department: "Mechanical Engineering",
    graduation_year: 2010,
    current_company: "Atlassian",
    current_title: "Engineering Manager",
    industry: "Software",
    location_city: "Sydney",
    location_country: "Australia",
    profile_photo_url: null,
    linkedin_url: "https://linkedin.com",
    website_url: null,
    show_email: false,
    allow_messages: true,
    open_to_mentorship: false,
    open_to_referrals: true,
    skills: ["Leadership", "Backend", "Distributed Systems", "Career Coaching"]
  },
  {
    id: "9b5b8a43-64d9-481a-9331-9f90b33a1005",
    full_name: "Nisha Kulkarni",
    role: "alumni",
    verification_status: "pending",
    headline: "Product Manager at Razorpay",
    bio: "Awaiting alumni verification before becoming visible in the directory.",
    department: "Information Science and Engineering",
    graduation_year: 2019,
    current_company: "Razorpay",
    current_title: "Product Manager",
    industry: "Fintech",
    location_city: "Bengaluru",
    location_country: "India",
    profile_photo_url: null,
    linkedin_url: "https://linkedin.com",
    website_url: null,
    show_email: false,
    allow_messages: true,
    open_to_mentorship: true,
    open_to_referrals: true,
    skills: ["Product Management", "Fintech", "Growth"]
  }
];

export const mockMentorshipRequests: MentorshipRequest[] = [
  {
    id: "4e8ab728-63c0-4df5-8fd7-5df48d110001",
    student_name: "Priya S",
    mentor_name: "Ananya Rao",
    request_type: "mentorship",
    topic: "SDE interview preparation",
    goal: "Prepare for product company internships",
    message: "I am looking for structured interview preparation guidance.",
    status: "accepted",
    created_at: "2026-06-08T10:30:00.000Z"
  },
  {
    id: "4e8ab728-63c0-4df5-8fd7-5df48d110002",
    student_name: "Arjun K",
    mentor_name: "Rahul Menon",
    request_type: "career_guidance",
    topic: "Data science roadmap",
    goal: "Choose projects for MS applications",
    message: "I would like advice on choosing ML projects that show depth.",
    status: "pending",
    created_at: "2026-06-09T14:00:00.000Z"
  }
];

export const mockConversations: Conversation[] = [
  {
    id: "2d49648f-114e-430d-a9b7-31a4af210001",
    participant_name: "Ananya Rao",
    participant_headline: "Senior Product Engineer at Google",
    last_message: "Happy to review your resume before the internship drive.",
    last_message_at: "2026-06-10T15:45:00.000Z",
    unread_count: 2
  },
  {
    id: "2d49648f-114e-430d-a9b7-31a4af210002",
    participant_name: "Meera Iyer",
    participant_headline: "Founder at CircuitWorks",
    last_message: "Share your IoT prototype notes and I can suggest next steps.",
    last_message_at: "2026-06-09T09:15:00.000Z",
    unread_count: 0
  }
];

export const mockEvents: Event[] = [
  {
    id: "58a544c2-1b21-4c50-b65f-6fe314510001",
    title: "BMSCE Alumni Tech Mentorship Night",
    description: "A virtual mentorship evening with alumni across software, AI, core engineering, and startups.",
    starts_at: "2026-07-05T13:30:00.000Z",
    ends_at: "2026-07-05T15:30:00.000Z",
    location: null,
    virtual_url: "https://meet.google.com/demo",
    audience: ["student", "alumni"],
    status: "published",
    attendee_count: 128
  },
  {
    id: "58a544c2-1b21-4c50-b65f-6fe314510002",
    title: "Bengaluru Alumni Mixer",
    description: "In-person networking for Bengaluru-based alumni and final-year students.",
    starts_at: "2026-07-19T12:30:00.000Z",
    ends_at: "2026-07-19T15:30:00.000Z",
    location: "Bengaluru",
    virtual_url: null,
    audience: ["student", "alumni"],
    status: "published",
    attendee_count: 72
  }
];

export const mockAdminMetrics: AdminMetric[] = [
  { label: "Verified alumni", value: "1,248", helper: "+86 this month" },
  { label: "Students onboarded", value: "3,912", helper: "62% profile completion" },
  { label: "Mentorship requests", value: "436", helper: "58% accepted" },
  { label: "Open reports", value: "7", helper: "Median response under 1 day" }
];

export const mockReports = [
  {
    id: "70000000-0000-0000-0000-000000000001",
    reason: "Spam",
    target_type: "message",
    status: "open",
    created_at: "2026-06-10T12:00:00.000Z"
  }
];
