"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Badge, Text } from "@radix-ui/themes";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  CalendarIcon,
  ReaderIcon,
  IdCardIcon,
} from "@radix-ui/react-icons";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import ImageModal from "../ImageModal";

import {
  PageContainer,
  PageTitle,
  ContentGrid,
  ImageSection,
  ImageCarouselContainer,
  CarouselSwiper,
  ImageWrapper,
  InfoCard,
  InfoSection,
  InfoTitle,
  InfoRow,
  ContactSection,
  ContactItem,
  BadgeContainer,
  DescriptionBox,
  MetaInfo,
  MetaItem,
} from "./ProfessionalServiceDetailClient.styles";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";

interface ProfessionalServiceDetailClientProps {
  service: SerilizeProfessionalService;
}

const ProfessionalServiceDetailClient: React.FC<
  ProfessionalServiceDetailClientProps
> = ({ service }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { user: currentUser } = useAuth();
  const isAuthenticated = !!currentUser;

  const {
    images,
    publicId,
    district,
    city,
    description,
    user,
    category,
    subCategory,
    email,
    phoneNumber,
    createdAt,
  } = service;

  const cityInfo = getCityById(city, district as Districts);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <PageContainer size="4">
      {/* Header Section */}
      <PageTitle size="8" weight="bold">
        {subCategory.russianDisplayName}
      </PageTitle>

      <BadgeContainer>
        <Badge size="2" color="blue" variant="soft">
          {category.russianDisplayName}
        </Badge>
        <Badge size="2" color="green" variant="soft">
          {cityInfo?.nameRussian || "Неизвестный город"}
        </Badge>
        <Badge size="2" color="gray" variant="outline">
          #{publicId}
        </Badge>
      </BadgeContainer>
      <ContentGrid
        columns={{
          initial: "1",
          md: "2",
        }}
      >
        {/* Image Gallery Section */}
        <ImageSection>
          <ImageCarouselContainer>
            <CarouselSwiper
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.uniqueName}>
                  <ImageWrapper onClick={() => handleImageClick(index)}>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </ImageWrapper>
                </SwiperSlide>
              ))}
            </CarouselSwiper>
          </ImageCarouselContainer>
        </ImageSection>

        {/* Information Section */}
        <InfoCard>
          {/* Provider Information */}
          <InfoSection>
            <InfoTitle size="5">
              <PersonIcon width="20" height="20" />
              Исполнитель
            </InfoTitle>
            <InfoRow>
              <IdCardIcon width="18" height="18" />
              <Text size="3" weight="medium">
                {user.firstName} {user.lastName}
              </Text>
            </InfoRow>
          </InfoSection>

          {/* Description */}
          <InfoSection>
            <InfoTitle size="5">
              <ReaderIcon width="20" height="20" />
              Описание
            </InfoTitle>
            <DescriptionBox>
              <Text size="3" style={{ whiteSpace: "pre-wrap" }}>
                {description}
              </Text>
            </DescriptionBox>
          </InfoSection>

          {/* Contact Information */}
          <ContactSection>
            <InfoTitle size="5">Контактная информация</InfoTitle>

            <ContactItem>
              <EnvelopeClosedIcon width="18" height="18" />
              <Text size="3">{email}</Text>
            </ContactItem>

            {isAuthenticated ? (
              <ContactItem>
                <MobileIcon width="18" height="18" />
                <Text size="3" weight="bold">
                  {phoneNumber}
                </Text>
              </ContactItem>
            ) : (
              <ContactItem>
                <MobileIcon width="18" height="18" />
                <Text size="2" color="gray">
                  Войдите, чтобы увидеть номер телефона
                </Text>
              </ContactItem>
            )}
          </ContactSection>

          {/* Meta Information */}
          <MetaInfo>
            <MetaItem>
              <CalendarIcon width="16" height="16" />
              <Text size="2">Опубликовано: {formatDate(createdAt)}</Text>
            </MetaItem>
          </MetaInfo>
        </InfoCard>
      </ContentGrid>

      {/* Image Modal */}
      <ImageModal
        images={images}
        currentIndex={selectedImageIndex}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onNavigate={setSelectedImageIndex}
      />
    </PageContainer>
  );
};

export default ProfessionalServiceDetailClient;
