import { z } from "zod";

export const goalSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Goal title is required.")
    .max(
      200,
      "Goal title cannot exceed 200 characters."
    ),

  description: z
    .string()
    .max(
      1000,
      "Description cannot exceed 1000 characters."
    )
    .optional(),

  category: z.enum([
    "Career",
    "Health",
    "Fitness",
    "Learning",
    "Finance",
    "Personal",
    "Business",
    "Travel",
    "Other",
  ]),

  priority: z.enum([
    "low",
    "medium",
    "high",
  ]),

  status: z.enum([
    "not-started",
    "in-progress",
    "completed",
    "on-hold",
  ]),

  progress: z
    .number()
    .min(0, "Progress cannot be less than 0.")
    .max(100, "Progress cannot exceed 100."),

  targetDate: z
    .string()
    .optional(),

  color: z.string(),

  icon: z
    .string()
    .max(
      2,
      "Only one emoji/icon is allowed."
    )
    .optional(),
});

export default goalSchema;