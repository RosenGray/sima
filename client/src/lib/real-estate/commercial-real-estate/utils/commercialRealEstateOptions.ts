import {
  DealKind,
  PropertyKind,
} from "../types/commercialRealEstate.types";
import { formatPropertyKind } from "../../for-rent/utils/realEstateOptions";

// Map DealKind enum to select options
export const getDealKindOptions = () => {
  return Object.values(DealKind)
    .filter((value): value is DealKind => typeof value === "number")
    .map((value) => ({
      value: value.toString(),
      label: value === DealKind.Rent ? "Аренда" : "Продажа",
    }));
};

// Commercial only allows Apartment and Loft; use shared labels from for-rent
const COMMERCIAL_PROPERTY_KINDS = [PropertyKind.Apartment, PropertyKind.Loft];

export const getPropertyKindOptions = () => {
  return COMMERCIAL_PROPERTY_KINDS.map((value) => ({
    value: value.toString(),
    label: formatPropertyKind(value),
  }));
};
