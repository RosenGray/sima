"use client";
import React from "react";
import Image from "next/image";
import {
  MotorcycleCardBox,
  MotorcycleCardStyled,
  MotorcycleCardFooter,
  MotorcycleCardHeader,
  MotorcycleCardImages,
  MotorcycleCardImageContainer,
  MotorcycleCardSwiper,
  MotorcycleCardContent,
  LikeButtonWrapper,
} from "./MotorcycleCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_MOTORCYCLES } from "@/lib/constants/entityTypes";
import { Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { SerializedMotorcycle } from "@/lib/vehicles/motorcycles/types/motorcycle.types";
import { MotorcycleKind } from "@/lib/vehicles/motorcycles/types/motorcycle.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface MotorcycleCardProps {
  motorcycle: SerializedMotorcycle;
}

// Helper function to format kind type
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

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const MotorcycleCard: React.FC<MotorcycleCardProps> = ({ motorcycle }) => {
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

  return (
    <MotorcycleCardBox id={publicId}>
      <MotorcycleCardStyled variant="surface">
        <LikeButtonWrapper>
          <LikeButton
            entityType={ENTITY_TYPE_MOTORCYCLES}
            publicId={publicId}
            size={18}
            stopPropagation
          />
        </LikeButtonWrapper>
        <MotorcycleCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </MotorcycleCardHeader>
        <MotorcycleCardImages>
          {images.length === 1 ? (
            <MotorcycleCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </MotorcycleCardImageContainer>
          ) : (
            <MotorcycleCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <SwiperSlide key={image.uniqueName}>
                  <MotorcycleCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </MotorcycleCardImageContainer>
                </SwiperSlide>
              ))}
            </MotorcycleCardSwiper>
          )}
        </MotorcycleCardImages>
        <MotorcycleCardContent>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </MotorcycleCardContent>
        <MotorcycleCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {formatKindType(kind)}
          </Badge>
          {mileage && (
            <Badge size="1" color="gray" variant="soft">
              {new Intl.NumberFormat("ru-RU").format(mileage)} км
            </Badge>
          )}
        </MotorcycleCardFooter>
      </MotorcycleCardStyled>
    </MotorcycleCardBox>
  );
};

export default MotorcycleCard;
