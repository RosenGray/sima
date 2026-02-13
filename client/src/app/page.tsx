import Header from "../components/Header/Header/Header";
import { BannerCarousel } from "@/components/BannerCarousel/BannerCarousel";
import { CategorySvgLinks } from "@/components/CategoryLinks";
import { getCategorySvgLinkItems } from "@/lib/home/categorySvgLinksConfig";
import { getHomeBannerItems } from "@/lib/home/bannerItems";
import { fetchAllLobbySections } from "@/lib/home/lobbyCarouselData";
import LobbyCarouselSection from "@/components/LobbyCarouselSection/LobbyCarouselSection";
import WhatElseSection from "@/components/WhatElseSection/WhatElseSection";
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
        <BannerCarousel items={bannerItems} autoplay loop />
        <CategorySvgLinks items={categorySvgItems} ariaLabel="Категории" />
        {lobbySections.map((section) => (
          <LobbyCarouselSection key={section.seeAllHref} section={section} />
        ))}
        <WhatElseSection />
      </HomeLobby>
    </>
  );
}
