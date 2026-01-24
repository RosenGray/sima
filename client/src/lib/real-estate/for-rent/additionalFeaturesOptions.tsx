import type { ReactNode } from "react";
import { AdditionalFeatures } from "./types/realEstateForRent.types";
import {
  PersonIcon,
  ArchiveIcon,
  HomeIcon,
  HeartIcon,
  SunIcon,
  ComponentInstanceIcon,
  LockClosedIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";

export interface AdditionalFeatureOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export const ADDITIONAL_FEATURES_OPTIONS: AdditionalFeatureOption[] = [
  {
    value: String(AdditionalFeatures.Bars),
    label: "Решетки",
    icon: <LockClosedIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.Elevator),
    label: "Лифт",
    icon: <ArrowUpIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.ForRoommates),
    label: "Для соседей",
    icon: <PersonIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.Warehouse),
    label: "Склад",
    icon: <ArchiveIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.Shelter),
    label: "Убежище",
    icon: <HomeIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.PetsSuitable),
    label: "Подходит для животных",
    icon: <HeartIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.SolarHeater),
    label: "Солнечный нагреватель",
    icon: <SunIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.Renovated),
    label: "Отремонтировано",
    icon: <ComponentInstanceIcon width={18} height={18} />,
  },
];
