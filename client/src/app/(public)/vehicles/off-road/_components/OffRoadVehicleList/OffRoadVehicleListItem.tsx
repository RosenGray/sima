"use client";
import React from "react";
import Image from "next/image";
import {
  OffRoadVehicleListItemBox,
  OffRoadVehicleListItemCard,
  OffRoadVehicleListItemImageSection,
  OffRoadVehicleListItemImageContainer,
  OffRoadVehicleListItemDetails,
  OffRoadVehicleListItemLikeWrapper,
  OffRoadVehicleListItemBadges,
} from "./OffRoadVehicleListItem.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_OFF_ROAD } from "@/lib/constants/entityTypes";
import { SerializedOffRoadVehicle } from "@/lib/vehicles/off-road/types/offRoadVehicle.types";
import { TransmissionType } from "@/lib/vehicles/cars/types/cars.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface OffRoadVehicleListItemProps {
  offRoadVehicle: SerializedOffRoadVehicle;
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

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const OffRoadVehicleListItem: React.FC<OffRoadVehicleListItemProps> = ({
  offRoadVehicle,
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
    transmission,
    mileage,
    numberOfDoors,
  } = offRoadVehicle;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";
  const firstImage = images[0];

  return (
    <OffRoadVehicleListItemBox id={publicId}>
      <OffRoadVehicleListItemCard variant="surface">
        <OffRoadVehicleListItemImageSection>
          <OffRoadVehicleListItemImageContainer>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 280px"
              />
            ) : null}
          </OffRoadVehicleListItemImageContainer>
        </OffRoadVehicleListItemImageSection>
        <OffRoadVehicleListItemDetails>
          <OffRoadVehicleListItemLikeWrapper>
            <LikeButton
              entityType={ENTITY_TYPE_OFF_ROAD}
              publicId={publicId}
              size={18}
              stopPropagation
            />
          </OffRoadVehicleListItemLikeWrapper>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
          <OffRoadVehicleListItemBadges>
            {locationName && (
              <Badge size="2" color="blue" variant="soft">
                {locationName}
              </Badge>
            )}
            <Badge size="1" color="gray" variant="soft">
              {formatTransmissionType(transmission)}
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
          </OffRoadVehicleListItemBadges>
        </OffRoadVehicleListItemDetails>
      </OffRoadVehicleListItemCard>
    </OffRoadVehicleListItemBox>
  );
};

export default OffRoadVehicleListItem;
