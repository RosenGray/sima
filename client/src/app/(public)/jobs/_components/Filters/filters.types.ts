import { z } from "zod";

export const JobFilterSchema = z.object({
  textSearch: z.string().optional(),
});

export type JobFilter = z.infer<typeof JobFilterSchema>;
