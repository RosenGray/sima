"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge, Flex, Text } from "@radix-ui/themes";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  ReaderIcon,
  GlobeIcon,
  ChatBubbleIcon,
  HomeIcon,
  DrawingPinIcon,
} from "@radix-ui/react-icons";
import { SerializedProfessionalPage } from "@/lib/professionals/professional-page/types/professional-page.types";
import ImageModal from "@/components/modals/ImageModal/ImageModal";
import {
  OwnerBanner,
  TopBar,
  HeroSection,
  HeroContent,
  AvatarCircle,
  HeroName,
  PageBody,
  ContentSection,
  SectionTitle,
  AboutCard,
  DetailsBadgeContainer,
  GalleryGrid,
  GalleryImageWrapper,
  ContactCard,
  ContactRow,
  SocialLinksRow,
  SocialLinkButton,
  PageFooter,
} from "./ProfessionalPageView.styles";
import { Logo } from "@/components/Header/Header.styles";
import SimaDarkLogo from "@/components/svg/Sima/SimaDarkLogo";
import { getCityById, getDistrictById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface ProfessionalPageViewProps {
  page: SerializedProfessionalPage;
  isOwner?: boolean;
  editHref?: string;
}

const ProfessionalPageView: React.FC<ProfessionalPageViewProps> = ({
  page,
  isOwner = false,
  editHref = "",
}) => {
  const {
    displayName,
    description,
    profileImage,
    galleryImages,
    category,
    subCategory,
    district,
    city,
    contactPhone,
    contactEmail,
    socialLinks,
  } = page;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleGalleryImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const _district = getDistrictById(district as Districts)?.name;
  const _city = getCityById(city as string, district as Districts)?.nameRussian;

  // Build initials for avatar fallback
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hasSocialLinks =
    socialLinks &&
    (socialLinks.whatsapp ||
      socialLinks.instagram ||
      socialLinks.facebook ||
      socialLinks.website);

  const hasContactInfo = contactPhone || contactEmail || hasSocialLinks;
  const hasGallery = galleryImages && galleryImages.length > 0;
  const hasDetails = category || subCategory || district || city;

  return (
    <>
      {/* ── Top Bar ── */}
      <TopBar>
        <Logo>
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            href="/"
          >
            <SimaDarkLogo
              viewBox={{ width: 200, height: 60 }}
              width={200}
              height={60}
            />
          </Link>
        </Logo>
      </TopBar>

      {/* ── Owner-only: edit hint (visible only to the page owner) ── */}
      {isOwner && editHref && (
        <OwnerBanner>
          <Text size="2" color="gray">
            Это сообщение видно только вам. Если хотите отредактировать
            страницу, вы можете сделать это <Link href={editHref}>здесь</Link>.
          </Text>
        </OwnerBanner>
      )}

      {/* ── Hero ── */}
      <HeroSection>
        <HeroContent>
          <AvatarCircle>
            {profileImage ? (
              <Image
                src={profileImage.url}
                alt={displayName}
                fill
                style={{ objectFit: "cover" }}
                sizes="150px"
              />
            ) : (
              <Text
                size="8"
                weight="bold"
                style={{ color: "var(--accent-11)" }}
              >
                {initials}
              </Text>
            )}
          </AvatarCircle>

          <HeroName size={{ initial: "7", md: "8" }} weight="bold">
            {displayName}
          </HeroName>

          <Flex gap="2" wrap="wrap" justify="center">
            {category && (
              <Badge size="2" color="iris" variant="soft">
                {category.russianDisplayName}
              </Badge>
            )}
            {subCategory && (
              <Badge size="2" color="violet" variant="soft">
                {subCategory.russianDisplayName}
              </Badge>
            )}
          </Flex>

          {_district && _city && (
            <Flex align="center" gap="2">
              <DrawingPinIcon width={16} height={16} />
              <Text size="3" color="gray">
                {[_district, _city].filter(Boolean).join(", ")}
              </Text>
            </Flex>
          )}
        </HeroContent>
      </HeroSection>

      {/* ── Body ── */}
      <PageBody size="3">
        {/* About */}
        <ContentSection>
          <SectionTitle size="5">
            <ReaderIcon width={20} height={20} />
            Обо мне
          </SectionTitle>
          <AboutCard variant="surface">
            <Text size="3" style={{ whiteSpace: "pre-wrap" }}>
              {description}
            </Text>
          </AboutCard>
        </ContentSection>

        {/* Details */}
        {hasDetails && (
          <ContentSection>
            <SectionTitle size="5">
              <HomeIcon width={20} height={20} />
              Детали
            </SectionTitle>
            <DetailsBadgeContainer>
              {category && (
                <Badge size="2" color="gray" variant="outline">
                  {category.russianDisplayName}
                </Badge>
              )}
              {subCategory && (
                <Badge size="2" color="gray" variant="outline">
                  {subCategory.russianDisplayName}
                </Badge>
              )}
              {_district && (
                <Badge size="2" color="blue" variant="soft">
                  {_district}
                </Badge>
              )}
              {_city && (
                <Badge size="2" color="cyan" variant="soft">
                  {_city}
                </Badge>
              )}
            </DetailsBadgeContainer>
          </ContentSection>
        )}

        {/* Gallery */}
        {hasGallery && (
          <ContentSection>
            <SectionTitle size="5">
              <GlobeIcon width={20} height={20} />
              Галерея
            </SectionTitle>
            <GalleryGrid columns={{ initial: "1", xs: "2", md: "3" }}>
              {galleryImages!.map((image, index) => (
                <GalleryImageWrapper
                  key={image.uniqueName}
                  onClick={() => handleGalleryImageClick(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.originalName}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 520px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </GalleryImageWrapper>
              ))}
            </GalleryGrid>
          </ContentSection>
        )}

        {/* Contact */}
        {hasContactInfo && (
          <ContentSection>
            <SectionTitle size="5">
              <PersonIcon width={20} height={20} />
              Контакты
            </SectionTitle>
            <ContactCard variant="surface">
              <Flex direction="column" gap="3">
                {contactPhone && (
                  <ContactRow>
                    <MobileIcon width={18} height={18} />
                    <Text size="3" weight="bold">
                      {contactPhone}
                    </Text>
                  </ContactRow>
                )}

                {contactEmail && (
                  <ContactRow>
                    <EnvelopeClosedIcon width={18} height={18} />
                    <Text size="3">{contactEmail}</Text>
                  </ContactRow>
                )}

                {hasSocialLinks && (
                  <SocialLinksRow>
                    {socialLinks!.whatsapp && (
                      //
                      <SocialLinkButton
                        href={`https://wa.me/${socialLinks!.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ChatBubbleIcon width={16} height={16} />
                        WhatsApp
                      </SocialLinkButton>
                    )}
                    {socialLinks!.instagram && (
                      <SocialLinkButton
                        href={socialLinks!.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PersonIcon width={16} height={16} />
                        Instagram
                      </SocialLinkButton>
                    )}
                    {socialLinks!.facebook && (
                      <SocialLinkButton
                        href={socialLinks!.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PersonIcon width={16} height={16} />
                        Facebook
                      </SocialLinkButton>
                    )}
                    {socialLinks!.website && (
                      <SocialLinkButton
                        href={socialLinks!.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GlobeIcon width={16} height={16} />
                        Сайт
                      </SocialLinkButton>
                    )}
                  </SocialLinksRow>
                )}
              </Flex>
            </ContactCard>
          </ContentSection>
        )}
      </PageBody>

      {/* ── Footer ── */}
      <PageFooter>
        <Text size="2" color="gray">
          Создано на
        </Text>
        <Link href="/">SIMA</Link>
      </PageFooter>

      {/* Image Modal */}
      {hasGallery && (
        <ImageModal
          images={galleryImages!}
          currentIndex={selectedImageIndex}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </>
  );
};

export default ProfessionalPageView;
