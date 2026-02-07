import { createAnimalsApi } from "@/lib/pets/animals/createAnimalsApi";
import { animals } from "./animalsData";

const api = createAnimalsApi(animals);

export const mapAnimalsToSelectOptions = api.mapAnimalsToSelectOptions;
export const getKindsToSelectOptions = api.getKindsToSelectOptions;
export const getKindsToSelectOptionsByAnimalIds =
  api.getKindsToSelectOptionsByAnimalIds;
export const getAnimalKindById = api.getAnimalKindById;
export const getAnimalById = api.getAnimalById;
export { animals };
