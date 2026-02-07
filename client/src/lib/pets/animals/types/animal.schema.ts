import { z } from "zod";

export const AnimalKindSchema = z.object({
  id: z.string(),
  russianName: z.string(),
  name: z.string(),
});

export const AnimalSchema = z.object({
  id: z.string(),
  russianName: z.string(),
  kinds: z.array(AnimalKindSchema),
});

export type AnimalKind = z.infer<typeof AnimalKindSchema>;
export type Animal = z.infer<typeof AnimalSchema>;
export type AnimalId = Animal["id"];
export type AnimalKindId = AnimalKind["id"];
