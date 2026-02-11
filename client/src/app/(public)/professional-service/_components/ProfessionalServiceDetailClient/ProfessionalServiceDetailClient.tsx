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
import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import ImageModal from "../../../../../components/modals/ImageModal/ImageModal";

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
} from "./ProfessionalServiceDetailClient.styles";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_PROFESSIONAL_SERVICE } from "@/lib/constants/entityTypes";
import { deleteProfessionalServiceAdWithRedirect } from "@/lib/professionals/professional-service/actions/deleteProfessionalServiceAd";
import ErrorModal from "@/components/modals/ErrorModal/ErrorModal";
import DeleteConfirmationModalWithServerAction from "@/components/modals/DeleteConfirmationModalWithServerAction/DeleteConfirmationModalWithServerAction";
import { getOrCreateChat } from "@/lib/chat/actions/getOrCreateChat";

interface ProfessionalServiceDetailClientProps {
  service: SerilizeProfessionalService;
}

const ProfessionalServiceDetailClient: React.FC<
  ProfessionalServiceDetailClientProps
> = ({ service }) => {
  const deleteProfessionalServiceAdByPublicId =
    deleteProfessionalServiceAdWithRedirect.bind(null, service.publicId);

  const [formState, formAction, isPending] = useActionState(
    deleteProfessionalServiceAdByPublicId,
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

  const isOwner = thisUserIsOwner(service.user.id);

  const handleContactProvider = async () => {
    if (chatLoading || !isAuthenticated || isOwner) return;
    setChatLoading(true);
    setChatError(null);
    const result = await getOrCreateChat("professional-service", service.publicId);

    if (result.success && result.chatId) {
      router.push(`/chat/${result.chatId}`);
    } else if (!result.success && result.error) {
      setChatError(result.error);
      setChatLoading(false);
      setErrorModalOpen(true);
    }
  };

  const renderChatButton = () => {
    if (isAuthenticated && !isOwner) {
      return (
        <Button
          size="3"
          variant="soft"
          disabled={chatLoading}
          onClick={handleContactProvider}
        >
          {chatLoading ? (
            <Spinner size="3" />
          ) : (
            <ChatBubbleIcon width="18" height="18" />
          )}
          Написать исполнителю
        </Button>
      );
    }
  };

  const {
    images,
    publicId,
    district,
    city,
    description,
    user,
    category,
    subCategory,
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
            {subCategory.russianDisplayName}
          </PageTitle>
          <LikeButton
            entityType={ENTITY_TYPE_PROFESSIONAL_SERVICE}
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
                href={`/publish-ad/professional-service/edit/${publicId}`}
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
        <Badge size="2" color="blue" variant="soft">
          {category.russianDisplayName}
        </Badge>
        <Badge size="2" color="purple" variant="soft">
          {subCategory.russianDisplayName}
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
          {images.length === 1 ? (
            <Image
              src={images[0].url}
              alt={images[0].originalName}
              fill
              style={{ objectFit: "cover" }}
            />
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
              <Text size="3">*** ***********</Text>
            </ContactItem>

            <ContactItem>
              {isAuthenticated && !isOwner
                ? renderChatButton()
                : !isAuthenticated && (
                    <Text size="2" color="gray">
                      Войдите, чтобы написать исполнителю
                    </Text>
                  )}
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
      <ErrorModal
        open={errorModalOpen}
        onOpenChange={handleModalClose}
        errorMessage={
          chatError ??
          (formState as { error?: string } | undefined)?.error
        }
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

export default ProfessionalServiceDetailClient;
