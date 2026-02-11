"use client";
import React, { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge, Text, Button, Link, Spinner, Flex } from "@radix-ui/themes";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  CalendarIcon,
  ReaderIcon,
  IdCardIcon,
  Pencil1Icon,
  TrashIcon,
  GearIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { SerializedCommercialVehicle } from "@/lib/vehicles/commercial-vehicles/types/commercialVehicle.types";
import { TransmissionType } from "@/lib/vehicles/cars/types/cars.types";
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
} from "./CommercialVehicleDetailClient.styles";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { deleteCommercialVehicleAdWithRedirect } from "@/lib/vehicles/commercial-vehicles/actions/deleteCommercialVehicleAd";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import DeleteConfirmationModalWithServerAction from "@/components/modals/DeleteConfirmationModalWithServerAction/DeleteConfirmationModalWithServerAction";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_COMMERCIAL_VEHICLES } from "@/lib/constants/entityTypes";
import { getOrCreateChat } from "@/lib/chat/actions/getOrCreateChat";

interface CommercialVehicleDetailClientProps {
  commercialVehicle: SerializedCommercialVehicle;
}

// Helper function to format transmission type
const formatTransmissionType = (type: TransmissionType): string => {
  switch (type) {
    case TransmissionType.MANUAL:
      return "Механическая";
    case TransmissionType.AUTOMATIC:
      return "Автоматическая";
    case TransmissionType.TIPTRONIC:
      return "Типтроник";
    case TransmissionType.ROBOTIC:
      return "Роботизированная";
    default:
      return type;
  }
};

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const CommercialVehicleDetailClient: React.FC<CommercialVehicleDetailClientProps> = ({ commercialVehicle }) => {
  const deleteCommercialVehicleAdByPublicId = deleteCommercialVehicleAdWithRedirect.bind(null, commercialVehicle.publicId);

  const [formState, formAction, isPending] = useActionState(
    deleteCommercialVehicleAdByPublicId,
    undefined
  );
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const { user: currentUser, thisUserIsOwner } = useAuth();
  const isAuthenticated = !!currentUser;
  const router = useRouter();

  const isOwner = thisUserIsOwner(commercialVehicle.user.id);

  const handleContactSeller = async () => {
    if (chatLoading || !isAuthenticated || isOwner) return;
    setChatLoading(true);
    setChatError(null);
    const result = await getOrCreateChat("commercial-vehicles", commercialVehicle.publicId);

    if (result.success && result.chatId) {
      router.push(`/chat/${result.chatId}`);
    } else if (!result.success && result.error) {
      setChatError(result.error);
      setChatLoading(false);
      setErrorModalOpen(true);
    }
  };

  const {
    images,
    publicId,
    district,
    city,
    manufacturer,
    model,
    yearOfManufacture,
    numberOfHand,
    price,
    transmission,
    mileage,
    numberOfDoors,
    color,
    description,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    createdAt,
  } = commercialVehicle;

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
      {/* Header Section */}
      <HeaderSection>
        <Flex align="center" gap="3" wrap="wrap" style={{ flex: 1, minWidth: 0 }}>
          <PageTitle size="8" weight="bold">
            {manufacturer} {model}
          </PageTitle>
          <LikeButton
            entityType={ENTITY_TYPE_COMMERCIAL_VEHICLES}
            publicId={publicId}
            size={20}
            stopPropagation={false}
          />
        </Flex>
        {isOwner && (
          <ButtonGroup>
            <Button disabled={isPending} asChild size="3" variant="soft">
              <Link
                color="yellow"
                href={`/publish-ad/vehicles/commercial-vehicles/edit/${publicId}`}
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
      <BadgeContainer>
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
          {images.length === 1 ? (
            <ImageCarouselContainer>
              <ImageWrapper onClick={() => handleImageClick(0)} style={{ cursor: "pointer" }}>
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
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 1,
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
          )}
        </ImageSection>

        {/* Information Section */}
        <InfoCard>
          {/* Basic Commercial Vehicle Information */}
          <InfoSection>
            <InfoTitle size="5">
              <IdCardIcon width="20" height="20" />
              Информация о коммерческом транспорте
            </InfoTitle>
            <InfoRow>
              <Text size="3" weight="bold">
                {manufacturer} {model}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                {yearOfManufacture} год • {numberOfHand} рук
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="6" weight="bold" color="red">
                {formatPrice(price)}
              </Text>
            </InfoRow>
          </InfoSection>

          {/* Technical Specifications */}
          <InfoSection>
            <InfoTitle size="5">
              <GearIcon width="20" height="20" />
              Технические характеристики
            </InfoTitle>
            <InfoRow>
              <Text size="3" color="gray">
                Коробка передач:
              </Text>
              <Text size="3" weight="medium">
                {formatTransmissionType(transmission)}
              </Text>
            </InfoRow>
            {mileage && (
              <InfoRow>
                <Text size="3" color="gray">
                  Пробег:
                </Text>
                <Text size="3" weight="medium">
                  {new Intl.NumberFormat("ru-RU").format(mileage)} км
                </Text>
              </InfoRow>
            )}
            {numberOfDoors && (
              <InfoRow>
                <Text size="3" color="gray">
                  Количество дверей:
                </Text>
                <Text size="3" weight="medium">
                  {numberOfDoors} дверей
                </Text>
              </InfoRow>
            )}
            {color && (
              <InfoRow>
                <Text size="3" color="gray">
                  Цвет:
                </Text>
                <Text size="3" weight="medium">
                  {color}
                </Text>
              </InfoRow>
            )}
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
              <PersonIcon width="18" height="18" />
              <Text size="3" weight="medium">
                {contactName}
              </Text>
            </ContactItem>

            <ContactItem>
              <EnvelopeClosedIcon width="18" height="18" />
              <Text size="3">*** ***********</Text>
            </ContactItem>

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

            {isAuthenticated && !isOwner && (
              <Button
                size="3"
                variant="soft"
                disabled={chatLoading}
                onClick={handleContactSeller}
                style={{ width: "100%", marginTop: "var(--space-2)" }}
              >
                {chatLoading ? (
                  <Spinner size="3" />
                ) : (
                  <ChatBubbleIcon width="18" height="18" />
                )}
                Написать продавцу
              </Button>
            )}

            {!isAuthenticated && (
              <Text size="2" color="gray" style={{ marginTop: "var(--space-2)" }}>
                Войдите, чтобы написать продавцу
              </Text>
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
      <ErrorModal
        open={errorModalOpen}
        onOpenChange={handleModalClose}
        errorMessage={formState?.error ?? chatError ?? undefined}
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

export default CommercialVehicleDetailClient;
