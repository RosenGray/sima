import { ServiceCategoryMapping } from "../../professionals/professional-service/types/professional-service.scema";


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
    }));
};

export const mapServiceSubCategoriesToSelectOptions = (
  data: ServiceCategoryMapping,
  serviceCategoryId?: string | null
) => {
  if (!serviceCategoryId) {
    return [];
  }
  const subCategories = data[serviceCategoryId].subCategories;
  return subCategories.map((subCategory) => ({
    value: subCategory.id,
    label: subCategory.russianDisplayName,
  }));
};

