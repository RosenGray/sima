import { navItems } from "@/components/Header/Header/navItems";
import type { CategoryLinkItem } from "@/components/CategoryLinks/CategoryLinks.types";

export function getCategoryImageLinkItems(): CategoryLinkItem[] {
  const professionalService: CategoryLinkItem = {
    label: "Услуги специалистов",
    href: "/professional-service",
    imageUrl: "https://picsum.photos/seed/category0/150/150",
  };

  const fromNav = navItems.map((item, index) => {
    const first = item.subItems[0];
    const seed = index + 1;
    return {
      href: first!.href,
      label: item.label,
      imageUrl: `https://picsum.photos/seed/category${seed}/150/150`,
    };
  });

  return [professionalService, ...fromNav];
}
