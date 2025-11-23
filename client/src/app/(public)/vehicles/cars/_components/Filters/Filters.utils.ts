import { AllSelectedFilterOptionsMap } from "@/components/filters/select/types";

export const getYearDialogButtonTitle = (
    allSelectedFilterOptions: AllSelectedFilterOptionsMap
  ) => {
    const yearFrom = allSelectedFilterOptions.get("yearFrom")?.[0]?.label;
    const yearTo = allSelectedFilterOptions.get("yearTo")?.[0]?.label;

    if (yearFrom && yearTo) {
      return `${yearFrom}-${yearTo}`;
    } else if (yearFrom) {
      return `Год от ${yearFrom}`;
    } else if (yearTo) {
      return `Год до ${yearTo}`;
    }
    return "Год";
  };