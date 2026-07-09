import { z } from "zod";

export const routineSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Routine name is required.")
    .max(
      100,
      "Routine name cannot exceed 100 characters."
    ),

  description: z
    .string()
    .trim()
    .max(
      500,
      "Description cannot exceed 500 characters."
    )
    .optional(),

  icon: z
    .string()
    .min(1, "Icon is required."),

  color: z
    .string()
    .min(1, "Color is required."),

  timeOfDay: z.enum([
    "morning",
    "afternoon",
    "evening",
    "night",
    "custom",
  ]),

  repeatDays: z
    .array(
      z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ])
    )
    .min(
      1,
      "Select at least one repeat day."
    ),

  isActive: z.boolean(),
});

export default routineSchema;