import type { ReactNode } from "react";
import { PetAdjustments } from "./types/petForSale.types";
import TruckIcon from "@/components/svg/vehicles/Truck/Truck";

export interface AdjustmentOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export const ADJUSTMENT_OPTIONS: AdjustmentOption[] = [
  {
    value: String(PetAdjustments.Spayed),
    label: "Стерилизована",
    icon: <TruckIcon width={24} height={24} viewBox={{ width: 100, height: 100 }} />,
  },
  {
    value: String(PetAdjustments.Neutered),
    label: "Кастрирован",
    icon: <TruckIcon width={24} height={24} viewBox={{ width: 100, height: 100 }} />,
  },
  {
    value: String(PetAdjustments.Vaccinated),
    label: "Привит(а)",
    icon: <TruckIcon width={24} height={24} viewBox={{ width: 100, height: 100 }} />,
  },
  {
    value: String(PetAdjustments.Trained),
    label: "Дрессирован(а)",
    icon: <TruckIcon width={24} height={24} viewBox={{ width: 100, height: 100 }} />,
  },
  {
    value: String(PetAdjustments.KidsFriendly),
    label: "Дружелюбен к детям",
    icon: <TruckIcon width={24} height={24} viewBox={{ width: 100, height: 100 }} />,
  },
  {
    value: String(PetAdjustments.YardSuitable),
    label: "Подходит для двора",
    icon: <TruckIcon width={24} height={24} viewBox={{ width: 100, height: 100 }} />,
  },
  {
    value: String(PetAdjustments.DogsFriendly),
    label: "Дружелюбен к собакам",
    icon: <TruckIcon width={24} height={24} viewBox={{ width: 100, height: 100 }} />,
  },
  {
    value: String(PetAdjustments.ApartmentSuitable),
    label: "Подходит для квартиры",
    icon: <TruckIcon width={24} height={24} viewBox={{ width: 100, height: 100 }} />,
  },
  {
    value: String(PetAdjustments.AdultsFriendly),
    label: "Подходит для взрослых",
    icon: <TruckIcon width={24} height={24} viewBox={{ width: 100, height: 100 }} />,
  },
];
