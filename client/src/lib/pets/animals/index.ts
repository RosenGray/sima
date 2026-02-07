import { animals } from "./data";
import { createAnimalsApi } from "./createAnimalsApi";

const defaultApi = createAnimalsApi(animals);

export const mapAnimalsToSelectOptions = defaultApi.mapAnimalsToSelectOptions;
export const getKindsToSelectOptions = defaultApi.getKindsToSelectOptions;
export const getKindsToSelectOptionsByAnimalIds =
  defaultApi.getKindsToSelectOptionsByAnimalIds;
export const getAnimalKindById = defaultApi.getAnimalKindById;
export const getAnimalById = defaultApi.getAnimalById;
export { animals };
