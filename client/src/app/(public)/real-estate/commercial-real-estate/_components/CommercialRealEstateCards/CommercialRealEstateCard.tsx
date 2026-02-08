"use client";
import React from "react";
import Image from "next/image";
import {
  CommercialRealEstateCardBox,
  CommercialRealEstateCardStyled,
  CommercialRealEstateCardFooter,
  CommercialRealEstateCardHeader,
  CommercialRealEstateCardImages,
  CommercialRealEstateCardImageContainer,
  CommercialRealEstateCardSwiper,
  CommercialRealEstateCardSwiperSlide,
  CommercialRealEstateCardContent,
} from "./CommercialRealEstateCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedCommercialRealEstate } from "@/lib/real-estate/commercial-real-estate/types/commercialRealEstate.types";
import {
  formatCommercialPropertyKind,
  formatDealKind,
} from "@/lib/real-estate/commercial-real-estate/utils/commercialRealEstateOptions";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface CommercialRealEstateCardProps {
  commercialRealEstate: SerializedCommercialRealEstate;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const CommercialRealEstateCard: React.FC<CommercialRealEstateCardProps> = ({
  commercialRealEstate,
}) => {
  const {
    images,
    publicId,
    district,
    city,
    streetname,
    squaremeter,
    price,
    propertyKind,
    dealKind,
  } = commercialRealEstate;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  const title = streetname || "Коммерческая недвижимость";

  return (
    <CommercialRealEstateCardBox id={publicId}>
      <CommercialRealEstateCardStyled variant="surface">
        <CommercialRealEstateCardHeader>
          <Badge size="2" color="green" variant="soft">
            {formatDealKind(dealKind)}
          </Badge>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
          <Badge size="2" color="gray" variant="soft">
            {formatCommercialPropertyKind(propertyKind)}
          </Badge>
        </CommercialRealEstateCardHeader>
        <CommercialRealEstateCardImages>
          {images.length === 1 ? (
            <CommercialRealEstateCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </CommercialRealEstateCardImageContainer>
          ) : (
            <CommercialRealEstateCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <CommercialRealEstateCardSwiperSlide key={image.uniqueName}>
                  <CommercialRealEstateCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </CommercialRealEstateCardImageContainer>
                </CommercialRealEstateCardSwiperSlide>
              ))}
            </CommercialRealEstateCardSwiper>
          )}
        </CommercialRealEstateCardImages>
        <CommercialRealEstateCardContent>
          <Heading size="4" weight="medium">
            {title}
          </Heading>
          <Text size="2" color="gray">
            {squaremeter} м²
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </CommercialRealEstateCardContent>
        <CommercialRealEstateCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {squaremeter} м²
          </Badge>
        </CommercialRealEstateCardFooter>
      </CommercialRealEstateCardStyled>
    </CommercialRealEstateCardBox>
  );
};

export default CommercialRealEstateCard;
