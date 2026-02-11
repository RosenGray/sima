import { Box } from "@radix-ui/themes";
import Header from "../components/Header/Header/Header";
import { BannerCarousel } from "@/components/BannerCarousel/BannerCarousel";
import { CategorySvgLinks } from "@/components/CategoryLinks";
import { getCategorySvgLinkItems } from "@/lib/home/categorySvgLinksConfig";
import { getHomeBannerItems } from "@/lib/home/bannerItems";
import { fetchAllLobbySections } from "@/lib/home/lobbyCarouselData";
import LobbyCarouselSection from "@/components/LobbyCarouselSection/LobbyCarouselSection";
import { HomeLobby } from "./page.styles";

export default async function Home() {
  const bannerItems = getHomeBannerItems();
  const categorySvgItems = getCategorySvgLinkItems({
    viewBoxWidth: 120,
    viewBoxHeight: 120,
  });
  const lobbySections = await fetchAllLobbySections();

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
        {lobbySections.map((section) => (
          <LobbyCarouselSection key={section.seeAllHref} section={section} />
        ))}
      </HomeLobby>
    </>
  );
}
