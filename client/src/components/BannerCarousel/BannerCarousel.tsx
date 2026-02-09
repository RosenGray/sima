"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { BannerCarouselProps, BannerSlideItem } from "./BannerCarousel.types";
import {
  BannerCarouselViewport,
  BannerCarouselSwiper,
  SlideLink,
  ImageWrapper,
  SlideButtonWrapper,
  SlideButtonPill,
} from "./BannerCarousel.styles";

const DEFAULT_ARIA_LABEL = "Слайды";
const DEFAULT_AUTOPLAY_DELAY = 3000;

function isInternalHref(href: string): boolean {
  return href.startsWith("/");
}

function resolveAutoplayConfig(
  autoplay: BannerCarouselProps["autoplay"]
): { delay: number; disableOnInteraction: boolean } | false {
  if (autoplay === undefined || autoplay === false) return false;
  if (autoplay === true) {
    return { delay: DEFAULT_AUTOPLAY_DELAY, disableOnInteraction: false };
  }
  const enabled = autoplay.enabled !== false;
  if (!enabled) return false;
  return {
    delay: autoplay.delay ?? DEFAULT_AUTOPLAY_DELAY,
    disableOnInteraction: autoplay.disableOnInteraction ?? false,
  };
}

export function BannerCarousel({
  items,
  autoplay,
  loop = true,
  className,
  ariaLabel = DEFAULT_ARIA_LABEL,
  showButton = true,
}: BannerCarouselProps) {
  const autoplayConfig = resolveAutoplayConfig(autoplay);

  return (
    <BannerCarouselViewport
      className={`${className ?? ""} hideScrollbar`.trim()}
      aria-hidden={items.length === 0}
    >
      <BannerCarouselSwiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={loop}
        wrapperTag="ul"
        aria-label={ariaLabel}
        autoplay={
          autoplayConfig
            ? {
                delay: autoplayConfig.delay,
                disableOnInteraction: autoplayConfig.disableOnInteraction,
              }
            : false
        }
      >
        {items.map((item: BannerSlideItem, index: number) => (
          <SwiperSlide
            key={`${item.href}-${index}`}
            tag="li"
            aria-label="שקופית"
          >
            <SlideContent item={item} showButton={showButton} />
          </SwiperSlide>
        ))}
      </BannerCarouselSwiper>
    </BannerCarouselViewport>
  );
}

function SlideContent({
  item,
  showButton,
}: {
  item: BannerSlideItem;
  showButton: boolean;
}) {
  const desktopSrc = item.imageDesktop;
  const mobileSrc = item.imageMobile ?? item.imageDesktop;
  const ariaLabel = item.label ?? "Slide";
  const showPill = showButton && item.buttonLabel;

  const content = (
    <>
      <ImageWrapper className="desktop-only">
        <Image
          src={desktopSrc}
          alt=""
          role="presentation"
          fill
          sizes="90vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </ImageWrapper>
      <ImageWrapper className="mobile-only">
        <Image
          src={mobileSrc}
          alt=""
          role="presentation"
          fill
          sizes="90vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </ImageWrapper>
      {showPill && (
        <SlideButtonWrapper>
          <SlideButtonPill as="span">{item.buttonLabel}</SlideButtonPill>
        </SlideButtonWrapper>
      )}
    </>
  );

  if (isInternalHref(item.href)) {
    return (
      <SlideLink
        as={Link as React.ElementType}
        href={item.href}
        aria-label={ariaLabel}
      >
        {content}
      </SlideLink>
    );
  }

  return (
    <SlideLink
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {content}
    </SlideLink>
  );
}
