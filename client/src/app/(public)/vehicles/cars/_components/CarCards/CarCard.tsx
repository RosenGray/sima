"use client";
import React from "react";
import Image from "next/image";
import {
  CarCardBox,
  CarCardStyled,
  CarCardFooter,
  CarCardHeader,
  CarCardImages,
  CarCardImageContainer,
  CarCardSwiper,
  CarCardSwiperSlide,
  CarCardContent,
} from "./CarCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedCar } from "@/lib/vehicles/cars/types/cars.types";
import { TransmissionType, EngineType } from "@/lib/vehicles/cars/types/cars.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface CarCardProps {
  car: SerializedCar;
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

// Helper function to format engine type
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

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { images, publicId, district, city, manufacturer, model, yearOfManufacture, numberOfHand, price, transmission, engineType, mileage, numberOfDoors } = car;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  return (
    <CarCardBox id={publicId}>
      <CarCardStyled variant="surface">
        <CarCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </CarCardHeader>
        <CarCardImages>
          {images.length === 1 ? (
            <CarCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </CarCardImageContainer>
          ) : (
            <CarCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <CarCardSwiperSlide key={image.uniqueName}>
                  <CarCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </CarCardImageContainer>
                </CarCardSwiperSlide>
              ))}
            </CarCardSwiper>
          )}
        </CarCardImages>
        <CarCardContent>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </CarCardContent>
        <CarCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {formatTransmissionType(transmission)}
          </Badge>
          <Badge size="1" color="gray" variant="soft">
            {formatEngineType(engineType)}
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
        </CarCardFooter>
      </CarCardStyled>
    </CarCardBox>
  );
};

export default CarCard;

