import { Option } from "@/components/filters/select/types";
import { accessoryCategoriesMap } from "./data";
import {
  AccessoryCategory,
  AccessoryCategoryId,
} from "./types/accessoryCategory.schema";

export { accessoryCategoriesMap };

const categoriesListCache: AccessoryCategory[] = Object.values(
  accessoryCategoriesMap,
);

const categoryOptionsCache: Option[] = categoriesListCache.map(
  ({ id, russianName }) => ({
    value: id,
    label: russianName,
    fieldKey: "category",
  }),
);

const categoryLookupCache = new Map<
  AccessoryCategoryId,
  AccessoryCategory
>(
  Object.entries(accessoryCategoriesMap) as Array<
    [AccessoryCategoryId, AccessoryCategory]
  >,
);

export const getAccessoryCategories = (): AccessoryCategory[] =>
  categoriesListCache;

export const getAccessoryCategoryById = (
  id: AccessoryCategoryId,
): AccessoryCategory | undefined => categoryLookupCache.get(id);

export const mapAccessoryCategoriesToSelectOptions = (): Option[] =>
  categoryOptionsCache;
