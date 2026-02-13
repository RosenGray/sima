/**
 * Shared animal IDs and labels for pets flows (for-sale, for-free, accessories).
 * Used by nav and any code that needs a stable list of animal IDs.
 */
export const PETS_NAV_ANIMAL_ITEMS = [
  { animalId: "anim_dogs", label: "Собаки" },
  { animalId: "anim_cats", label: "Кошки" },
  { animalId: "anim_fish", label: "Рыбы" },
  { animalId: "anim_birds", label: "Птицы" },
  { animalId: "anim_ferrets", label: "Хорьки" },
  { animalId: "anim_rodents", label: "Грызуны" },
  { animalId: "anim_farm_animals", label: "Сельскохозяйственные животные" },
  { animalId: "anim_horses", label: "Лошади" },
  { animalId: "anim_reptiles", label: "Ящерицы и змеи" },
] as const;

export const PET_ANIMAL_IDS = PETS_NAV_ANIMAL_ITEMS.map((item) => item.animalId);

/** Legacy animal IDs (pre-unique-ID) mapped to current IDs. Used for DB backward compatibility. */
export const LEGACY_ANIMAL_ID_TO_NEW: Record<string, string> = {
  dog: "anim_dogs",
  cat: "anim_cats",
  fish: "anim_fish",
  bird: "anim_birds",
  ferrets: "anim_ferrets",
  rodents: "anim_rodents",
  farm_animals: "anim_farm_animals",
  horses: "anim_horses",
  reptiles: "anim_reptiles",
};

/**
 * Normalize animal ID from DB to current format (legacy -> new).
 * Use when reading from DB so UI always receives new IDs.
 */
export function normalizeAnimalId(animalId: string): string {
  return LEGACY_ANIMAL_ID_TO_NEW[animalId] ?? animalId;
}

/**
 * Expand animal filter to include legacy IDs so queries match both old and new documents.
 * Use when building repository search filters.
 */
export function expandAnimalIdsForFilter(animalIds: string[]): string[] {
  const legacyToNew = LEGACY_ANIMAL_ID_TO_NEW;
  const expanded = new Set<string>(animalIds);
  for (const legacyId of Object.keys(legacyToNew)) {
    if (animalIds.includes(legacyToNew[legacyId])) {
      expanded.add(legacyId);
    }
  }
  return Array.from(expanded);
}
