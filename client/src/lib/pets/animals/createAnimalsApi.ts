import { Option } from "@/components/filters/select/types";
import {
  Animal,
  AnimalId,
  AnimalKind,
} from "./types/animal.schema";

const emptyOptions: Option[] = [];

export function createAnimalsApi(animals: Record<AnimalId, Animal>) {
  const animalEntries = Object.entries(animals) as Array<[AnimalId, Animal]>;

  const animalOptionsCache: Option[] = animalEntries.map(
    ([id, animal]) => ({
      value: id,
      label: animal.russianName,
      fieldKey: "animal",
    }),
  );

  const animalLookupCache = new Map<AnimalId, Animal>(animalEntries);

  const kindOptionsCache = new Map<AnimalId, Option[]>();
  const kindLookupCache = new Map<
    AnimalId,
    Map<AnimalKind["id"], AnimalKind>
  >();

  animalEntries.forEach(([animalId, animal]) => {
    const kindOptions = animal.kinds.map(({ id, russianName }) => ({
      value: id,
      label: russianName,
      fieldKey: "kind",
    }));

    kindOptionsCache.set(animalId, kindOptions);
    kindLookupCache.set(
      animalId,
      new Map(animal.kinds.map((kind) => [kind.id, kind] as const)),
    );
  });

  const multiAnimalKindOptionsCache = new Map<string, Option[]>();

  const mapAnimalsToSelectOptions = (): Option[] => animalOptionsCache;

  const getKindsToSelectOptions = (animalId: AnimalId): Option[] =>
    kindOptionsCache.get(animalId) ?? emptyOptions;

  const getKindsToSelectOptionsByAnimalIds = (animalIds: AnimalId[]): Option[] => {
    const cacheKey = [...animalIds].sort().join(",");
    const cached = multiAnimalKindOptionsCache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const result = animalIds.flatMap((animalId) =>
      getKindsToSelectOptions(animalId),
    );

    multiAnimalKindOptionsCache.set(cacheKey, result);

    return result;
  };

  const getAnimalKindById = (
    id: AnimalKind["id"],
    animalId: AnimalId,
  ): AnimalKind | undefined => {
    return kindLookupCache.get(animalId)?.get(id);
  };

  const getAnimalById = (id: AnimalId): Animal | undefined =>
    animalLookupCache.get(id);

  return {
    animals,
    mapAnimalsToSelectOptions,
    getKindsToSelectOptions,
    getKindsToSelectOptionsByAnimalIds,
    getAnimalKindById,
    getAnimalById,
  };
}
