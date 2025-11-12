import { z } from "zod";

export const VehicleModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
});

export const VehicleManufacturerSchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
  models: z.array(VehicleModelSchema),
});

export type VehicleModel = z.infer<typeof VehicleModelSchema>;
export type VehicleManufacturer = z.infer<typeof VehicleManufacturerSchema>;
export type VehicleManufacturerId = VehicleManufacturer["id"];
export type VehicleModelId = VehicleModel["id"];
