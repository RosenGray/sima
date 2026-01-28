"use client";
import React, { useActionState, useEffect, useState } from "react";
import Image from "next/image";
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
  HomeIcon,
  RulerHorizontalIcon,
  LayersIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { SerializedRealEstateForRent } from "@/lib/real-estate/for-rent/types/realEstateForRent.types";
import {
  PropertyKind,
  AirConditioning,
  Parking,
  AdditionalFeatures,
  Furniture,
  EntryDate,
} from "@/lib/real-estate/for-rent/types/realEstateForRent.types";
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
} from "./RealEstateForRentDetailClient.styles";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import {
  deleteRealEstateForRentAdWithRedirect,
} from "@/lib/real-estate/for-rent/actions/deleteRealEstateForRentAd";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import DeleteConfirmationModalWithServerAction from "@/components/modals/DeleteConfirmationModalWithServerAction/DeleteConfirmationModalWithServerAction";

interface RealEstateForRentDetailClientProps {
  realEstate: SerializedRealEstateForRent;
}

// Helper functions to format enum values
const formatPropertyKind = (propertyKind: PropertyKind): string => {
  return propertyKind === PropertyKind.Apartment ? "Квартира" : "Лофт";
};

const formatAirConditioning = (airconditioning: AirConditioning): string => {
  switch (airconditioning) {
    case AirConditioning.None:
      return "Нет";
    case AirConditioning.InRooms:
      return "В комнатах";
    case AirConditioning.InRoomsAndLivingRoom:
      return "В комнатах и гостиной";
    case AirConditioning.InLivingRoom:
      return "В гостиной";
    case AirConditioning.Central:
      return "Центральное";
    case AirConditioning.MiniCentral:
      return "Мини-центральное";
    case AirConditioning.Split:
      return "Сплит";
    default:
      return "";
  }
};

const formatParking = (parking: Parking): string => {
  switch (parking) {
    case Parking.None:
      return "Нет";
    case Parking.InTheStreet:
      return "На улице";
    case Parking.Shared:
      return "Общая";
    case Parking.PayedParking:
      return "Платная парковка";
    case Parking.PrivateCovered:
      return "Частная крытая";
    case Parking.PrivateUncovered:
      return "Частная открытая";
    default:
      return "";
  }
};

const formatFurniture = (furniture: Furniture): string => {
  switch (furniture) {
    case Furniture.None:
      return "Нет";
    case Furniture.Partial:
      return "Частично";
    case Furniture.Full:
      return "Полностью";
    default:
      return "";
  }
};

const formatEntryDate = (entryDate: EntryDate): string => {
  return entryDate === EntryDate.Immediate ? "Немедленно" : "Гибкая";
};

const ADDITIONAL_FEATURES_LABELS: Record<number, string> = {
  [AdditionalFeatures.Bars]: "Решетки",
  [AdditionalFeatures.Elevator]: "Лифт",
  [AdditionalFeatures.ForRoommates]: "Для соседей",
  [AdditionalFeatures.Warehouse]: "Склад",
  [AdditionalFeatures.Shelter]: "Убежище",
  [AdditionalFeatures.PetsSuitable]: "Подходит для животных",
  [AdditionalFeatures.SolarHeater]: "Солнечный нагреватель",
  [AdditionalFeatures.Renovated]: "Отремонтировано",
};

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

// Helper function to format date
const formatDate = (year: number, month: number, day: number): string => {
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const RealEstateForRentDetailClient: React.FC<RealEstateForRentDetailClientProps> = ({
  realEstate,
}) => {
  const deleteRealEstateAdByPublicId = deleteRealEstateForRentAdWithRedirect.bind(
    null,
    realEstate.publicId
  );

  const [formState, formAction, isPending] = useActionState(
    deleteRealEstateAdByPublicId,
    undefined
  );
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { user: currentUser, thisUserIsOwner } = useAuth();
  const isAuthenticated = !!currentUser;

  const isOwner = thisUserIsOwner(realEstate.user.id);

  const {
    images,
    publicId,
    district,
    city,
    streetname,
    propertyKind,
    numberOfRooms,
    airconditioning,
    balcony,
    parking,
    squaremeter,
    propertyTax,
    floor,
    totalflors,
    additionalFeatures,
    furniture,
    furnitureDescription,
    description,
    price,
    annualPayments,
    year,
    month,
    day,
    entryDate,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    createdAt,
  } = realEstate;

  const cityInfo = getCityById(city, district as Districts);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const formatCreatedDate = (dateString: string) => {
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

  const title = streetname || "Недвижимость в аренду";

  return (
    <PageContainer size="4">
      {/* Header Section */}
      <HeaderSection>
        <PageTitle size="8" weight="bold">
          {title}
        </PageTitle>
        {isOwner && (
          <ButtonGroup>
            <Button disabled={isPending} asChild size="3" variant="soft">
              <Link
                color="yellow"
                href={`/publish-ad/real-estate/for-rent/edit/${publicId}`}
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
        <Badge size="2" color="blue" variant="soft">
          {formatPropertyKind(propertyKind)}
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
          {/* Basic Property Information */}
          <InfoSection>
            <InfoTitle size="5">
              <IdCardIcon width="20" height="20" />
              Основная информация
            </InfoTitle>
            <InfoRow>
              <Text size="3" weight="bold">
                {title}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="6" weight="bold" color="red">
                {formatPrice(price)}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                {numberOfRooms} комнат • {squaremeter} м²
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Этаж {floor} из {totalflors}
              </Text>
            </InfoRow>
            {balcony > 0 && (
              <InfoRow>
                <Text size="3" color="gray">
                  Балкон: {balcony}
                </Text>
              </InfoRow>
            )}
          </InfoSection>

          {/* Property Details */}
          <InfoSection>
            <InfoTitle size="5">
              <HomeIcon width="20" height="20" />
              Детали недвижимости
            </InfoTitle>
            <InfoRow>
              <Text size="3" color="gray">
                Тип недвижимости:
              </Text>
              <Text size="3" weight="medium">
                {formatPropertyKind(propertyKind)}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Площадь:
              </Text>
              <Text size="3" weight="medium">
                {squaremeter} м²
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Количество комнат:
              </Text>
              <Text size="3" weight="medium">
                {numberOfRooms}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Этаж:
              </Text>
              <Text size="3" weight="medium">
                {floor}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Всего этажей:
              </Text>
              <Text size="3" weight="medium">
                {totalflors}
              </Text>
            </InfoRow>
            {balcony > 0 && (
              <InfoRow>
                <Text size="3" color="gray">
                  Балкон:
                </Text>
                <Text size="3" weight="medium">
                  {balcony}
                </Text>
              </InfoRow>
            )}
          </InfoSection>

          {/* Features */}
          <InfoSection>
            <InfoTitle size="5">
              <LightningBoltIcon width="20" height="20" />
              Особенности
            </InfoTitle>
            <InfoRow>
              <Text size="3" color="gray">
                Кондиционер:
              </Text>
              <Text size="3" weight="medium">
                {formatAirConditioning(airconditioning)}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Парковка:
              </Text>
              <Text size="3" weight="medium">
                {formatParking(parking)}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Мебель:
              </Text>
              <Text size="3" weight="medium">
                {formatFurniture(furniture)}
              </Text>
            </InfoRow>
            {furnitureDescription && (
              <InfoRow>
                <Text size="3" color="gray">
                  Описание мебели:
                </Text>
                <Text size="3" weight="medium" style={{ whiteSpace: "pre-wrap" }}>
                  {furnitureDescription}
                </Text>
              </InfoRow>
            )}
            {additionalFeatures && additionalFeatures.length > 0 && (
              <InfoRow>
                <Text size="3" color="gray">
                  Дополнительные особенности:
                </Text>
                <Flex gap="2" wrap="wrap" mt="2">
                  {additionalFeatures.map((value) => (
                    <Badge
                      key={value}
                      size="2"
                      color="blue"
                      variant="soft"
                    >
                      {ADDITIONAL_FEATURES_LABELS[value] ?? `#${value}`}
                    </Badge>
                  ))}
                </Flex>
              </InfoRow>
            )}
          </InfoSection>

          {/* Financial Information */}
          <InfoSection>
            <InfoTitle size="5">
              <RulerHorizontalIcon width="20" height="20" />
              Финансовые условия
            </InfoTitle>
            <InfoRow>
              <Text size="3" color="gray">
                Цена:
              </Text>
              <Text size="4" weight="bold" color="red">
                {formatPrice(price)}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Количество платежей в год:
              </Text>
              <Text size="3" weight="medium">
                {annualPayments}
              </Text>
            </InfoRow>
            {propertyTax && (
              <InfoRow>
                <Text size="3" color="gray">
                  Налог на недвижимость за два месяца:
                </Text>
                <Text size="3" weight="medium">
                  {formatPrice(propertyTax)}
                </Text>
              </InfoRow>
            )}
          </InfoSection>

          {/* Entry Date */}
          <InfoSection>
            <InfoTitle size="5">
              <CalendarIcon width="20" height="20" />
              Дата въезда
            </InfoTitle>
            <InfoRow>
              <Text size="3" color="gray">
                Тип въезда:
              </Text>
              <Text size="3" weight="medium">
                {formatEntryDate(entryDate)}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Дата:
              </Text>
              <Text size="3" weight="medium">
                {formatDate(year, month, day)}
              </Text>
            </InfoRow>
          </InfoSection>

          {/* Location */}
          <InfoSection>
            <InfoTitle size="5">
              <LayersIcon width="20" height="20" />
              Местоположение
            </InfoTitle>
            <InfoRow>
              <Text size="3" color="gray">
                Район:
              </Text>
              <Text size="3" weight="medium">
                {district}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                Город:
              </Text>
              <Text size="3" weight="medium">
                {cityInfo?.nameRussian || city}
              </Text>
            </InfoRow>
            {streetname && (
              <InfoRow>
                <Text size="3" color="gray">
                  Улица:
                </Text>
                <Text size="3" weight="medium">
                  {streetname}
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
          </ContactSection>

          {/* Meta Information */}
          <MetaInfo>
            <MetaItem>
              <CalendarIcon width="16" height="16" />
              <Text size="2">Опубликовано: {formatCreatedDate(createdAt)}</Text>
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

export default RealEstateForRentDetailClient;
