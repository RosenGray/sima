import HandymanIcon from "@/components/svg/Handyman/Handyman";
import DogIcon from "@/components/svg/pets/Dog/Dog";
import TransportIcon from "@/components/svg/Transport/Transport";
import HouseIcon from "@/components/svg/House/House";
import MarketPlaceIcon from "@/components/svg/MarketPlace/MarketPlaceIcon";
import JobOfferIcon from "@/components/svg/JobOffer/JobOffer";
import WorkIcon from "@/components/svg/Word/Work";
import type { CategorySvgLinkItem } from "@/components/CategoryLinks/CategoryLinks.types";

export interface CategorySvgLinkOptions {
  width?: number;
  height?: number;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

export function getCategorySvgLinkItems(
  options?: CategorySvgLinkOptions
): CategorySvgLinkItem[] {
  const viewBoxWidth = options?.viewBoxWidth;
  const viewBoxHeight = options?.viewBoxHeight;
  const width = options?.width;
  const height = options?.height;
  const viewBox =
    viewBoxWidth && viewBoxHeight
      ? { width: viewBoxWidth, height: viewBoxHeight }
      : undefined;

  return [
    {
      label: "Услуги специалистов",
      href: "/professional-service",
      icon: <HandymanIcon viewBox={viewBox} width={width} height={height} />,
    },
    {
      label: "Транспорт",
      href: "/vehicles/cars",
      icon: <TransportIcon viewBox={viewBox} width={width} height={height} />,
    },
    {
      label: "Домашние животные",
      href: "/pets/for-sale",
      icon: <DogIcon viewBox={viewBox} width={width} height={height} />,
    },
    {
      label: "Недвижимость",
      href: "/real-estate/for-sale",
      icon: <HouseIcon viewBox={viewBox} width={width} height={height} />,
    },
    {
      label: "Куплю-Продам",
      href: "/yad2",
      icon: <MarketPlaceIcon viewBox={viewBox} width={width} height={height} />,
    },
    {
      label: "Работа",
      href: "/jobs",
      icon: <JobOfferIcon viewBox={viewBox} width={width} height={height} />,
    },
    {
      label: "Другое",
      href: "/other",
      icon: <WorkIcon viewBox={viewBox} width={width} height={height} />,
    },
  ];
}
