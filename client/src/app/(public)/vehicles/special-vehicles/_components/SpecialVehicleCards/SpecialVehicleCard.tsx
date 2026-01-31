"use client";
import React from "react";
import Image from "next/image";
import {
  SpecialVehicleCardBox,
  SpecialVehicleCardStyled,
  SpecialVehicleCardFooter,
  SpecialVehicleCardHeader,
  SpecialVehicleCardImages,
  SpecialVehicleCardImageContainer,
  SpecialVehicleCardSwiper,
  SpecialVehicleCardSwiperSlide,
  SpecialVehicleCardContent,
  LikeButtonWrapper,
} from "./SpecialVehicleCard.styles";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_SPECIAL_VEHICLES } from "@/providers/LikesProvider/LikesProvider";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedSpecialVehicle } from "@/lib/vehicles/special-vehicles/types/specialVehicle.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import {
  getSpecialVehicleCategoryById,
} from "@/lib/vehicles/special-vehicles/specialVehicleCategories";
import {
  getSpecialVehicleKindById,
} from "@/lib/vehicles/special-vehicles/specialVehicleKinds";
import { SpecialVehicleCategoryId } from "@/lib/vehicles/special-vehicles/specialVehicleCategories/types/specialVehicleCategory.schema";

interface SpecialVehicleCardProps {
  specialVehicle: SerializedSpecialVehicle;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const SpecialVehicleCard: React.FC<SpecialVehicleCardProps> = ({
  specialVehicle,
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
  } = specialVehicle;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  const categoryData = getSpecialVehicleCategoryById(
    category as SpecialVehicleCategoryId
  );
  const kindData = getSpecialVehicleKindById(
    kind,
    category as SpecialVehicleCategoryId
  );

  const categoryName = categoryData?.russianName || category;
  const kindName = kindData?.russianName || kind;

  return (
    <SpecialVehicleCardBox id={publicId}>
      <SpecialVehicleCardStyled variant="surface">
        <LikeButtonWrapper>
          <LikeButton
            entityType={ENTITY_TYPE_SPECIAL_VEHICLES}
            publicId={publicId}
            size={18}
            stopPropagation
          />
        </LikeButtonWrapper>
        <SpecialVehicleCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </SpecialVehicleCardHeader>
        <SpecialVehicleCardImages>
          {images.length === 1 ? (
            <SpecialVehicleCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </SpecialVehicleCardImageContainer>
          ) : (
            <SpecialVehicleCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <SpecialVehicleCardSwiperSlide key={image.uniqueName}>
                  <SpecialVehicleCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </SpecialVehicleCardImageContainer>
                </SpecialVehicleCardSwiperSlide>
              ))}
            </SpecialVehicleCardSwiper>
          )}
        </SpecialVehicleCardImages>
        <SpecialVehicleCardContent>
          <Heading size="4" weight="medium">
            {title}
          </Heading>
          <Text size="2" color="gray">
            {categoryName} • {kindName}
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </SpecialVehicleCardContent>
        <SpecialVehicleCardFooter>
          <Badge size="1" color="gray" variant="soft">
            {categoryName}
          </Badge>
          <Badge size="1" color="gray" variant="soft">
            {kindName}
          </Badge>
        </SpecialVehicleCardFooter>
      </SpecialVehicleCardStyled>
    </SpecialVehicleCardBox>
  );
};

export default SpecialVehicleCard;
