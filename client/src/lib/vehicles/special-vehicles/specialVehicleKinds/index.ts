import { Option } from "@/components/filters/select/types";
import { specialVehicleCategoriesMap } from "../specialVehicleCategories/data";
import {
  SpecialVehicleCategory,
  SpecialVehicleCategoryId,
  SpecialVehicleKind,
} from "../specialVehicleCategories/types/specialVehicleCategory.schema";

const emptyOptions: Option[] = [];

const categoryEntries = Object.entries(
  specialVehicleCategoriesMap,
) as Array<[SpecialVehicleCategoryId, SpecialVehicleCategory]>;

const categoryLookupCache = new Map<
  SpecialVehicleCategoryId,
  SpecialVehicleCategory
>(categoryEntries);

const kindOptionsCache = new Map<SpecialVehicleCategoryId, Option[]>();
const kindLookupCache = new Map<
  SpecialVehicleCategoryId,
  Map<SpecialVehicleKind["id"], SpecialVehicleKind>
>();

categoryEntries.forEach(([categoryId, category]) => {
  const kindOptions = category.models.map(({ id, russianName }) => ({
    value: id,
    label: russianName,
    fieldKey: "kind",
  }));

  kindOptionsCache.set(categoryId, kindOptions);
  kindLookupCache.set(
    categoryId,
    new Map(category.models.map((kind) => [kind.id, kind] as const)),
  );
});

const multiCategoryKindOptionsCache = new Map<string, Option[]>();

export const getSpecialVehicleKindsToSelectOptions = (
  categoryId: SpecialVehicleCategoryId,
): Option[] => kindOptionsCache.get(categoryId) ?? emptyOptions;

export const getSpecialVehicleKindsToSelectOptionsByCategoryIds = (
  categoryIds: SpecialVehicleCategoryId[],
): Option[] => {
  const cacheKey = [...categoryIds].sort().join(",");
  const cached = multiCategoryKindOptionsCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const result = categoryIds.flatMap((categoryId) =>
    getSpecialVehicleKindsToSelectOptions(categoryId),
  );

  multiCategoryKindOptionsCache.set(cacheKey, result);

  return result;
};

export const getSpecialVehicleKindById = (
  id: SpecialVehicleKind["id"],
  categoryId: SpecialVehicleCategoryId,
): SpecialVehicleKind | undefined => kindLookupCache.get(categoryId)?.get(id);

export const getSpecialVehicleCategoryById = (
  id: SpecialVehicleCategoryId,
): SpecialVehicleCategory | undefined => categoryLookupCache.get(id);
