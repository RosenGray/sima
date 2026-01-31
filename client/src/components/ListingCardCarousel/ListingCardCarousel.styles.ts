"use client";
import styled from "styled-components";
import { Box } from "@radix-ui/themes";
import { Swiper } from "swiper/react";

import "swiper/css";

export const ListingCardCarouselViewport = styled(Box)`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: var(--space-4) var(--space-9);
  min-height: 340px;
`;

export const ListingCardCarouselSwiper = styled(Swiper)`
  width: 100%;
  padding: var(--space-2) 0;
  position: relative;
  z-index: 1;

  .swiper-slide {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border: none;
  border-radius: var(--radius-3);
  background: var(--gray-1);
  color: var(--gray-12);
  box-shadow: var(--shadow-4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--accent-9);
    color: var(--gray-1);
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const SlideLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;
