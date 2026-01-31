import { Button, Flex, Heading, Text, Box, Container } from "@radix-ui/themes";
import Header from "../components/Header/Header/Header";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import HomePageProvider from "@/providers/HomePageProvider/HomePageProvider";
import Dummy from "@/components/Dummy/Dummy";
import { BannerCarousel } from "@/components/BannerCarousel/BannerCarousel";
import type { BannerSlideItem } from "@/components/BannerCarousel/BannerCarousel.types";
import { CategoryLinks } from "@/components/CategoryLinks/CategoryLinks";
import type { CategoryLinkItem } from "@/components/CategoryLinks/CategoryLinks.types";
import { navItems } from "@/components/Header/Header/navItems";

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

export default async function Home() {
  const serviceCategories = await serviceCategoryRepository.getAll();
  const bannerItems = buildBannerItems();
  const categoryItems = buildCategoryItems();

  return (
    <HomePageProvider data={{ serviceCategories }}>
      {/* <Header /> */}
      <Container>
      <BannerCarousel items={bannerItems} autoplay loop />
      <CategoryLinks items={categoryItems} ariaLabel="Категории" />
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
      </Container>
    </HomePageProvider>
  );
}
