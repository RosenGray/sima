import {
  DealKind,
  PropertyKind,
} from "../types/commercialRealEstate.types";

// Map DealKind enum to select options
export const getDealKindOptions = () => {
  return Object.values(DealKind)
    .filter((value): value is DealKind => typeof value === "number")
    .map((value) => ({
      value: value.toString(),
      label: value === DealKind.Rent ? "Аренда" : "Продажа",
    }));
};

// Map PropertyKind enum to select options
export const getPropertyKindOptions = () => {
  return Object.values(PropertyKind)
    .filter((value): value is PropertyKind => typeof value === "number")
    .map((value) => ({
      value: value.toString(),
      label: value === PropertyKind.Apartment ? "Квартира" : "Лофт",
    }));
};
