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
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { SerializedPetForFree } from "@/lib/pets/for-free/types/petForFree.types";
import { PetGender, PetAge, PetAdjustments } from "@/lib/pets/for-sale/types/petForSale.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getAnimalById, getAnimalKindById } from "@/lib/pets/for-free/animals";
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
} from "./PetForFreeDetailClient.styles";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { deletePetForFreeAdWithRedirect } from "@/lib/pets/for-free/actions/deletePetForFreeAd";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import DeleteConfirmationModalWithServerAction from "@/components/modals/DeleteConfirmationModalWithServerAction/DeleteConfirmationModalWithServerAction";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_PETS_FOR_FREE } from "@/lib/constants/entityTypes";
import { getOrCreateChat } from "@/lib/chat/actions/getOrCreateChat";

interface PetForFreeDetailClientProps {
  pet: SerializedPetForFree;
}

const formatGender = (gender: PetGender): string => {
  return gender === PetGender.MALE ? "Мальчик" : "Девочка";
};

const formatAge = (age: PetAge): string => {
  switch (age) {
    case PetAge.PUPPY:
      return "Щенок";
    case PetAge.YOUNG:
      return "Молодой";
    case PetAge.ADULT:
      return "Взрослый";
    case PetAge.GROWN:
      return "Старший";
    default:
      return "";
  }
};

const ADJUSTMENT_LABELS: Record<number, string> = {
  [PetAdjustments.Spayed]: "Стерилизована",
  [PetAdjustments.Neutered]: "Кастрирован",
  [PetAdjustments.Vaccinated]: "Привит(а)",
  [PetAdjustments.Trained]: "Дрессирован(а)",
  [PetAdjustments.KidsFriendly]: "Дружелюбен к детям",
  [PetAdjustments.YardSuitable]: "Подходит для двора",
  [PetAdjustments.DogsFriendly]: "Дружелюбен к собакам",
  [PetAdjustments.ApartmentSuitable]: "Подходит для квартиры",
  [PetAdjustments.AdultsFriendly]: "Подходит для взрослых",
};

const PetForFreeDetailClient: React.FC<PetForFreeDetailClientProps> = ({
  pet,
}) => {
  const deletePetAdByPublicId = deletePetForFreeAdWithRedirect.bind(
    null,
    pet.publicId
  );

  const [formState, formAction, isPending] = useActionState(
    deletePetAdByPublicId,
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

  const isOwner = thisUserIsOwner(pet.user.id);

  const handleContactOwner = async () => {
    if (chatLoading || !isAuthenticated || isOwner) return;
    setChatLoading(true);
    setChatError(null);
    try {
      const result = await getOrCreateChat(ENTITY_TYPE_PETS_FOR_FREE, pet.publicId);
      if (result.success && result.chatId) {
        router.push(`/chat/${result.chatId}`);
      } else if (!result.success && result.error) {
        setChatError(result.error);
        setErrorModalOpen(true);
      }
    } finally {
      setChatLoading(false);
    }
  };

  const {
    images,
    publicId,
    district,
    city,
    animal,
    kind,
    gender,
    age,
    adjustments,
    description,
    contactName,
    contactPrimaryPhone,
    contactSecondaryPhone,
    createdAt,
  } = pet;

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

  const renderChatButton = () => {
    if (isAuthenticated && !isOwner) {
      return (
        <Button size="3" variant="soft" disabled={chatLoading} onClick={handleContactOwner}>
          {chatLoading ? <Spinner size="3" /> : <ChatBubbleIcon width="18" height="18" />}
          Написать отдающему
        </Button>
      );
    }
  };

  useEffect(() => {
    if (formState && !formState.success && formState.error) {
      setErrorModalOpen(true);
    }
  }, [formState]);

  return (
    <PageContainer size="4">
      <HeaderSection>
        <Flex align="center" gap="3" wrap="wrap" style={{ flex: 1, minWidth: 0 }}>
          <PageTitle size="8" weight="bold">
            {animalName} {kindName}
          </PageTitle>
          <LikeButton
            entityType={ENTITY_TYPE_PETS_FOR_FREE}
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
                href={`/publish-ad/pets/for-free/edit/${publicId}`}
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

        <InfoCard>
          <InfoSection>
            <InfoTitle size="5">
              <IdCardIcon width="20" height="20" />
              Информация о питомце
            </InfoTitle>
            <InfoRow>
              <Text size="3" weight="bold">
                {animalName} {kindName}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="3" color="gray">
                {formatGender(gender)} • {formatAge(age)}
              </Text>
            </InfoRow>
            <InfoRow>
              <Text size="6" weight="bold" color="green">
                Бесплатно
              </Text>
            </InfoRow>
            {adjustments && adjustments.length > 0 && (
              <InfoRow>
                <Flex gap="2" wrap="wrap">
                  {adjustments.map((value) => (
                    <Badge key={value} size="2" color="blue" variant="soft">
                      {ADJUSTMENT_LABELS[value] ?? `#${value}`}
                    </Badge>
                  ))}
                </Flex>
              </InfoRow>
            )}
          </InfoSection>

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

          <MetaInfo>
            <MetaItem>
              <CalendarIcon width="16" height="16" />
              <Text size="2">Опубликовано: {formatDate(createdAt)}</Text>
            </MetaItem>
          </MetaInfo>
        </InfoCard>
      </ContentGrid>

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

export default PetForFreeDetailClient;
