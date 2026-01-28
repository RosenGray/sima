"use client";
import React from "react";
import Image from "next/image";
import {
  PetForFreeCardBox,
  PetForFreeCardStyled,
  PetForFreeCardFooter,
  PetForFreeCardHeader,
  PetForFreeCardImages,
  PetForFreeCardImageContainer,
  PetForFreeCardSwiper,
  PetForFreeCardSwiperSlide,
  PetForFreeCardContent,
} from "./PetForFreeCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedPetForFree } from "@/lib/pets/for-free/types/petForFree.types";
import { PetGender, PetAge } from "@/lib/pets/for-sale/types/petForSale.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getAnimalById, getAnimalKindById } from "@/lib/pets/animals";

interface PetForFreeCardProps {
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

const PetForFreeCard: React.FC<PetForFreeCardProps> = ({ pet }) => {
  const {
    images,
    publicId,
    district,
    city,
    animal,
    kind,
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
    <PetForFreeCardBox id={publicId}>
      <PetForFreeCardStyled variant="surface">
        <PetForFreeCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </PetForFreeCardHeader>
        <PetForFreeCardImages>
          {images.length === 1 ? (
            <PetForFreeCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </PetForFreeCardImageContainer>
          ) : (
            <PetForFreeCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <PetForFreeCardSwiperSlide key={image.uniqueName}>
                  <PetForFreeCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </PetForFreeCardImageContainer>
                </PetForFreeCardSwiperSlide>
              ))}
            </PetForFreeCardSwiper>
          )}
        </PetForFreeCardImages>
        <PetForFreeCardContent>
          <Heading size="4" weight="medium">
            {animalName} {kindName}
          </Heading>
          <Text size="2" color="gray">
            {formatGender(gender)} • {formatAge(age)}
          </Text>
          <Text size="6" weight="bold" color="green">
            Бесплатно
          </Text>
        </PetForFreeCardContent>
        <PetForFreeCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {formatGender(gender)}
          </Badge>
          <Badge size="1" color="gray" variant="soft">
            {formatAge(age)}
          </Badge>
        </PetForFreeCardFooter>
      </PetForFreeCardStyled>
    </PetForFreeCardBox>
  );
};

export default PetForFreeCard;
