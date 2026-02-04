"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import ListingCard from "@/components/ListingCard/ListingCard";
import type { ListingCardCarouselProps, ListingCardCarouselItem } from "./ListingCardCarousel.types";
import {
  ListingCardCarouselViewport,
  ListingCardCarouselSwiper,
  SlideLink,
  NavButton,
} from "./ListingCardCarousel.styles";

const DEFAULT_ARIA_LABEL = "Карточки объявлений";

export function ListingCardCarousel({
  items,
  infinite = false,
  ariaLabel = DEFAULT_ARIA_LABEL,
  className,
}: ListingCardCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(items.length <= 1);

  if (items.length === 0) return null;

  return (
    <ListingCardCarouselViewport className={className} aria-hidden={items.length === 0}>
      <NavButton
        type="button"
        aria-label="Предыдущий слайд"
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={!infinite && isBeginning}
        style={{ left: 0 }}
      >
        <ChevronLeftIcon width={24} height={24} />
      </NavButton>
      <NavButton
        type="button"
        aria-label="Следующий слайд"
        onClick={() => swiperRef.current?.slideNext()}
        disabled={!infinite && isEnd}
        style={{ right: 0 }}
      >
        <ChevronRightIcon width={24} height={24} />
      </NavButton>
      <ListingCardCarouselSwiper
        loop={infinite}
        spaceBetween={16}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 16 },
          1280: { slidesPerView: 4, spaceBetween: 16 },
        }}
        aria-label={ariaLabel}
      >
        {items.map((item: ListingCardCarouselItem, index: number) => (
          <SwiperSlide key={`${item.href}-${index}`} style={{ width: 300, maxWidth: "300px" }}>
            <SlideLink as={Link as React.ElementType} href={item.href}>
              <ListingCard
                imageUrl={item.imageUrl}
                title={item.title}
                subtitle={item.subtitle}
                city={item.city}
                price={item.price}
              />
            </SlideLink>
          </SwiperSlide>
        ))}
      </ListingCardCarouselSwiper>
    </ListingCardCarouselViewport>
  );
}
