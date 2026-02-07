"use client";
import React from "react";
import Image from "next/image";
import {
  PetForSaleCardBox,
  PetForSaleCardStyled,
  PetForSaleCardFooter,
  PetForSaleCardHeader,
  PetForSaleCardImages,
  PetForSaleCardImageContainer,
  PetForSaleCardSwiper,
  PetForSaleCardSwiperSlide,
  PetForSaleCardContent,
  LikeButtonWrapper,
} from "./PetForSaleCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedPetForSale } from "@/lib/pets/for-sale/types/petForSale.types";
import { PetGender, PetAge } from "@/lib/pets/for-sale/types/petForSale.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getAnimalById, getAnimalKindById } from "@/lib/pets/for-sale/animals";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_PETS_FOR_SALE } from "@/providers/LikesProvider/LikesProvider";

interface PetForSaleCardProps {
  pet: SerializedPetForSale;
}

// Helper function to format gender
const formatGender = (gender: PetGender): string => {
  return gender === PetGender.MALE ? "Мальчик" : "Девочка";
};

// Helper function to format age
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

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const PetForSaleCard: React.FC<PetForSaleCardProps> = ({ pet }) => {
  const {
    images,
    publicId,
    district,
    city,
    animal,
    kind,
    price,
    gender,
    age,
  } = pet;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  const animalData = getAnimalById(animal);
  const animalName = animalData?.russianName || "";
  const kindData = animalData ? getAnimalKindById(kind, animal) : null;
  const kindName = kindData?.russianName || "";

  return (
    <PetForSaleCardBox id={publicId}>
      <PetForSaleCardStyled variant="surface">
        <LikeButtonWrapper>
          <LikeButton
            entityType={ENTITY_TYPE_PETS_FOR_SALE}
            publicId={publicId}
            size={18}
            stopPropagation
          />
        </LikeButtonWrapper>
        <PetForSaleCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </PetForSaleCardHeader>
        <PetForSaleCardImages>
          {images.length === 1 ? (
            <PetForSaleCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </PetForSaleCardImageContainer>
          ) : (
            <PetForSaleCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <PetForSaleCardSwiperSlide key={image.uniqueName}>
                  <PetForSaleCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </PetForSaleCardImageContainer>
                </PetForSaleCardSwiperSlide>
              ))}
            </PetForSaleCardSwiper>
          )}
        </PetForSaleCardImages>
        <PetForSaleCardContent>
          <Heading size="4" weight="medium">
            {animalName} {kindName}
          </Heading>
          <Text size="2" color="gray">
            {formatGender(gender)} • {formatAge(age)}
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </PetForSaleCardContent>
        <PetForSaleCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {formatGender(gender)}
          </Badge>
          <Badge size="1" color="gray" variant="soft">
            {formatAge(age)}
          </Badge>
        </PetForSaleCardFooter>
      </PetForSaleCardStyled>
    </PetForSaleCardBox>
  );
};

export default PetForSaleCard;
