import { fetchClient } from "@/fetch/fetch.utils";
import { ServiceCategoryMapping } from "./types";

export const getServiceCategoriesMapping = async () => {
  const response = await fetchClient(
    `/api/professionals/service-categories/mapping`
  );

  return response.json() as Promise<ServiceCategoryMapping>;
};

export const getProfessionals = async () => {
  const response = await fetchClient(`/api/professionals/`);
  return response.json() as Promise<any>;
};
