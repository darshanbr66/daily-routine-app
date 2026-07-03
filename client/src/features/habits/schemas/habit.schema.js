import { z } from "zod";

export const habitSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Habit title is required.")
    .max(200, "Habit title cannot exceed 200 characters."),

  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters.")
    .optional(),

  category: z.enum([
    "Health",
    "Fitness",
    "Learning",
    "Career",
    "Finance",
    "Personal",
    "Other",
  ]),

  reminderTime: z.string().optional(),

  color: z.string(),

  icon: z
    .string()
    .max(2, "Only one emoji/icon is allowed.")
    .optional(),
});

export default habitSchema;