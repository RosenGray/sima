import {
  PropertyKind,
  AirConditioning,
  Parking,
  Furniture,
  EntryDate,
} from "../types/realEstateForSale.types";
import {
  NUMBER_OF_ROOMS_OPTIONS,
  getYearOptions,
  MONTH_OPTIONS,
  DAY_OPTIONS,
  FLOOR_OPTIONS,
  BALCONY_OPTIONS,
} from "../types/realEstateForSale.schema";

const PROPERTY_KIND_LABELS: Record<PropertyKind, string> = {
  [PropertyKind.Apartment]: "Квартира",
  [PropertyKind.Loft]: "Лофт",
  [PropertyKind.GardenApartment]: "Квартира с садом",
  [PropertyKind.Penthouse]: "Пентхаус",
  [PropertyKind.Duplex]: "Дуплекс",
  [PropertyKind.TourismAndVacation]: "Туризм и отдых",
  [PropertyKind.Basement]: "Подвал/партер",
  [PropertyKind.Triplex]: "Триплекс",
  [PropertyKind.HousingUnit]: "Жилая единица",
  [PropertyKind.StudioLoft]: "Студия/лофт",
  [PropertyKind.PrivateHouseCottage]: "Частный дом/коттедж",
  [PropertyKind.TwoFamily]: "Двухквартирный дом",
  [PropertyKind.FarmAgricultural]: "Ферма/участок (нахала)",
  [PropertyKind.AuxiliaryFarm]: "Вспомогательное хозяйство",
  [PropertyKind.Other]: "Другое",
  [PropertyKind.Plots]: "Участки",
  [PropertyKind.ProtectedHousing]: "Дом престарелых",
  [PropertyKind.ResidentialBuilding]: "Жилой дом",
  [PropertyKind.Storage]: "Складское помещение",
  [PropertyKind.Parking]: "Парковка",
  [PropertyKind.PurchaseGroupRight]: "Группа покупки/право на объект",
};

export function formatPropertyKind(kind: PropertyKind): string {
  return PROPERTY_KIND_LABELS[kind] ?? "";
}

export const getPropertyKindOptions = () =>
  Object.values(PropertyKind)
    .filter((value): value is PropertyKind => typeof value === "number")
    .map((value) => ({
      value: value.toString(),
      label: PROPERTY_KIND_LABELS[value],
    }));

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

const entryDateOptions = Object.values(EntryDate)
  .filter((value): value is EntryDate => typeof value === "number")
  .map((value) => ({
    value: value.toString(),
    label:
      value === EntryDate.Immediate ? "Немедленно" : "Гибкая",
  }));

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

export const getAirConditioningOptions = () => airConditioningOptions;
export const getParkingOptions = () => parkingOptions;
export const getFurnitureOptions = () => furnitureOptions;
export const getEntryDateOptions = () => entryDateOptions;
