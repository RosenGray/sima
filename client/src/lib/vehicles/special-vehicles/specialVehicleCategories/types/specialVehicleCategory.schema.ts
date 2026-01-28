import { z } from "zod";

export const SpecialVehicleKindSchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
});

export const SpecialVehicleCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
  models: z.array(SpecialVehicleKindSchema),
});

export type SpecialVehicleKind = z.infer<typeof SpecialVehicleKindSchema>;
export type SpecialVehicleCategory = z.infer<typeof SpecialVehicleCategorySchema>;
export type SpecialVehicleCategoryId = SpecialVehicleCategory["id"];
export type SpecialVehicleKindId = SpecialVehicleKind["id"];
