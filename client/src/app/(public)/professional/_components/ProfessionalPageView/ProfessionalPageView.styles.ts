"use client";
import styled from "styled-components";
import { Box, Card, Container, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import { breakpoints } from "@/globals";

/* ── Top Bar ── */
export const TopBar = styled(Flex)`
  padding: var(--space-3) var(--space-5);
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-4);
  background: var(--color-background);

  a {
    text-decoration: none;
    font-weight: 700;
    font-size: var(--font-size-4);
    color: var(--accent-11);
    letter-spacing: 0.5px;
    transition: color 0.2s ease;

    &:hover {
      color: var(--accent-12);
    }
  }
`;

/* ── Hero ── */
export const HeroSection = styled(Section)`
  position: relative;
  padding: 0;
  background: linear-gradient(
    160deg,
    var(--accent-a2) 0%,
    var(--accent-3) 40%,
    var(--accent-a4) 100%
  );
  border-bottom: 1px solid var(--accent-6);
  overflow: hidden;
`;

export const HeroContent = styled(Flex)`
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-5);
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;

  @media (min-width: ${breakpoints.md}px) {
    padding: var(--space-9) var(--space-6);
  }
`;

export const AvatarCircle = styled(Flex)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 4px solid var(--accent-8);
  box-shadow: 0 4px 24px var(--accent-a5);
  background: var(--accent-3);
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (min-width: ${breakpoints.md}px) {
    width: 150px;
    height: 150px;
  }
`;

export const HeroName = styled(Heading)`
  margin: 0;
  line-height: 1.2;
`;

/* ── Page body ── */
export const PageBody = styled(Container)`
  padding: var(--space-6) var(--space-4);
  flex: 1;

  @media (min-width: ${breakpoints.md}px) {
    padding: var(--space-8) var(--space-6);
  }
`;

export const ContentSection = styled(Box)`
  margin-bottom: var(--space-7);

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled(Heading)`
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

/* ── About ── */
export const AboutCard = styled(Card)`
  padding: var(--space-5);
  line-height: 1.7;

  @media (min-width: ${breakpoints.md}px) {
    padding: var(--space-6);
  }
`;

/* ── Details ── */
export const DetailsBadgeContainer = styled(Flex)`
  gap: var(--space-2);
  flex-wrap: wrap;
`;

/* ── Gallery ── */
export const GalleryGrid = styled(Grid)`
  gap: var(--space-3);
`;

export const GalleryImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-4);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

/* ── Contact ── */
export const ContactCard = styled(Card)`
  padding: var(--space-5);

  @media (min-width: ${breakpoints.md}px) {
    padding: var(--space-6);
  }
`;

export const ContactRow = styled(Flex)`
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-3);
  background: var(--gray-2);
  transition: background 0.15s ease;

  &:hover {
    background: var(--gray-3);
  }
`;

export const SocialLinksRow = styled(Flex)`
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-3);
`;

export const SocialLinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-3);
  background: var(--accent-a3);
  color: var(--accent-11);
  font-size: var(--font-size-2);
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: var(--accent-a4);
    transform: translateY(-1px);
  }
`;

/* ── Footer ── */
export const PageFooter = styled(Flex)`
  padding: var(--space-5) var(--space-4);
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--gray-4);
  background: var(--gray-2);
  gap: var(--space-1);

  a {
    color: var(--accent-11);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;

    &:hover {
      color: var(--accent-12);
    }
  }
`;
