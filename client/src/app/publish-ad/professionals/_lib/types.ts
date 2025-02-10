export enum ServiceCategoryMetadataKeys {
  ConstructionRepair = "ConstructionRepair",
  ApplianceRepair = "ApplianceRepair",
  Legal = "Legal",
  Medical = "Medical",
  Transportation = "Transportation",
  SecurityInstallation = "SecurityInstallation",
  ItAdvertising = "ItAdvertising",
  Education = "Education",
  Business = "Business",
  Household = "Household",
  Other = "Other",
}

export interface ServiceCategory {
  id: string;
  key: ServiceCategoryMetadataKeys;
  displayName: string;
  description: string;
  russianDisplayName: string;
  russianDescription: string;
}

export interface ServiceSubCategory {
  id: string;
  key: string;
  displayName: string;
  description: string;
  russianDisplayName: string;
  russianDescription: string;
  serviceCategory: string;
  serviceCategoryKey: ServiceCategoryMetadataKeys;
}

export type ServiceCategoryMapping = Record<
  ServiceCategory["id"],
  {
    category: ServiceCategory;
    subCategories: ServiceSubCategory[];
  }
>;
