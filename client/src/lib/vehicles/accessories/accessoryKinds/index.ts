import { Option } from "@/components/filters/select/types";
import { accessoryCategoriesMap } from "../accessoryCategories/data";
import {
  AccessoryCategory,
  AccessoryCategoryId,
  AccessoryKind,
} from "../accessoryCategories/types/accessoryCategory.schema";

const emptyOptions: Option[] = [];

const categoryEntries = Object.entries(
  accessoryCategoriesMap,
) as Array<[AccessoryCategoryId, AccessoryCategory]>;

const kindOptionsCache = new Map<AccessoryCategoryId, Option[]>();
const kindLookupCache = new Map<
  AccessoryCategoryId,
  Map<AccessoryKind["id"], AccessoryKind>
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

export const getAccessoryKindsToSelectOptions = (
  categoryId: AccessoryCategoryId,
): Option[] => kindOptionsCache.get(categoryId) ?? emptyOptions;

export const getAccessoryKindsToSelectOptionsByCategoryIds = (
  categoryIds: AccessoryCategoryId[],
): Option[] => {
  const cacheKey = [...categoryIds].sort().join(",");
  const cached = multiCategoryKindOptionsCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const result = categoryIds.flatMap((categoryId) =>
    getAccessoryKindsToSelectOptions(categoryId),
  );

  multiCategoryKindOptionsCache.set(cacheKey, result);

  return result;
};

export const getAccessoryKindById = (
  id: AccessoryKind["id"],
  categoryId: AccessoryCategoryId,
): AccessoryKind | undefined => kindLookupCache.get(categoryId)?.get(id);

export const getAccessoryCategoryById = (
  id: AccessoryCategoryId,
): AccessoryCategory | undefined => {
  return accessoryCategoriesMap[id];
};
