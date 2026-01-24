import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const PetAccessoryFilterSchema = z.object({
  ...PriceFromToSchema.shape,
  textSearch: z.string().optional(),
});

export type PetAccessoryFilter = z.infer<typeof PetAccessoryFilterSchema>;
