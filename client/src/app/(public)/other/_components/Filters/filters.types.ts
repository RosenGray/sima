import { z } from "zod";

export const OthersFilterSchema = z.object({
  textSearch: z.string().optional(),
});

export type OthersFilter = z.infer<typeof OthersFilterSchema>;
