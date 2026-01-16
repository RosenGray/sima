"use client";
import React from "react";
import Image from "next/image";
import {
  AccessoryCardBox,
  AccessoryCardStyled,
  AccessoryCardFooter,
  AccessoryCardHeader,
  AccessoryCardImages,
  AccessoryCardImageContainer,
  AccessoryCardSwiper,
  AccessoryCardSwiperSlide,
  AccessoryCardContent,
} from "./AccessoryCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedAccessory } from "@/lib/vehicles/accessories/types/accessory.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import {
  getAccessoryCategoryById,
} from "@/lib/vehicles/accessories/accessoryCategories";
import {
  getAccessoryKindById,
} from "@/lib/vehicles/accessories/accessoryKinds";
import { AccessoryCategoryId } from "@/lib/vehicles/accessories/accessoryCategories/types/accessoryCategory.schema";

interface AccessoryCardProps {
  accessory: SerializedAccessory;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const AccessoryCard: React.FC<AccessoryCardProps> = ({
  accessory,
}) => {
  const {
    images,
    publicId,
    district,
    city,
    category,
    kind,
    title,
    price,
  } = accessory;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  const categoryData = getAccessoryCategoryById(
    category as AccessoryCategoryId
  );
  const kindData = getAccessoryKindById(
    kind,
    category as AccessoryCategoryId
  );

  const categoryName = categoryData?.russianName || category;
  const kindName = kindData?.russianName || kind;

  return (
    <AccessoryCardBox id={publicId}>
      <AccessoryCardStyled variant="surface">
        <AccessoryCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </AccessoryCardHeader>
        <AccessoryCardImages>
          {images.length === 1 ? (
            <AccessoryCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </AccessoryCardImageContainer>
          ) : (
            <AccessoryCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <AccessoryCardSwiperSlide key={image.uniqueName}>
                  <AccessoryCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </AccessoryCardImageContainer>
                </AccessoryCardSwiperSlide>
              ))}
            </AccessoryCardSwiper>
          )}
        </AccessoryCardImages>
        <AccessoryCardContent>
          <Heading size="4" weight="medium">
            {title}
          </Heading>
          <Text size="2" color="gray">
            {categoryName} • {kindName}
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </AccessoryCardContent>
        <AccessoryCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {categoryName}
          </Badge>
          <Badge size="1" color="gray" variant="soft">
            {kindName}
          </Badge>
        </AccessoryCardFooter>
      </AccessoryCardStyled>
    </AccessoryCardBox>
  );
};

export default AccessoryCard;
