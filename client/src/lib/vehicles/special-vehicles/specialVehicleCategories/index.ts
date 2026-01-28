import { Option } from "@/components/filters/select/types";
import { specialVehicleCategoriesMap } from "./data";
import {
  SpecialVehicleCategory,
  SpecialVehicleCategoryId,
} from "./types/specialVehicleCategory.schema";

export { specialVehicleCategoriesMap };

const categoriesListCache: SpecialVehicleCategory[] = Object.values(
  specialVehicleCategoriesMap,
);

const categoryOptionsCache: Option[] = categoriesListCache.map(
  ({ id, russianName }) => ({
    value: id,
    label: russianName,
    fieldKey: "category",
  }),
);

const categoryLookupCache = new Map<
  SpecialVehicleCategoryId,
  SpecialVehicleCategory
>(
  Object.entries(specialVehicleCategoriesMap) as Array<
    [SpecialVehicleCategoryId, SpecialVehicleCategory]
  >,
);

export const getSpecialVehicleCategories = (): SpecialVehicleCategory[] =>
  categoriesListCache;

export const getSpecialVehicleCategoryById = (
  id: SpecialVehicleCategoryId,
): SpecialVehicleCategory | undefined => categoryLookupCache.get(id);

export const mapSpecialVehicleCategoriesToSelectOptions = (): Option[] =>
  categoryOptionsCache;
