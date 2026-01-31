"use client";
import React from "react";
import Image from "next/image";
import {
  CommercialVehicleCardBox,
  CommercialVehicleCardStyled,
  CommercialVehicleCardFooter,
  CommercialVehicleCardHeader,
  CommercialVehicleCardImages,
  CommercialVehicleCardImageContainer,
  CommercialVehicleCardSwiper,
  CommercialVehicleCardSwiperSlide,
  CommercialVehicleCardContent,
  LikeButtonWrapper,
} from "./CommercialVehicleCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_COMMERCIAL_VEHICLES } from "@/providers/LikesProvider/LikesProvider";
import { Autoplay } from "swiper/modules";
import { SerializedCommercialVehicle } from "@/lib/vehicles/commercial-vehicles/types/commercialVehicle.types";
import { TransmissionType } from "@/lib/vehicles/cars/types/cars.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface CommercialVehicleCardProps {
  commercialVehicle: SerializedCommercialVehicle;
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

const CommercialVehicleCard: React.FC<CommercialVehicleCardProps> = ({ commercialVehicle }) => {
  const { images, publicId, district, city, manufacturer, model, yearOfManufacture, numberOfHand, price, transmission, mileage, numberOfDoors } = commercialVehicle;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  return (
    <CommercialVehicleCardBox id={publicId}>
      <CommercialVehicleCardStyled variant="surface">
        <LikeButtonWrapper>
          <LikeButton
            entityType={ENTITY_TYPE_COMMERCIAL_VEHICLES}
            publicId={publicId}
            size={18}
            stopPropagation
          />
        </LikeButtonWrapper>
        <CommercialVehicleCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </CommercialVehicleCardHeader>
        <CommercialVehicleCardImages>
          {images.length === 1 ? (
            <CommercialVehicleCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </CommercialVehicleCardImageContainer>
          ) : (
            <CommercialVehicleCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <CommercialVehicleCardSwiperSlide key={image.uniqueName}>
                  <CommercialVehicleCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </CommercialVehicleCardImageContainer>
                </CommercialVehicleCardSwiperSlide>
              ))}
            </CommercialVehicleCardSwiper>
          )}
        </CommercialVehicleCardImages>
        <CommercialVehicleCardContent>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </CommercialVehicleCardContent>
        <CommercialVehicleCardFooter>
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
        </CommercialVehicleCardFooter>
      </CommercialVehicleCardStyled>
    </CommercialVehicleCardBox>
  );
};

export default CommercialVehicleCard;
