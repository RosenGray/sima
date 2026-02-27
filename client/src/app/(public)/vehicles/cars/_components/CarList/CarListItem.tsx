"use client";
import React from "react";
import Image from "next/image";
import {
  CarListItemBox,
  CarListItemCard,
  CarListItemImageSection,
  CarListItemImageContainer,
  CarListItemDetails,
  CarListItemLikeWrapper,
  CarListItemBadges,
} from "./CarListItem.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_CARS } from "@/lib/constants/entityTypes";
import { SerializedCar } from "@/lib/vehicles/cars/types/cars.types";
import { TransmissionType, EngineType } from "@/lib/vehicles/cars/types/cars.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface CarListItemProps {
  car: SerializedCar;
}

const formatTransmissionType = (type: TransmissionType): string => {
  switch (type) {
    case TransmissionType.MANUAL:
      return "Механическая";
    case TransmissionType.AUTOMATIC:
      return "Автоматическая";
    case TransmissionType.TIPTRONIC:
      return "Типтроник";
    case TransmissionType.ROBOTIC:
      return "Роботизированная";
    default:
      return type;
  }
};

const formatEngineType = (type: EngineType): string => {
  switch (type) {
    case EngineType.GASOLINE:
      return "Бензин";
    case EngineType.DIESEL:
      return "Дизель";
    case EngineType.TURBO_DIESEL:
      return "Турбодизель";
    case EngineType.HYBRID:
      return "Гибрид";
    case EngineType.ELECTRIC:
      return "Электрический";
    default:
      return type;
  }
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const CarListItem: React.FC<CarListItemProps> = ({ car }) => {
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
    transmission,
    engineType,
    mileage,
    numberOfDoors,
  } = car;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";
  const firstImage = images[0];

  return (
    <CarListItemBox id={publicId}>
      <CarListItemCard variant="surface">
        <CarListItemImageSection>
          <CarListItemImageContainer>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 280px"
              />
            ) : null}
          </CarListItemImageContainer>
        </CarListItemImageSection>
        <CarListItemDetails>
          <CarListItemLikeWrapper>
            <LikeButton
              entityType={ENTITY_TYPE_CARS}
              publicId={publicId}
              size={18}
              stopPropagation
            />
          </CarListItemLikeWrapper>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
          <CarListItemBadges>
            {locationName && (
              <Badge size="2" color="blue" variant="soft">
                {locationName}
              </Badge>
            )}
            <Badge size="1" color="gray" variant="soft">
              {formatTransmissionType(transmission)}
            </Badge>
            <Badge size="1" color="gray" variant="soft">
              {formatEngineType(engineType)}
            </Badge>
            {mileage != null && (
              <Badge size="1" color="gray" variant="soft">
                {new Intl.NumberFormat("ru-RU").format(mileage)} км
              </Badge>
            )}
            {numberOfDoors != null && (
              <Badge size="1" color="gray" variant="soft">
                {numberOfDoors} дверей
              </Badge>
            )}
          </CarListItemBadges>
        </CarListItemDetails>
      </CarListItemCard>
    </CarListItemBox>
  );
};

export default CarListItem;
