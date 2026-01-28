import {
  PropertyKind,
  AirConditioning,
  Parking,
  Furniture,
  EntryDate,
} from "../types/realEstateForRent.types";
import {
  NUMBER_OF_ROOMS_OPTIONS,
  getYearOptions,
  MONTH_OPTIONS,
  DAY_OPTIONS,
  FLOOR_OPTIONS,
  BALCONY_OPTIONS,
  ANNUAL_PAYMENTS_OPTIONS,
} from "../types/realEstateForRent.schema";

// Map PropertyKind enum to select options
const propertyKindOptions = Object.values(PropertyKind)
  .filter((value): value is PropertyKind => typeof value === "number")
  .map((value) => ({
    value: value.toString(),
    label: value === PropertyKind.Apartment ? "Квартира" : "Лофт",
  }));

// Map AirConditioning enum to select options
const airConditioningOptions = Object.values(AirConditioning)
  .filter((value): value is AirConditioning => typeof value === "number")
  .map((value) => ({
    value: value.toString(),
    label:
      value === AirConditioning.None
        ? "Нет"
        : value === AirConditioning.InRooms
          ? "В комнатах"
          : value === AirConditioning.InRoomsAndLivingRoom
            ? "В комнатах и гостиной"
            : value === AirConditioning.InLivingRoom
              ? "В гостиной"
              : value === AirConditioning.Central
                ? "Центральное"
                : value === AirConditioning.MiniCentral
                  ? "Мини-центральное"
                  : "Сплит",
  }));

// Map Parking enum to select options
const parkingOptions = Object.values(Parking)
  .filter((value): value is Parking => typeof value === "number")
  .map((value) => ({
    value: value.toString(),
    label:
      value === Parking.None
        ? "Нет"
        : value === Parking.InTheStreet
          ? "На улице"
          : value === Parking.Shared
            ? "Общая"
            : value === Parking.PayedParking
              ? "Платная парковка"
              : value === Parking.PrivateCovered
                ? "Частная крытая"
                : "Частная открытая",
  }));

// Map Furniture enum to select options
const furnitureOptions = Object.values(Furniture)
  .filter((value): value is Furniture => typeof value === "number")
  .map((value) => ({
    value: value.toString(),
    label:
      value === Furniture.None
        ? "Нет"
        : value === Furniture.Partial
          ? "Частично"
          : "Полностью",
  }));

// Map EntryDate enum to select options
const entryDateOptions = Object.values(EntryDate)
  .filter((value): value is EntryDate => typeof value === "number")
  .map((value) => ({
    value: value.toString(),
    label:
      value === EntryDate.Immediate ? "Немедленно" : "Гибкая",
  }));

// Convert number arrays to select options
export const getNumberOfRoomsOptions = () =>
  NUMBER_OF_ROOMS_OPTIONS.map((value) => ({
    value: value.toString(),
    label: value.toString(),
  }));

export const getYearOptionsForSelect = () =>
  getYearOptions().map((value) => ({
    value: value.toString(),
    label: value.toString(),
  }));

export const getMonthOptions = () =>
  MONTH_OPTIONS.map((value) => ({
    value: value.toString(),
    label: value.toString(),
  }));

export const getDayOptions = () =>
  DAY_OPTIONS.map((value) => ({
    value: value.toString(),
    label: value.toString(),
  }));

export const getFloorOptions = () =>
  FLOOR_OPTIONS.map((value) => ({
    value: value.toString(),
    label: value.toString(),
  }));

export const getBalconyOptions = () =>
  BALCONY_OPTIONS.map((value) => ({
    value: value.toString(),
    label: value.toString(),
  }));

export const getAnnualPaymentsOptions = () =>
  ANNUAL_PAYMENTS_OPTIONS.map((value) => ({
    value: value.toString(),
    label: value.toString(),
  }));

export const getPropertyKindOptions = () => propertyKindOptions;
export const getAirConditioningOptions = () => airConditioningOptions;
export const getParkingOptions = () => parkingOptions;
export const getFurnitureOptions = () => furnitureOptions;
export const getEntryDateOptions = () => entryDateOptions;
