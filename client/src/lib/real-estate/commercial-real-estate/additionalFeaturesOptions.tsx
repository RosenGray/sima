import type { ReactNode } from "react";
import { AdditionalFeatures } from "./types/commercialRealEstate.types";
import {
  HomeIcon,
  LockClosedIcon,
  AccessibilityIcon,
  BellIcon,
  PersonIcon,
  DesktopIcon,
  CubeIcon,
} from "@radix-ui/react-icons";

export interface AdditionalFeatureOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export const ADDITIONAL_FEATURES_OPTIONS: AdditionalFeatureOption[] = [
  {
    value: String(AdditionalFeatures.Shelter),
    label: "Убежище",
    icon: <HomeIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.Guard),
    label: "Охрана",
    icon: <LockClosedIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.Accessible),
    label: "Доступность",
    icon: <AccessibilityIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.Alarm),
    label: "Сигнализация",
    icon: <BellIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.Kitchen),
    label: "Кухня",
    icon: <CubeIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.MeetingRoom),
    label: "Переговорная",
    icon: <PersonIcon width={18} height={18} />,
  },
  {
    value: String(AdditionalFeatures.ReceptionDesk),
    label: "Ресепшн",
    icon: <DesktopIcon width={18} height={18} />,
  },
];
