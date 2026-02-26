"use client";
import React from "react";
import Image from "next/image";
import {
  ScooterListItemBox,
  ScooterListItemCard,
  ScooterListItemImageSection,
  ScooterListItemImageContainer,
  ScooterListItemDetails,
  ScooterListItemLikeWrapper,
  ScooterListItemBadges,
} from "./ScooterListItem.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_SCOOTERS } from "@/lib/constants/entityTypes";
import { SerializedScooter } from "@/lib/vehicles/scooters/types/scooter.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface ScooterListItemProps {
  scooter: SerializedScooter;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const ScooterListItem: React.FC<ScooterListItemProps> = ({ scooter }) => {
  const {
    images,
    publicId,
    district,
    city,
    manufacturer,
    model,
    yearOfManufacture,
    numberOfHand,
    engineCapacity,
    mileage,
    price,
  } = scooter;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";
  const firstImage = images[0];

  return (
    <ScooterListItemBox id={publicId}>
      <ScooterListItemCard variant="surface">
        <ScooterListItemImageSection>
          <ScooterListItemImageContainer>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 280px"
              />
            ) : null}
          </ScooterListItemImageContainer>
        </ScooterListItemImageSection>
        <ScooterListItemDetails>
          <ScooterListItemLikeWrapper>
            <LikeButton
              entityType={ENTITY_TYPE_SCOOTERS}
              publicId={publicId}
              size={18}
              stopPropagation
            />
          </ScooterListItemLikeWrapper>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
          <ScooterListItemBadges>
            {locationName && (
              <Badge size="2" color="blue" variant="soft">
                {locationName}
              </Badge>
            )}
            {engineCapacity != null && (
              <Badge size="1" color="gray" variant="soft">
                {engineCapacity} куб.см
              </Badge>
            )}
            {mileage != null && (
              <Badge size="1" color="gray" variant="soft">
                {new Intl.NumberFormat("ru-RU").format(mileage)} км
              </Badge>
            )}
          </ScooterListItemBadges>
        </ScooterListItemDetails>
      </ScooterListItemCard>
    </ScooterListItemBox>
  );
};

export default ScooterListItem;
