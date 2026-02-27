"use client";
import React from "react";
import Image from "next/image";
import {
  MotorcycleListItemBox,
  MotorcycleListItemCard,
  MotorcycleListItemImageSection,
  MotorcycleListItemImageContainer,
  MotorcycleListItemDetails,
  MotorcycleListItemLikeWrapper,
  MotorcycleListItemBadges,
} from "./MotorcycleListItem.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_MOTORCYCLES } from "@/lib/constants/entityTypes";
import { SerializedMotorcycle, MotorcycleKind } from "@/lib/vehicles/motorcycles/types/motorcycle.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface MotorcycleListItemProps {
  motorcycle: SerializedMotorcycle;
}

const formatKindType = (kind: MotorcycleKind): string => {
  switch (kind) {
    case MotorcycleKind.MOTOCROSS:
      return "Мотокросс";
    case MotorcycleKind.DUAL_PURPOSE:
      return "Двойного назначения";
    case MotorcycleKind.SPORT_ROAD:
      return "Спорт / дорога";
    case MotorcycleKind.OTHER:
      return "Другой";
    default:
      return kind;
  }
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const MotorcycleListItem: React.FC<MotorcycleListItemProps> = ({
  motorcycle,
}) => {
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
    kind,
    mileage,
  } = motorcycle;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";
  const firstImage = images[0];

  return (
    <MotorcycleListItemBox id={publicId}>
      <MotorcycleListItemCard variant="surface">
        <MotorcycleListItemImageSection>
          <MotorcycleListItemImageContainer>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 280px"
              />
            ) : null}
          </MotorcycleListItemImageContainer>
        </MotorcycleListItemImageSection>
        <MotorcycleListItemDetails>
          <MotorcycleListItemLikeWrapper>
            <LikeButton
              entityType={ENTITY_TYPE_MOTORCYCLES}
              publicId={publicId}
              size={18}
              stopPropagation
            />
          </MotorcycleListItemLikeWrapper>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
          <MotorcycleListItemBadges>
            {locationName && (
              <Badge size="2" color="blue" variant="soft">
                {locationName}
              </Badge>
            )}
            <Badge size="1" color="gray" variant="soft">
              {formatKindType(kind)}
            </Badge>
            {mileage != null && (
              <Badge size="1" color="gray" variant="soft">
                {new Intl.NumberFormat("ru-RU").format(mileage)} км
              </Badge>
            )}
          </MotorcycleListItemBadges>
        </MotorcycleListItemDetails>
      </MotorcycleListItemCard>
    </MotorcycleListItemBox>
  );
};

export default MotorcycleListItem;
