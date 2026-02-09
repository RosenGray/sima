import { Box } from "@radix-ui/themes";
import Header from "../components/Header/Header/Header";
import { BannerCarousel } from "@/components/BannerCarousel/BannerCarousel";
import { CategorySvgLinks } from "@/components/CategoryLinks";
import type { ListingCardCarouselItem } from "@/components/ListingCardCarousel/ListingCardCarousel.types";
import { getCategorySvgLinkItems } from "@/lib/home/categorySvgLinksConfig";
import { getHomeBannerItems } from "@/lib/home/bannerItems";
import { HomeLobby } from "./page.styles";

const LISTING_CARD_CAROUSEL_ITEMS: ListingCardCarouselItem[] = [
  {
    imageUrl: "https://picsum.photos/seed/listing1/400/200",
    title: 'נכס מדהים פינתי 145 מ"ר למאפיה, קונדטוריה...',
    subtitle: "מקום מושלם לעסק. גישה נוחה, חניה.",
    city: "רמת גן",
    price: "₪ 30,000",
    href: "/professional-service",
  },
  {
    imageUrl: "https://picsum.photos/seed/listing2/400/200",
    title: "דירת גן מרווחת עם גינה פרטית",
    subtitle: '3 חדרים, 85 מ"ר. שקט וירוק.',
    city: "תל אביב",
    price: "₪ 12,500",
    href: "/vehicles/cars",
  },
  {
    imageUrl: "https://picsum.photos/seed/listing3/400/200",
    title: "משרדים במרכז העסקים",
    subtitle: "קומה 12, נוף פנורמי. מיזוג מלא.",
    city: "חיפה",
    price: "₪ 8,000",
    href: "/jobs",
  },
  {
    imageUrl: "https://picsum.photos/seed/listing4/400/200",
    title: "סטודיו מעוצב ליד הים",
    subtitle: "ריהוט מלא. מרפסת. 5 דקות לחוף.",
    city: "הרצליה",
    price: "₪ 6,200",
    href: "/yad2",
  },
  {
    imageUrl: "https://picsum.photos/seed/listing5/400/200",
    title: "וילה פרטית עם בריכה",
    subtitle: '5 חדרים, 250 מ"ר. גינה מטופחת.',
    city: "כפר סבא",
    price: "₪ 25,000",
    href: "/real-estate/for-sale",
  },
];

function buildListingCardCarouselItems(): ListingCardCarouselItem[] {
  return LISTING_CARD_CAROUSEL_ITEMS;
}

export default async function Home() {
  const bannerItems = getHomeBannerItems();
  const categorySvgItems = getCategorySvgLinkItems({
    viewBoxWidth: 120,
    viewBoxHeight: 120,
  });
  const listingCardCarouselItems = buildListingCardCarouselItems();

  return (
    <>
      <Header />
      <HomeLobby>
        <Box p="4">
          <BannerCarousel items={bannerItems} autoplay loop />
        </Box>
        <Box pt="4">
          <CategorySvgLinks items={categorySvgItems} ariaLabel="Категории" />
        </Box>
      </HomeLobby>
    </>
  );
}
{/* <Box pt="4">
<ListingCardCarousel
  items={listingCardCarouselItems}
  infinite
  ariaLabel="Карточки объявлений"
/> */}