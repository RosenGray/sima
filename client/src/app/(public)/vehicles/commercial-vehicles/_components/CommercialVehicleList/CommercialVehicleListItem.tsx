"use client";
import React from "react";
import Image from "next/image";
import {
  CommercialVehicleListItemBox,
  CommercialVehicleListItemCard,
  CommercialVehicleListItemImageSection,
  CommercialVehicleListItemImageContainer,
  CommercialVehicleListItemDetails,
  CommercialVehicleListItemLikeWrapper,
  CommercialVehicleListItemBadges,
} from "./CommercialVehicleListItem.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_COMMERCIAL_VEHICLES } from "@/lib/constants/entityTypes";
import { SerializedCommercialVehicle } from "@/lib/vehicles/commercial-vehicles/types/commercialVehicle.types";
import { TransmissionType } from "@/lib/vehicles/cars/types/cars.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface CommercialVehicleListItemProps {
  commercialVehicle: SerializedCommercialVehicle;
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

const CommercialVehicleListItem: React.FC<CommercialVehicleListItemProps> = ({
  commercialVehicle,
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
  } = commercialVehicle;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";
  const firstImage = images[0];

  return (
    <CommercialVehicleListItemBox id={publicId}>
      <CommercialVehicleListItemCard variant="surface">
        <CommercialVehicleListItemImageSection>
          <CommercialVehicleListItemImageContainer>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 280px"
              />
            ) : null}
          </CommercialVehicleListItemImageContainer>
        </CommercialVehicleListItemImageSection>
        <CommercialVehicleListItemDetails>
          <CommercialVehicleListItemLikeWrapper>
            <LikeButton
              entityType={ENTITY_TYPE_COMMERCIAL_VEHICLES}
              publicId={publicId}
              size={18}
              stopPropagation
            />
          </CommercialVehicleListItemLikeWrapper>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
          <CommercialVehicleListItemBadges>
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
          </CommercialVehicleListItemBadges>
        </CommercialVehicleListItemDetails>
      </CommercialVehicleListItemCard>
    </CommercialVehicleListItemBox>
  );
};

export default CommercialVehicleListItem;
