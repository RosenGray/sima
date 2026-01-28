import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const PetForSaleFilterSchema = z.object({
  ...PriceFromToSchema.shape,
  textSearch: z.string().optional(),
});

export type PetForSaleFilter = z.infer<typeof PetForSaleFilterSchema>;
