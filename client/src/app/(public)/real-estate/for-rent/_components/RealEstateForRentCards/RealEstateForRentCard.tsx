"use client";
import React from "react";
import Image from "next/image";
import {
  RealEstateForRentCardBox,
  RealEstateForRentCardStyled,
  RealEstateForRentCardFooter,
  RealEstateForRentCardHeader,
  RealEstateForRentCardImages,
  RealEstateForRentCardImageContainer,
  RealEstateForRentCardSwiper,
  RealEstateForRentCardSwiperSlide,
  RealEstateForRentCardContent,
} from "./RealEstateForRentCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedRealEstateForRent } from "@/lib/real-estate/for-rent/types/realEstateForRent.types";
import { formatPropertyKind } from "@/lib/real-estate/for-rent/utils/realEstateOptions";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface RealEstateForRentCardProps {
  realEstate: SerializedRealEstateForRent;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const RealEstateForRentCard: React.FC<RealEstateForRentCardProps> = ({
  realEstate,
}) => {
  const {
    images,
    publicId,
    district,
    city,
    streetname,
    numberOfRooms,
    squaremeter,
    price,
    propertyKind,
  } = realEstate;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  const title = streetname || "Недвижимость в аренду";

  return (
    <RealEstateForRentCardBox id={publicId}>
      <RealEstateForRentCardStyled variant="surface">
        <RealEstateForRentCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
          <Badge size="2" color="gray" variant="soft">
            {formatPropertyKind(propertyKind)}
          </Badge>
        </RealEstateForRentCardHeader>
        <RealEstateForRentCardImages>
          {images.length === 1 ? (
            <RealEstateForRentCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </RealEstateForRentCardImageContainer>
          ) : (
            <RealEstateForRentCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <RealEstateForRentCardSwiperSlide key={image.uniqueName}>
                  <RealEstateForRentCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </RealEstateForRentCardImageContainer>
                </RealEstateForRentCardSwiperSlide>
              ))}
            </RealEstateForRentCardSwiper>
          )}
        </RealEstateForRentCardImages>
        <RealEstateForRentCardContent>
          <Heading size="4" weight="medium">
            {title}
          </Heading>
          <Text size="2" color="gray">
            {numberOfRooms} комнат • {squaremeter} м²
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </RealEstateForRentCardContent>
        <RealEstateForRentCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {numberOfRooms} комн.
          </Badge>
          <Badge size="1" color="gray" variant="soft">
            {squaremeter} м²
          </Badge>
        </RealEstateForRentCardFooter>
      </RealEstateForRentCardStyled>
    </RealEstateForRentCardBox>
  );
};

export default RealEstateForRentCard;
