"use client";
import React, { useActionState, useCallback, useEffect, useState } from "react";
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
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { SerializedPetAccessory } from "@/lib/pets/accessories/types/petAccessory.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getAnimalById, getAnimalKindById } from "@/lib/pets/accessories/animals";
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
} from "./PetAccessoryDetailClient.styles";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import {
  deletePetAccessoryAdWithRedirect,
} from "@/lib/pets/accessories/actions/deletePetAccessoryAd";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import DeleteConfirmationModalWithServerAction from "@/components/modals/DeleteConfirmationModalWithServerAction/DeleteConfirmationModalWithServerAction";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_PETS_ACCESSORIES } from "@/providers/LikesProvider/LikesProvider";
import { getOrCreateChat } from "@/lib/chat/actions/getOrCreateChat";

interface PetAccessoryDetailClientProps {
  accessory: SerializedPetAccessory;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const PetAccessoryDetailClient: React.FC<PetAccessoryDetailClientProps> = ({
  accessory,
}) => {
  const router = useRouter();
  const deleteAccessoryAdByPublicId = deletePetAccessoryAdWithRedirect.bind(
    null,
    accessory.publicId
  );

  const [formState, formAction, isPending] = useActionState(
    deleteAccessoryAdByPublicId,
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

  const isOwner = thisUserIsOwner(accessory.user.id);

  const handleContactSeller = useCallback(async () => {
    if (chatLoading || !isAuthenticated || isOwner) return;
    setChatLoading(true);
    setChatError(null);
    const result = await getOrCreateChat("pets-accessories", accessory.publicId);
    if (result.success) {
      router.push(`/chat/${result.chatId}`);
    } else {
      setChatError(result.error ?? null);
      setErrorModalOpen(true);
    }
    setChatLoading(false);
  }, [accessory.publicId, chatLoading, isAuthenticated, isOwner, router]);

  const renderChatButton = () => {
    if (isAuthenticated && !isOwner) {
      return (
        <Button size="3" variant="soft" disabled={chatLoading} onClick={handleContactSeller}>
          {chatLoading ? <Spinner size="3" /> : <ChatBubbleIcon width="18" height="18" />}
          Написать продавцу
        </Button>
      );
    }
  };

  const {
    images,
    publicId,
    district,
    city,
    animal,
    kind,
    title,
    price,
    description,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    createdAt,
  } = accessory;

  const cityInfo = getCityById(city, district as Districts);

  const animalData = getAnimalById(animal);
  const animalName = animalData?.russianName || "";
  const kindData = animalData ? getAnimalKindById(kind, animal) : null;
  const kindName = kindData?.russianName || "";

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
    setChatError(null);
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
            {title}
          </PageTitle>
          <LikeButton
            entityType={ENTITY_TYPE_PETS_ACCESSORIES}
            publicId={publicId}
            size={20}
            stopPropagation={false}
          />
          {renderChatButton()}
        </Flex>
        {isOwner && (
          <ButtonGroup>
            <Button disabled={isPending} asChild size="3" variant="soft">
              <Link
                color="yellow"
                href={`/publish-ad/pets/accessories/edit/${publicId}`}
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
        <Badge size="2" color="blue" variant="soft">
          {animalName} {kindName}
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
          {/* Basic Accessory Information */}
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
              <Text size="3" color="gray">
                {animalName} {kindName}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="6" weight="bold" color="red">
                {formatPrice(price)}
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
              <PersonIcon width="18" height="18" />
              <Text size="3" weight="medium">
                {contactName}
              </Text>
            </ContactItem>

            <ContactItem>
              <EnvelopeClosedIcon width="18" height="18" />
              <Text size="3">*** ***********</Text>
            </ContactItem>

            <ContactItem>
              {renderChatButton()}
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
        errorMessage={chatError ?? formState?.error}
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

export default PetAccessoryDetailClient;
