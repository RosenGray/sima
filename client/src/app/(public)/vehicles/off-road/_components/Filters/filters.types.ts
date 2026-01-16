import { PriceFromToSchema } from "@/lib/common/types/common.types";
import { z } from "zod";

export const OffRoadVehicleFilterSchema = z.object({
  ...PriceFromToSchema.shape,
  color: z.string().optional(),
});

export type OffRoadVehicleFilter = z.infer<typeof OffRoadVehicleFilterSchema>;
