import { generateBackblazeUrl } from "@/utils/common";

export interface Slide {
    id: number;
    desktopImage: string;
    mobileImage: string;
    link: string;
    alt: string;
  }
  
export const bannerslides: Slide[] = [
    {
      id: 1,
      desktopImage: generateBackblazeUrl("sima", "banner_realestate.webp"),
      mobileImage: generateBackblazeUrl("sima", "banner_realestate.webp"),
      link: "",
      alt: "Недвижимость",
    },
    {
      id: 2,
      desktopImage: generateBackblazeUrl("sima", "banner_marketplace.webp"),
      mobileImage: generateBackblazeUrl("sima", "banner_marketplace.webp"),
      link: "",
      alt: "куплю и продам",
    },
    {
      id: 3,
      desktopImage: generateBackblazeUrl("sima", "banner_professionals.webp"),
      mobileImage: generateBackblazeUrl("sima", "banner_professionals.webp"),
      link: "",
      alt: "Campaign image 3",
    },
    {
      id: 4,
      desktopImage: generateBackblazeUrl("sima", "banner_vehicles.webp"),
      mobileImage: generateBackblazeUrl("sima", "banner_vehicles.webp"),
      link: "",
      alt: "Автомобили",
    },
  ];