"use client";
import styled from "styled-components";
import { Box } from "@radix-ui/themes";
import { Swiper } from "swiper/react";
import { breakpoints } from "@/globals";

import "swiper/css";
import "swiper/css/autoplay";

export const BannerCarouselViewport = styled(Box)`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;

  &.hideScrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const BannerCarouselSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-wrapper {
    align-items: stretch;
  }

  .swiper-slide {
    height: auto;
  }
`;

export const SlideLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  text-decoration: none;
  min-height: 250px;
`;

export const ImageWrapper = styled(Box)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  &.desktop-only {
    display: none;
    @media (min-width: ${breakpoints.sm}px) {
      display: block;
    }
  }

  &.mobile-only {
    display: block;
    @media (min-width: ${breakpoints.sm}px) {
      display: none;
    }
  }
`;
