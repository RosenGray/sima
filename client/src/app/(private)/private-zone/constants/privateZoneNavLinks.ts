import {
  IdCardIcon,
  Pencil1Icon,
  BarChartIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  InfoCircledIcon,
  GearIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import type { UserNavLinkItem } from "@/components/Header/MobileMenu";

/** Private zone sidebar and mobile menu nav links (dummy hrefs until pages exist) */
//add my chats link
export const PRIVATE_ZONE_NAV_LINKS: UserNavLinkItem[] = [
  { label: "Мои объявления", href: "/private-zone/my-ads", icon: IdCardIcon },
  {
    label: "Мои последние поиски",
    href: "/private-zone/last-searches",
    icon: MagnifyingGlassIcon,
  },
  { label: "Мои сообщения", href: "/private-zone/chat", icon: ChatBubbleIcon },
  {
    label: "Обновить данные",
    href: "/private-zone/update-details",
    icon: Pencil1Icon,
  },
  { label: "Статистика", href: "/private-zone/statistics", icon: BarChartIcon },
  {
    label: "Избранные объявления",
    href: "/private-zone/liked-ads",
    icon: HeartIcon,
  },
  {
    label: "Советы и информация",
    href: "/private-zone/tips-info",
    icon: InfoCircledIcon,
  },
  { label: "Настройки", href: "/private-zone/settings", icon: GearIcon },
];
