import { ServiceCategoryMapping } from "../../professionals/professional-service/types/professional-service.scema";
import { Option } from "@/components/filters/select/types";
export const mapServiceCategoriesToSelectOptions = (
  data: ServiceCategoryMapping
) => {
  return Object.entries(data)
    .sort(([, a], [, b]) => {
      if (a.category.key === "Other") return 1;
      if (b.category.key === "Other") return -1;
      return 0;
    })
    .map(([id, value]) => ({
      value: id,
      label: value.category.russianDisplayName,
      fieldKey: 'categoryId'
    }));
};

export const mapServiceSubCategoriesToSelectOptions = (
  data: ServiceCategoryMapping,
  serviceCategoryId?: string | null
): Option[] => {
  if (!serviceCategoryId) {
    return [];
  }
  const subCategories = data[serviceCategoryId].subCategories;
  return subCategories.map((subCategory) => ({
    value: subCategory.id,
    label: subCategory.russianDisplayName,
  }));
};

export const mapServiceSubCategoriesToSelectOptionsByCategoryIds = (
  data: ServiceCategoryMapping,
  serviceCategoryIds?: string[] | null
): Option[] => {
  if (!serviceCategoryIds) {
    return [];
  }
  const subCategories = serviceCategoryIds.flatMap((categoryId) => {
    return data[categoryId].subCategories;
  });
  return subCategories
    .sort((a, b) => {
      if (a.key === "Other") return 1;
      if (b.key === "Other") return -1;
      return 0;
    })
    .map((subCategory) => ({
      value: subCategory.id,
      label: subCategory.russianDisplayName,
      fieldKey: 'subCategoryId'
    }));
};
