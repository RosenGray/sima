"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import ListingCard from "@/components/ListingCard/ListingCard";
import type {
  ListingCardCarouselProps,
  ListingCardCarouselItem,
} from "./ListingCardCarousel.types";
import {
  ListingCardCarouselViewport,
  ListingCardCarouselSwiper,
  SlideLink,
  NavButton,
} from "./ListingCardCarousel.styles";
import { getCityById, getDistrictById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

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
    <ListingCardCarouselViewport
      className={className}
      aria-hidden={items.length === 0}
    >
      <NavButton
        type="button"
        aria-label="Предыдущий слайд"
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={!infinite && isBeginning}
        style={{ left: 0 }}
        className="swiper-button-prev"
      >
        <ChevronLeftIcon width={24} height={24} />
      </NavButton>
      <NavButton
        type="button"
        aria-label="Следующий слайд"
        onClick={() => swiperRef.current?.slideNext()}
        disabled={!infinite && isEnd}
        style={{ right: 0 }}
        className="swiper-button-next"
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
          1280: { slidesPerView: 4, spaceBetween: 10 },
        }}
        aria-label={ariaLabel}
      >
        {items.map((item: ListingCardCarouselItem, index: number) => {
          const city = getCityById(item.city, item.district as Districts);
          const district = getDistrictById(item.district as Districts);
          console.log(item)
          return (
            <SwiperSlide
              key={`${item.href}-${index}`}
              style={{ width: 250, maxWidth: "250px" }}
            >
           
          
              <SlideLink as={Link as React.ElementType} href={item.href}>
                <ListingCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle={item.subtitle}
                  city={city?.nameRussian || ""}  
                  price={item.price}
                  district={district?.name || ""}
                />
              </SlideLink>
            </SwiperSlide>
          );
        })}
      </ListingCardCarouselSwiper>
    </ListingCardCarouselViewport>
  );
}
