import {
  DealKind,
  CommercialPropertyKind,
} from "../types/commercialRealEstate.types";

const COMMERCIAL_PROPERTY_KIND_LABELS: Record<
  CommercialPropertyKind,
  string
> = {
  [CommercialPropertyKind.Offices]: "Офисы",
  [CommercialPropertyKind.Stores]: "Магазины",
  [CommercialPropertyKind.Clinics]: "Клиники",
  [CommercialPropertyKind.Studio]: "Студия",
  [CommercialPropertyKind.PrivateParking]: "Частная парковка",
  [CommercialPropertyKind.Warehouses]: "Склады",
  [CommercialPropertyKind.Basements]: "Подвалы",
  [CommercialPropertyKind.Plots]: "Участки",
  [CommercialPropertyKind.Buildings]: "Здания",
  [CommercialPropertyKind.IncomeGenerating]: "Доходные объекты",
  [CommercialPropertyKind.CafesAndRestaurants]: "Кафе и рестораны",
  [CommercialPropertyKind.IndustrialHalls]: "Промышленные залы",
  [CommercialPropertyKind.EventHalls]: "Банкетные залы",
  [CommercialPropertyKind.IndustrialBuildings]: "Промышленные здания",
  [CommercialPropertyKind.AgriculturalLand]: "Сельхозземля",
  [CommercialPropertyKind.Nahala]: "Нахала",
  [CommercialPropertyKind.VacationApartments]: "Апартаменты для отдыха",
  [CommercialPropertyKind.RealEstateAbroad]: "Недвижимость за рубежом",
  [CommercialPropertyKind.Businesses]: "Готовый бизнес",
  [CommercialPropertyKind.Other]: "Другое",
};

const DEAL_KIND_LABELS: Record<DealKind, string> = {
  [DealKind.Rent]: "Аренда",
  [DealKind.Sale]: "Продажа",
  [DealKind.Delivery]: "Передача",
  [DealKind.GroupPurchase]: "Групповые покупки",
  [DealKind.BusinessPartnership]: "Бизнес-партнёрство",
  [DealKind.AssetConsolidation]: "Активы из консолидации",
};

export function formatCommercialPropertyKind(
  kind: CommercialPropertyKind
): string {
  return COMMERCIAL_PROPERTY_KIND_LABELS[kind] ?? "";
}

export function formatDealKind(dealKind: DealKind): string {
  return DEAL_KIND_LABELS[dealKind] ?? "";
}

export const getPropertyKindOptions = () =>
  Object.values(CommercialPropertyKind)
    .filter(
      (value): value is CommercialPropertyKind => typeof value === "number"
    )
    .map((value) => ({
      value: value.toString(),
      label: COMMERCIAL_PROPERTY_KIND_LABELS[value],
    }));

export const getDealKindOptions = () =>
  Object.values(DealKind)
    .filter((value): value is DealKind => typeof value === "number")
    .map((value) => ({
      value: value.toString(),
      label: DEAL_KIND_LABELS[value],
    }));
