import { Option } from "@/components/filters/select/types";
import { yad2Categories } from "../yad2Categories/data";
import {
  Yad2CategoryId,
  Yad2SubCategory,
  Yad2SubCategoryId,
} from "../yad2Categories/types/yad2Category.schema";

const emptyOptions: Option[] = [];

const categoryEntries = Object.entries(yad2Categories) as Array<
  [Yad2CategoryId, typeof yad2Categories[Yad2CategoryId]]
>;

const subCategoryOptionsCache = new Map<Yad2CategoryId, Option[]>();
const subCategoryLookupCache = new Map<
  Yad2CategoryId,
  Map<Yad2SubCategoryId, Yad2SubCategory>
>();

categoryEntries.forEach(([categoryId, category]) => {
  const subCategoryOptions = category.subCategories.map(
    ({ id, russianName }) => ({
      value: id,
      label: russianName,
      fieldKey: "subCategory",
    }),
  );

  subCategoryOptionsCache.set(categoryId, subCategoryOptions);
  subCategoryLookupCache.set(
    categoryId,
    new Map(
      category.subCategories.map((subCategory) => [
        subCategory.id,
        subCategory,
      ] as const),
    ),
  );
});

const multiCategorySubCategoryOptionsCache = new Map<string, Option[]>();

export const getYad2SubCategoriesToSelectOptions = (
  categoryId: Yad2CategoryId,
): Option[] => subCategoryOptionsCache.get(categoryId) ?? emptyOptions;

export const getYad2SubCategoriesToSelectOptionsByCategoryIds = (
  categoryIds: Yad2CategoryId[],
): Option[] => {
  const cacheKey = [...categoryIds].sort().join(",");
  const cached = multiCategorySubCategoryOptionsCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const result = categoryIds.flatMap((categoryId) =>
    getYad2SubCategoriesToSelectOptions(categoryId),
  );

  multiCategorySubCategoryOptionsCache.set(cacheKey, result);

  return result;
};

export const getYad2SubCategoryById = (
  id: Yad2SubCategoryId,
  categoryId: Yad2CategoryId,
): Yad2SubCategory | undefined =>
  subCategoryLookupCache.get(categoryId)?.get(id);
