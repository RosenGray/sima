import { Button, Flex, Heading, Text, Box, Container } from "@radix-ui/themes";
import Header from "../components/Header/Header/Header";
import Dummy from "@/components/Dummy/Dummy";
import { BannerCarousel } from "@/components/BannerCarousel/BannerCarousel";
import type { BannerSlideItem } from "@/components/BannerCarousel/BannerCarousel.types";
import { CategoryLinks } from "@/components/CategoryLinks/CategoryLinks";
import type { CategoryLinkItem } from "@/components/CategoryLinks/CategoryLinks.types";
import { navItems } from "@/components/Header/Header/navItems";
import { ListingCardCarousel } from "@/components/ListingCardCarousel/ListingCardCarousel";
import type { ListingCardCarouselItem } from "@/components/ListingCardCarousel/ListingCardCarousel.types";




// const PageContainer = styled(Container)`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;
//   padding-top: 6rem; /* Add padding to account for fixed header */
// `;

// const MainContent = styled(Section)`
//   text-align: center;
//   max-width: 600px;
// `;

function buildBannerItems(): BannerSlideItem[] {
  const servicesEntry: BannerSlideItem = {
    href: "/professional-service",
    label: "Услуги специалистов",
    imageDesktop: "https://picsum.photos/seed/banner0/1200/250",
    imageMobile: "https://picsum.photos/seed/banner0m/800/250",
  };
  const fromNav = navItems.map((item, index) => {
    const first = item.subItems[0];
    const seed = index + 1;
    return {
      href: first!.href,
      label: first!.label,
      imageDesktop: `https://picsum.photos/seed/banner${seed}/1200/250`,
      imageMobile: `https://picsum.photos/seed/banner${seed}m/800/250`,
    } satisfies BannerSlideItem;
  });
  return [servicesEntry, ...fromNav];
}

function buildCategoryItems(): CategoryLinkItem[] {
  return navItems.map((item, index) => {
    const first = item.subItems[0];
    const seed = index + 1;
    return {
      href: first!.href,
      label: item.label,
      imageUrl: `https://picsum.photos/seed/category${seed}/150/150`,
    };
  });
}

const LISTING_CARD_CAROUSEL_ITEMS: ListingCardCarouselItem[] = [
  {
    imageUrl: "https://picsum.photos/seed/listing1/400/200",
    title: "נכס מדהים פינתי 145 מ\"ר למאפיה, קונדטוריה...",
    subtitle: "מקום מושלם לעסק. גישה נוחה, חניה.",
    city: "רמת גן",
    price: "₪ 30,000",
    href: "/professional-service",
  },
  {
    imageUrl: "https://picsum.photos/seed/listing2/400/200",
    title: "דירת גן מרווחת עם גינה פרטית",
    subtitle: "3 חדרים, 85 מ\"ר. שקט וירוק.",
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
    subtitle: "5 חדרים, 250 מ\"ר. גינה מטופחת.",
    city: "כפר סבא",
    price: "₪ 25,000",
    href: "/real-estate/for-sale",
  },
];

function buildListingCardCarouselItems(): ListingCardCarouselItem[] {
  return LISTING_CARD_CAROUSEL_ITEMS;
}

export default async function Home() {
  // const bannerItems = buildBannerItems();
  // const categoryItems = buildCategoryItems();
  // const listingCardCarouselItems = buildListingCardCarouselItems();

  return (
    <>
      <Header />

      {/* <Container>
      <BannerCarousel items={bannerItems} autoplay loop />
      <CategoryLinks items={categoryItems} ariaLabel="Категории" />
      <Box pt="4">
        <ListingCardCarousel items={listingCardCarouselItems} infinite ariaLabel="Карточки объявлений" />
      </Box>
      <Box pt="7rem">
        <Box>
          <Flex direction="column" gap="6" align="center">
            <Heading size="9" weight="bold">
              Hello World4
            </Heading>

            <Text size="6" color="gray">
              Welcome to our Marketplace
            </Text>

            <Text
              size="4"
              color="gray"
              style={{ maxWidth: "500px", lineHeight: "1.6" }}
            >
              Discover amazing products, connect with sellers, and build your
              business in our vibrant marketplace community. Your journey starts
              here.
            </Text>

            <Flex gap="4" mt="4">
              <Button size="3" variant="solid">
                Get Started
              </Button>
              <Button size="3" variant="outline">
                Learn More
              </Button>
            </Flex>
          </Flex>
          <div style={{ marginTop: 40, width: "100%" }}>
            <Dummy /> 9
          </div>
        </Box>
      </Box>
      </Container> */}
    </>
  );
}
