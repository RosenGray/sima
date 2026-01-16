import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const CommercialVehicleFilterSchema = z.object({
  ...PriceFromToSchema.shape,
  color: z.string().optional(),
});

export type CommercialVehicleFilter = z.infer<typeof CommercialVehicleFilterSchema>;
