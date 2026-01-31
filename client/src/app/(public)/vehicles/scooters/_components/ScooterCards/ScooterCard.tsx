"use client";
import React from "react";
import Image from "next/image";
import {
  ScooterCardBox,
  ScooterCardStyled,
  ScooterCardFooter,
  ScooterCardHeader,
  ScooterCardImages,
  ScooterCardImageContainer,
  ScooterCardSwiper,
  ScooterCardSwiperSlide,
  ScooterCardContent,
  LikeButtonWrapper,
} from "./ScooterCard.styles";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_SCOOTERS } from "@/providers/LikesProvider/LikesProvider";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedScooter } from "@/lib/vehicles/scooters/types/scooter.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface ScooterCardProps {
  scooter: SerializedScooter;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const ScooterCard: React.FC<ScooterCardProps> = ({ scooter }) => {
  const { images, publicId, district, city, manufacturer, model, yearOfManufacture, numberOfHand, engineCapacity, mileage, price } = scooter;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  return (
    <ScooterCardBox id={publicId}>
      <ScooterCardStyled variant="surface">
        <LikeButtonWrapper>
          <LikeButton
            entityType={ENTITY_TYPE_SCOOTERS}
            publicId={publicId}
            size={18}
            stopPropagation
          />
        </LikeButtonWrapper>
        <ScooterCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </ScooterCardHeader>
        <ScooterCardImages>
          {images.length === 1 ? (
            <ScooterCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </ScooterCardImageContainer>
          ) : (
            <ScooterCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <ScooterCardSwiperSlide key={image.uniqueName}>
                  <ScooterCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </ScooterCardImageContainer>
                </ScooterCardSwiperSlide>
              ))}
            </ScooterCardSwiper>
          )}
        </ScooterCardImages>
        <ScooterCardContent>
          <Heading size="4" weight="medium">
            {manufacturer} {model}
          </Heading>
          <Text size="2" color="gray">
            {yearOfManufacture} • {numberOfHand} рук
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </ScooterCardContent>
        <ScooterCardFooter>
          {engineCapacity && (
            <Badge size="1" color="gray" variant="soft">
              {engineCapacity} куб.см
            </Badge>
          )}
          {mileage && (
            <Badge size="1" color="gray" variant="soft">
              {new Intl.NumberFormat("ru-RU").format(mileage)} км
            </Badge>
          )}
        </ScooterCardFooter>
      </ScooterCardStyled>
    </ScooterCardBox>
  );
};

export default ScooterCard;
