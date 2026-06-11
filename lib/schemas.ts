import { z } from "zod";

export const mentorshipRequestSchema = z.object({
  mentorId: z.string().uuid(),
  topic: z.string().min(3).max(120),
  goal: z.string().min(10).max(500),
  message: z.string().min(10).max(1000),
  preferredMode: z.string().max(80).optional()
});

export const messageSchema = z.object({
  recipientId: z.string().uuid(),
  body: z.string().min(1).max(2000)
});

export const eventSchema = z.object({
  title: z.string().min(3).max(160),
  description: z.string().min(10).max(2000),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  location: z.string().max(200).optional(),
  virtualUrl: z.string().url().optional(),
  capacity: z.number().int().positive().optional()
});

export const profileUpdateSchema = z.object({
  fullName: z.string().min(2).max(120),
  headline: z.string().min(3).max(160),
  bio: z.string().max(2000).optional(),
  department: z.string().min(2).max(120),
  graduationYear: z.number().int().min(1946).max(2100),
  currentCompany: z.string().max(120).optional(),
  currentTitle: z.string().max(120).optional(),
  industry: z.string().max(120).optional(),
  locationCity: z.string().min(2).max(120),
  locationCountry: z.string().min(2).max(120),
  openToMentorship: z.boolean(),
  openToReferrals: z.boolean(),
  allowMessages: z.boolean(),
  skills: z.array(z.string().min(1).max(60)).max(20)
});
