"use client";
import styled from "styled-components";
import { Box } from "@radix-ui/themes";
import { Swiper } from "swiper/react";
import { breakpoints } from "@/globals";

import "swiper/css";
import "swiper/css/autoplay";

export const BannerCarouselViewport = styled(Box)`
  width: 100%;
  /* max-width: 90%;
  margin: 0 auto; */
  height: 250px;
  overflow: hidden;
  position: relative;
  border-radius: 14px;

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

export const SlideButtonWrapper = styled(Box)`
  position: absolute;
  left: var(--space-4);
  bottom: var(--space-4);
  z-index: 2;
`;

export const SlideButtonPill = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  background: var(--color-background);
  border: 2px solid var(--accent-9);
  color: var(--accent-11);
  font-size: var(--font-size-2);
  font-weight: 600;
  white-space: nowrap;
  box-shadow: var(--shadow-2);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: var(--accent-2);
    color: var(--accent-12);
    border-color: var(--accent-10);
  }
`;
