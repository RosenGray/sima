import type { BannerSlideItem } from "@/components/BannerCarousel/BannerCarousel.types";
import { navItems } from "@/components/Header/Header/navItems";
import { generateBackblazeUrl } from "@/utils/common";

/** Image filenames used in each flow layout (public folder). Same as in app/(public)/.../layout.tsx */
const FLOW_BANNER_IMAGES: Record<string, string> = {
  "Транспорт": "vehicles.png",
  "Домашние животные": "pets.png",
  "Недвижимость": "real-estate.png",
  "Куплю-Продам": "yad2.png",
  "Работа": "jobs.png",
  "Другое": "others.png",
};

/** Russian CTA button label per nav section for the banner (e.g. "Все машины") */
const FLOW_BUTTON_LABELS: Record<string, string> = {
  "Транспорт": "Все машины",
  "Домашние животные": "Все домашние животные",
  "Недвижимость": "Вся недвижимость",
  "Куплю-Продам": "Всё куплю-продам",
  "Работа": "Вся работа",
  "Другое": "Всё остальное",
};

export function getHomeBannerItems(): BannerSlideItem[] {
  const stripe = (fileName: string) =>
    generateBackblazeUrl("public", fileName);

  const professionalService: BannerSlideItem = {
    href: "/professional-service",
    label: "Услуги специалистов",
    buttonLabel: "Все услуги специалистов",
    imageDesktop: stripe("professional-service.png"),
    imageMobile: stripe("professional-service.png"),
  };

  const fromNav: BannerSlideItem[] = navItems.map((item) => {
    const first = item.subItems[0];
    const fileName = FLOW_BANNER_IMAGES[item.label] ?? "others.png";
    const src = stripe(fileName);
    const buttonLabel = FLOW_BUTTON_LABELS[item.label];
    return {
      href: first!.href,
      label: first!.label,
      ...(buttonLabel && { buttonLabel }),
      imageDesktop: src,
      imageMobile: src,
    };
  });

  return [professionalService, ...fromNav];
}
