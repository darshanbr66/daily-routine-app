import { z } from "zod";

export const eventSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Event title is required.")
      .max(
        100,
        "Event title cannot exceed 100 characters."
      ),

    description: z
      .string()
      .max(
        500,
        "Description cannot exceed 500 characters."
      )
      .optional(),

    date: z
      .string()
      .min(1, "Event date is required."),

    startTime: z.string().optional(),

    endTime: z.string().optional(),

    type: z.enum([
      "personal",
      "work",
      "meeting",
      "reminder",
      "task",
      "habit",
      "goal",
    ]),

    priority: z.enum([
      "low",
      "medium",
      "high",
    ]),

    color: z.string(),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) {
        return true;
      }

      return data.startTime < data.endTime;
    },
    {
      path: ["endTime"],
      message:
        "End time must be after start time.",
    }
  );

export default eventSchema;