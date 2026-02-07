import type { ReactNode } from "react";
import { PetAdjustments } from "./types/petForSale.types";
import AdultSuitableIcon from "@/components/svg/pets/AdultSuitable/AdultSuitable";
import ApartmentSuitableIcon from "@/components/svg/pets/ApartmentSuitable/ApartmentSuitable";
import CastratedMaleIcon from "@/components/svg/pets/CastratedMale/CastratedMale";
import ChildFriendlyIcon from "@/components/svg/pets/ChildFriendly/ChildFriendly";
import DogFriendlyIcon from "@/components/svg/pets/DogFriendly/DogFriendly";
import SterilizedFemaleIcon from "@/components/svg/pets/SterilizedFemale/SterilizedFemale";
import TrainedIcon from "@/components/svg/pets/Trained/Trained";
import VaccinatedIcon from "@/components/svg/pets/Vaccinated/Vaccinated";
import YardSuitableIcon from "@/components/svg/pets/YardSuitable/YardSuitable";

const iconProps = { width: 24, height: 24, viewBox: { width: 120, height: 120 } };

export interface AdjustmentOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export const ADJUSTMENT_OPTIONS: AdjustmentOption[] = [
  {
    value: String(PetAdjustments.Spayed),
    label: "Стерилизована",
    icon: <SterilizedFemaleIcon {...iconProps} />,
  },
  {
    value: String(PetAdjustments.Neutered),
    label: "Кастрирован",
    icon: <CastratedMaleIcon {...iconProps} />,
  },
  {
    value: String(PetAdjustments.Vaccinated),
    label: "Привит(а)",
    icon: <VaccinatedIcon {...iconProps} />,
  },
  {
    value: String(PetAdjustments.Trained),
    label: "Дрессирован(а)",
    icon: <TrainedIcon {...iconProps} />,
  },
  {
    value: String(PetAdjustments.KidsFriendly),
    label: "Дружелюбен к детям",
    icon: <ChildFriendlyIcon {...iconProps} />,
  },
  {
    value: String(PetAdjustments.YardSuitable),
    label: "Подходит для двора",
    icon: <YardSuitableIcon {...iconProps} />,
  },
  {
    value: String(PetAdjustments.DogsFriendly),
    label: "Дружелюбен к собакам",
    icon: <DogFriendlyIcon {...iconProps} />,
  },
  {
    value: String(PetAdjustments.ApartmentSuitable),
    label: "Подходит для квартиры",
    icon: <ApartmentSuitableIcon {...iconProps} />,
  },
  {
    value: String(PetAdjustments.AdultsFriendly),
    label: "Подходит для взрослых",
    icon: <AdultSuitableIcon {...iconProps} />,
  },
];
