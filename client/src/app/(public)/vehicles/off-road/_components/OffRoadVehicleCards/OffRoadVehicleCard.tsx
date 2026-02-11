"use client";
import React from "react";
import Image from "next/image";
import {
  OffRoadVehicleCardBox,
  OffRoadVehicleCardStyled,
  OffRoadVehicleCardFooter,
  OffRoadVehicleCardHeader,
  OffRoadVehicleCardImages,
  OffRoadVehicleCardImageContainer,
  OffRoadVehicleCardSwiper,
  OffRoadVehicleCardSwiperSlide,
  OffRoadVehicleCardContent,
  LikeButtonWrapper,
} from "./OffRoadVehicleCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_OFF_ROAD } from "@/lib/constants/entityTypes";
import { Autoplay } from "swiper/modules";
import { SerializedOffRoadVehicle } from "@/lib/vehicles/off-road/types/offRoadVehicle.types";
import { TransmissionType } from "@/lib/vehicles/cars/types/cars.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface OffRoadVehicleCardProps {
  offRoadVehicle: SerializedOffRoadVehicle;
}

// Helper function to format transmission type
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

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const OffRoadVehicleCard: React.FC<OffRoadVehicleCardProps> = ({ offRoadVehicle }) => {
  const { images, publicId, district, city, manufacturer, model, yearOfManufacture, numberOfHand, price, transmission, mileage, numberOfDoors } = offRoadVehicle;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  return (
    <OffRoadVehicleCardBox id={publicId}>
      <OffRoadVehicleCardStyled variant="surface">
        <LikeButtonWrapper>
          <LikeButton
            entityType={ENTITY_TYPE_OFF_ROAD}
            publicId={publicId}
            size={18}
            stopPropagation
          />
        </LikeButtonWrapper>
        <OffRoadVehicleCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </OffRoadVehicleCardHeader>
        <OffRoadVehicleCardImages>
          {images.length === 1 ? (
            <OffRoadVehicleCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </OffRoadVehicleCardImageContainer>
          ) : (
            <OffRoadVehicleCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <OffRoadVehicleCardSwiperSlide key={image.uniqueName}>
                  <OffRoadVehicleCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </OffRoadVehicleCardImageContainer>
                </OffRoadVehicleCardSwiperSlide>
              ))}
            </OffRoadVehicleCardSwiper>
          )}
        </OffRoadVehicleCardImages>
        <OffRoadVehicleCardContent>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </OffRoadVehicleCardContent>
        <OffRoadVehicleCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {formatTransmissionType(transmission)}
          </Badge>
          {mileage && (
            <Badge size="1" color="gray" variant="soft">
              {new Intl.NumberFormat("ru-RU").format(mileage)} км
            </Badge>
          )}
          {numberOfDoors && (
            <Badge size="1" color="gray" variant="soft">
              {numberOfDoors} дверей
            </Badge>
          )}
        </OffRoadVehicleCardFooter>
      </OffRoadVehicleCardStyled>
    </OffRoadVehicleCardBox>
  );
};

export default OffRoadVehicleCard;
