"use client";

import React, { FC } from "react";
import Link from "next/link";
import { ListingCardCarousel } from "@/components/ListingCardCarousel/ListingCardCarousel";
import type { LobbyCarouselSection as LobbyCarouselSectionType } from "@/lib/home/lobbyCarousel.types";
import {
  SectionWrapper,
  SectionHeader,
  SectionTitle,
  SeeAllLink,
} from "./LobbyCarouselSection.styles";

interface LobbyCarouselSectionProps {
  section: LobbyCarouselSectionType;
}

const LobbyCarouselSection: FC<LobbyCarouselSectionProps> = ({ section }) => {
  if (section.items.length === 0) return null;

  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionTitle size={{ initial: "4", md: "5" }}>
          {section.title}
        </SectionTitle>
        <SeeAllLink as={Link as React.ElementType} href={section.seeAllHref}>
          Все объявления →
        </SeeAllLink>
      </SectionHeader>
      <ListingCardCarousel
        items={section.items}
        infinite={section.items.length > 3}
        ariaLabel={section.title}
      />
    </SectionWrapper>
  );
};

export default LobbyCarouselSection;
