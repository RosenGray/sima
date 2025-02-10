import { config } from "@/utils/config";
import { ServiceCategoryMapping } from "./types";

const { API_URL } = config;

export const getServiceCategoriesMapping = async () => {
  const response = await fetch(
    `${API_URL}/api/professionals/service-categories/mapping`
  );

  return response.json() as Promise<ServiceCategoryMapping>;
};
