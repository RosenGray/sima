"use client";
import React from "react";
import Image from "next/image";
import {
  RealEstateForSaleCardBox,
  RealEstateForSaleCardStyled,
  RealEstateForSaleCardFooter,
  RealEstateForSaleCardHeader,
  RealEstateForSaleCardImages,
  RealEstateForSaleCardImageContainer,
  RealEstateForSaleCardSwiper,
  RealEstateForSaleCardSwiperSlide,
  RealEstateForSaleCardContent,
} from "./RealEstateForSaleCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedRealEstateForSale } from "@/lib/real-estate/for-sale/types/realEstateForSale.types";
import { PropertyKind } from "@/lib/real-estate/for-sale/types/realEstateForSale.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface RealEstateForSaleCardProps {
  realEstate: SerializedRealEstateForSale;
}

// Helper function to format property kind
const formatPropertyKind = (propertyKind: PropertyKind): string => {
  return propertyKind === PropertyKind.Apartment ? "Квартира" : "Лофт";
};

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const RealEstateForSaleCard: React.FC<RealEstateForSaleCardProps> = ({
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

  const title = streetname || "Недвижимость на продажу";

  return (
    <RealEstateForSaleCardBox id={publicId}>
      <RealEstateForSaleCardStyled variant="surface">
        <RealEstateForSaleCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
          <Badge size="2" color="gray" variant="soft">
            {formatPropertyKind(propertyKind)}
          </Badge>
        </RealEstateForSaleCardHeader>
        <RealEstateForSaleCardImages>
          {images.length === 1 ? (
            <RealEstateForSaleCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </RealEstateForSaleCardImageContainer>
          ) : (
            <RealEstateForSaleCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <RealEstateForSaleCardSwiperSlide key={image.uniqueName}>
                  <RealEstateForSaleCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </RealEstateForSaleCardImageContainer>
                </RealEstateForSaleCardSwiperSlide>
              ))}
            </RealEstateForSaleCardSwiper>
          )}
        </RealEstateForSaleCardImages>
        <RealEstateForSaleCardContent>
          <Heading size="4" weight="medium">
            {title}
          </Heading>
          <Text size="2" color="gray">
            {numberOfRooms} комнат • {squaremeter} м²
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </RealEstateForSaleCardContent>
        <RealEstateForSaleCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {numberOfRooms} комн.
          </Badge>
          <Badge size="1" color="gray" variant="soft">
            {squaremeter} м²
          </Badge>
        </RealEstateForSaleCardFooter>
      </RealEstateForSaleCardStyled>
    </RealEstateForSaleCardBox>
  );
};

export default RealEstateForSaleCard;
