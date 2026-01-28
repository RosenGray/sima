import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const RealEstateForRentFilterSchema = z.object({
  ...PriceFromToSchema.shape,
  textSearch: z.string().optional(),
});

export type RealEstateForRentFilter = z.infer<
  typeof RealEstateForRentFilterSchema
>;
