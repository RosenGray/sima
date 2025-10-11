"use client";
import styled from "styled-components";
import { Box, Card, Container, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export const PageContainer = styled(Container)`
  padding: var(--space-4);
  
  @media (min-width: 768px) {
    padding: var(--space-6);
  }
  
  @media (min-width: 1024px) {
    padding: var(--space-8);
  }
`;

export const PageTitle = styled(Heading)`
  margin-bottom: var(--space-4);
`;

export const ContentGrid = styled(Grid)`
  gap: var(--space-5);
  margin-top: var(--space-5);
`;

export const ImageSection = styled(Section)`
  padding: 0;
  width: 100%;
`;

export const ImageCarouselContainer = styled(Box)`
  width: 100%;
  height: 400px;
  border-radius: var(--radius-4);
  overflow: hidden;
  position: relative;
  background: var(--gray-3);
  
  @media (min-width: 768px) {
    height: 500px;
  }
  
  @media (min-width: 1024px) {
    height: 600px;
  }
`;

export const CarouselSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

export const CarouselSlide = styled(SwiperSlide)`
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const ImageWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const InfoCard = styled(Card)`
  padding: var(--space-5);
  
  @media (min-width: 768px) {
    padding: var(--space-6);
  }
`;

export const InfoSection = styled(Box)`
  margin-bottom: var(--space-5);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoTitle = styled(Heading)`
  margin-bottom: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

export const InfoRow = styled(Flex)`
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ContactSection = styled(Box)`
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--gray-6);
`;

export const ContactItem = styled(Flex)`
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-3);
  background: var(--gray-2);
  margin-bottom: var(--space-3);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: var(--gray-3);
  }
`;

export const BadgeContainer = styled(Flex)`
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-3);
`;

export const DescriptionBox = styled(Box)`
  padding: var(--space-4);
  background: var(--gray-2);
  border-radius: var(--radius-3);
  line-height: 1.6;
`;

export const MetaInfo = styled(Flex)`
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--gray-6);
`;

export const MetaItem = styled(Flex)`
  align-items: center;
  gap: var(--space-2);
  color: var(--gray-11);
  font-size: var(--font-size-2);
`;

