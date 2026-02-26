"use client";
import React from "react";
import Image from "next/image";
import {
  PetForFreeListItemBox,
  PetForFreeListItemCard,
  PetForFreeListItemImageSection,
  PetForFreeListItemImageContainer,
  PetForFreeListItemDetails,
  PetForFreeListItemLikeWrapper,
  PetForFreeListItemBadges,
} from "./PetForFreeListItem.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { SerializedPetForFree } from "@/lib/pets/for-free/types/petForFree.types";
import { PetGender, PetAge } from "@/lib/pets/for-sale/types/petForSale.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getAnimalById, getAnimalKindById } from "@/lib/pets/for-free/animals";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_PETS_FOR_FREE } from "@/lib/constants/entityTypes";

interface PetForFreeListItemProps {
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

const PetForFreeListItem: React.FC<PetForFreeListItemProps> = ({ pet }) => {
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

  const firstImage = images[0];

  return (
    <PetForFreeListItemBox id={publicId}>
      <PetForFreeListItemCard variant="surface">
        <PetForFreeListItemImageSection>
          <PetForFreeListItemImageContainer>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 280px"
              />
            ) : null}
          </PetForFreeListItemImageContainer>
        </PetForFreeListItemImageSection>
        <PetForFreeListItemDetails>
          <PetForFreeListItemLikeWrapper>
            <LikeButton
              entityType={ENTITY_TYPE_PETS_FOR_FREE}
              publicId={publicId}
              size={18}
              stopPropagation
            />
          </PetForFreeListItemLikeWrapper>
          <Heading size="4" weight="medium">
            {animalName} {kindName}
          </Heading>
          <Text size="2" color="gray">
            {formatGender(gender)} • {formatAge(age)}
          </Text>
          <Text size="6" weight="bold" color="green">
            Бесплатно
          </Text>
          <PetForFreeListItemBadges>
            {locationName && (
              <Badge size="2" color="blue" variant="soft">
                {locationName}
              </Badge>
            )}
            <Badge size="1" color="gray" variant="soft">
              {formatGender(gender)}
            </Badge>
            <Badge size="1" color="gray" variant="soft">
              {formatAge(age)}
            </Badge>
          </PetForFreeListItemBadges>
        </PetForFreeListItemDetails>
      </PetForFreeListItemCard>
    </PetForFreeListItemBox>
  );
};

export default PetForFreeListItem;
