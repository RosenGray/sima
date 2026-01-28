import { z } from "zod";

export const PetForFreeFilterSchema = z.object({
  textSearch: z.string().optional(),
});

export type PetForFreeFilter = z.infer<typeof PetForFreeFilterSchema>;
