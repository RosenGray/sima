import { z } from "zod";

export const CitySchema = z.object({
  id: z.string(),
  name: z.string(),
  nameRussian: z.string(),
});

export const DistrictSchema = z.object({
  id: z.string(),
  name: z.string(),
  cities: z.array(CitySchema),
  description: z.string().optional(),
});

export type District = z.infer<typeof DistrictSchema>;

export type City = z.infer<typeof CitySchema>;

export enum Districts {
  North = "d1",
  South = "d2",
  Center = "d3",
  Heifa = "d4",
  Jerusalem = "d5",
  TelAviv = "d6",
}
