"use client";
import React from "react";
import Image from "next/image";
import {
  PetAccessoryCardBox,
  PetAccessoryCardStyled,
  PetAccessoryCardFooter,
  PetAccessoryCardHeader,
  PetAccessoryCardImages,
  PetAccessoryCardImageContainer,
  PetAccessoryCardSwiper,
  PetAccessoryCardSwiperSlide,
  PetAccessoryCardContent,
  LikeButtonWrapper,
} from "./PetAccessoryCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_PETS_ACCESSORIES } from "@/lib/constants/entityTypes";
import { Autoplay } from "swiper/modules";
import { SerializedPetAccessory } from "@/lib/pets/accessories/types/petAccessory.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getAnimalById, getAnimalKindById } from "@/lib/pets/accessories/animals";

interface PetAccessoryCardProps {
  accessory: SerializedPetAccessory;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const PetAccessoryCard: React.FC<PetAccessoryCardProps> = ({ accessory }) => {
  const {
    images,
    publicId,
    district,
    city,
    animal,
    kind,
    title,
    price,
  } = accessory;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  const animalData = getAnimalById(animal);
  const animalName = animalData?.russianName || "";
  const kindData = animalData ? getAnimalKindById(kind, animal) : null;
  const kindName = kindData?.russianName || "";

  return (
    <PetAccessoryCardBox id={publicId}>
      <PetAccessoryCardStyled variant="surface">
        <LikeButtonWrapper>
          <LikeButton
            entityType={ENTITY_TYPE_PETS_ACCESSORIES}
            publicId={publicId}
            size={18}
            stopPropagation
          />
        </LikeButtonWrapper>
        <PetAccessoryCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </PetAccessoryCardHeader>
        <PetAccessoryCardImages>
          {images.length === 1 ? (
            <PetAccessoryCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </PetAccessoryCardImageContainer>
          ) : (
            <PetAccessoryCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <PetAccessoryCardSwiperSlide key={image.uniqueName}>
                  <PetAccessoryCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </PetAccessoryCardImageContainer>
                </PetAccessoryCardSwiperSlide>
              ))}
            </PetAccessoryCardSwiper>
          )}
        </PetAccessoryCardImages>
        <PetAccessoryCardContent>
          <Heading size="4" weight="medium">
            {title}
          </Heading>
          <Text size="2" color="gray">
            {animalName} {kindName}
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </PetAccessoryCardContent>
        <PetAccessoryCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {animalName}
          </Badge>
          <Badge size="1" color="gray" variant="soft">
            {kindName}
          </Badge>
        </PetAccessoryCardFooter>
      </PetAccessoryCardStyled>
    </PetAccessoryCardBox>
  );
};

export default PetAccessoryCard;
