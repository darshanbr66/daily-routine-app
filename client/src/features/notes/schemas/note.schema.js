import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(150, "Title cannot exceed 150 characters."),

  content: z
    .string()
    .trim()
    .max(
      5000,
      "Content cannot exceed 5000 characters."
    )
    .optional(),

  category: z.enum([
    "personal",
    "work",
    "study",
    "ideas",
    "other",
  ]),

  color: z
    .string()
    .min(1, "Color is required."),

  isPinned: z.boolean(),
});

export default noteSchema;