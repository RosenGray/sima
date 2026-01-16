import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const SpecialVehicleFilterSchema = z.object({
  ...PriceFromToSchema.shape,
});

export type SpecialVehicleFilter = z.infer<typeof SpecialVehicleFilterSchema>;
