import { z } from "zod";

export const ScooterModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
});

export const ScooterManufacturerSchema = z.object({
  id: z.string(),
  name: z.string(),
  russianName: z.string(),
  models: z.array(ScooterModelSchema),
});

export type ScooterModel = z.infer<typeof ScooterModelSchema>;
export type ScooterManufacturer = z.infer<typeof ScooterManufacturerSchema>;
export type ScooterManufacturerId = ScooterManufacturer["id"];
export type ScooterModelId = ScooterModel["id"];
