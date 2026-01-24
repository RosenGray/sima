import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const RealEstateForSaleFilterSchema = z.object({
  ...PriceFromToSchema.shape,
  textSearch: z.string().optional(),
});

export type RealEstateForSaleFilter = z.infer<
  typeof RealEstateForSaleFilterSchema
>;
