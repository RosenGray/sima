"use client";
import React, { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { Badge, Text, Button, Link, Spinner } from "@radix-ui/themes";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  CalendarIcon,
  ReaderIcon,
  IdCardIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { SerializedYad2Item } from "@/lib/yad2/types/yad2.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import ImageModal from "@/components/modals/ImageModal/ImageModal";
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
  HeaderSection,
  ButtonGroup,
} from "./Yad2ItemDetailClient.styles";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import {
  deleteYad2ItemAdWithRedirect,
} from "@/lib/yad2/actions/deleteYad2ItemAd";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import DeleteConfirmationModalWithServerAction from "@/components/modals/DeleteConfirmationModalWithServerAction/DeleteConfirmationModalWithServerAction";
import {
  getYad2CategoryById,
} from "@/lib/yad2/yad2Categories";
import {
  getYad2SubCategoryById,
} from "@/lib/yad2/yad2SubCategories";
import {
  Yad2CategoryId,
} from "@/lib/yad2/yad2Categories/types/yad2Category.schema";

interface Yad2ItemDetailClientProps {
  yad2Item: SerializedYad2Item;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const Yad2ItemDetailClient: React.FC<Yad2ItemDetailClientProps> = ({
  yad2Item,
}) => {
  const deleteYad2ItemAdByPublicId = deleteYad2ItemAdWithRedirect.bind(
    null,
    yad2Item.publicId
  );

  const [formState, formAction, isPending] = useActionState(
    deleteYad2ItemAdByPublicId,
    undefined
  );

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { user: currentUser, thisUserIsOwner } = useAuth();
  const isAuthenticated = !!currentUser;

  const isOwner = thisUserIsOwner(yad2Item.user.id);

  const {
    images,
    publicId,
    district,
    city,
    category,
    subCategory,
    productTitle,
    price,
    description,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    createdAt,
  } = yad2Item;

  const cityInfo = getCityById(city, district as Districts);
  const categoryData = getYad2CategoryById(category as Yad2CategoryId);
  const categoryName = categoryData?.russianName || "";
  const subCategoryData = getYad2SubCategoryById(
    subCategory,
    category as Yad2CategoryId
  );
  const subCategoryName = subCategoryData?.russianName || "";

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

  const handleModalClose = () => {
    setErrorModalOpen(false);
  };

  useEffect(() => {
    if (formState && !formState.success && formState.error) {
      setErrorModalOpen(true);
    }
  }, [formState]);

  return (
    <PageContainer size="4">
      {/* Header Section with Title and Owner Actions */}
      <HeaderSection>
        <PageTitle size="8" weight="bold">
          {productTitle}
        </PageTitle>
        {isOwner && (
          <ButtonGroup>
            <Button disabled={isPending} asChild size="3" variant="soft">
              <Link
                color="yellow"
                href={`/publish-ad/yad2/edit/${publicId}`}
              >
                <Pencil1Icon width="18" height="18" />
                Редактировать
              </Link>
            </Button>

            <Button
              style={{ cursor: "pointer", minWidth: "125px" }}
              size="3"
              variant="soft"
              color="red"
              disabled={isPending}
              onClick={() => setDeleteConfirmationModalOpen(true)}
            >
              <TrashIcon width="18" height="18" />
              {isPending ? <Spinner size="3" /> : "Удалить"}
            </Button>
          </ButtonGroup>
        )}
      </HeaderSection>

      {/* Badges (location, category, publicId) */}
      <BadgeContainer>
        {categoryName && (
          <Badge size="2" color="blue" variant="soft">
            {categoryName}
          </Badge>
        )}
        {subCategoryName && (
          <Badge size="2" color="green" variant="soft">
            {subCategoryName}
          </Badge>
        )}
        {cityInfo?.nameRussian && (
          <Badge size="2" color="purple" variant="soft">
            {cityInfo.nameRussian}
          </Badge>
        )}
        <Badge size="2" color="gray" variant="outline">
          #{publicId}
        </Badge>
      </BadgeContainer>

      {/* Main Content Grid */}
      <ContentGrid
        columns={{
          initial: "1",
          md: "2",
        }}
      >
        {/* Image Gallery Section */}
        <ImageSection>
          {images.length === 1 ? (
            <ImageCarouselContainer>
              <ImageWrapper
                onClick={() => handleImageClick(0)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={images[0].url}
                  alt={images[0].originalName}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                />
              </ImageWrapper>
            </ImageCarouselContainer>
          ) : (
            <ImageCarouselContainer>
              <CarouselSwiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 1 },
                  1024: { slidesPerView: 1 },
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
          )}
        </ImageSection>

        {/* Information Section */}
        <InfoCard>
          {/* Basic Information Section */}
          <InfoSection>
            <InfoTitle size="5">
              <IdCardIcon width="20" height="20" />
              Основная информация
            </InfoTitle>
            <InfoRow>
              <Text size="3" weight="bold">
                {productTitle}
              </Text>
            </InfoRow>
            {categoryName && (
              <InfoRow>
                <Text size="3" color="gray">
                  Категория:
                </Text>
                <Text size="3" weight="medium">
                  {categoryName}
                </Text>
              </InfoRow>
            )}
            {subCategoryName && (
              <InfoRow>
                <Text size="3" color="gray">
                  Подкатегория:
                </Text>
                <Text size="3" weight="medium">
                  {subCategoryName}
                </Text>
              </InfoRow>
            )}
            <InfoRow>
              <Text size="3" color="gray">
                Цена:
              </Text>
              <Text size="5" weight="bold" color="red">
                {formatPrice(price)}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Местоположение:
              </Text>
              <Text size="3" weight="medium">
                {cityInfo?.nameRussian || "Неизвестный город"}
              </Text>
            </InfoRow>
          </InfoSection>

          {/* Description Section */}
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

            {/* Contact Name */}
            <ContactItem>
              <PersonIcon width="18" height="18" />
              <Text size="3" weight="medium">
                {contactName}
              </Text>
            </ContactItem>

            {/* Email - Always Masked */}
            <ContactItem>
              <EnvelopeClosedIcon width="18" height="18" />
              <Text size="3">*** ***********</Text>
            </ContactItem>

            {/* Phone - Visible Only if Authenticated */}
            {isAuthenticated ? (
              <>
                <ContactItem>
                  <MobileIcon width="18" height="18" />
                  <Text size="3" weight="bold">
                    {contactPrimaryPhone}
                  </Text>
                </ContactItem>
                {contactSecondaryPhone && (
                  <ContactItem>
                    <MobileIcon width="18" height="18" />
                    <Text size="3" weight="bold">
                      {contactSecondaryPhone}
                    </Text>
                  </ContactItem>
                )}
              </>
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

      {/* Modals */}
      <ImageModal
        images={images}
        currentIndex={selectedImageIndex}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onNavigate={setSelectedImageIndex}
      />
      <ErrorModal
        open={errorModalOpen}
        onOpenChange={handleModalClose}
        errorMessage={formState?.error}
      />
      <DeleteConfirmationModalWithServerAction
        open={deleteConfirmationModalOpen}
        onOpenChange={setDeleteConfirmationModalOpen}
        onConfirm={formAction}
        isPending={isPending}
      />
    </PageContainer>
  );
};

export default Yad2ItemDetailClient;
