"use client";
import React from "react";
import Image from "next/image";
import {
  SpecialVehicleListItemBox,
  SpecialVehicleListItemCard,
  SpecialVehicleListItemImageSection,
  SpecialVehicleListItemImageContainer,
  SpecialVehicleListItemDetails,
  SpecialVehicleListItemLikeWrapper,
  SpecialVehicleListItemBadges,
} from "./SpecialVehicleListItem.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_SPECIAL_VEHICLES } from "@/lib/constants/entityTypes";
import { SerializedSpecialVehicle } from "@/lib/vehicles/special-vehicles/types/specialVehicle.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getSpecialVehicleCategoryById } from "@/lib/vehicles/special-vehicles/specialVehicleCategories";
import { getSpecialVehicleKindById } from "@/lib/vehicles/special-vehicles/specialVehicleKinds";
import { SpecialVehicleCategoryId } from "@/lib/vehicles/special-vehicles/specialVehicleCategories/types/specialVehicleCategory.schema";

interface SpecialVehicleListItemProps {
  specialVehicle: SerializedSpecialVehicle;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const SpecialVehicleListItem: React.FC<SpecialVehicleListItemProps> = ({
  specialVehicle,
}) => {
  const { images, publicId, district, city, category, kind, title, price } =
    specialVehicle;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";
  const categoryData = getSpecialVehicleCategoryById(category as SpecialVehicleCategoryId);
  const kindData = getSpecialVehicleKindById(kind, category as SpecialVehicleCategoryId);
  const categoryName = categoryData?.russianName || category;
  const kindName = kindData?.russianName || kind;
  const firstImage = images[0];

  return (
    <SpecialVehicleListItemBox id={publicId}>
      <SpecialVehicleListItemCard variant="surface">
        <SpecialVehicleListItemImageSection>
          <SpecialVehicleListItemImageContainer>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 280px"
              />
            ) : null}
          </SpecialVehicleListItemImageContainer>
        </SpecialVehicleListItemImageSection>
        <SpecialVehicleListItemDetails>
          <SpecialVehicleListItemLikeWrapper>
            <LikeButton
              entityType={ENTITY_TYPE_SPECIAL_VEHICLES}
              publicId={publicId}
              size={18}
              stopPropagation
            />
          </SpecialVehicleListItemLikeWrapper>
          <Heading size="4" weight="medium">
            {title}
          </Heading>
          <Text size="2" color="gray">
            {categoryName} • {kindName}
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
          <SpecialVehicleListItemBadges>
            {locationName && (
              <Badge size="2" color="blue" variant="soft">
                {locationName}
              </Badge>
            )}
            <Badge size="1" color="gray" variant="soft">
              {categoryName}
            </Badge>
            <Badge size="1" color="gray" variant="soft">
              {kindName}
            </Badge>
          </SpecialVehicleListItemBadges>
        </SpecialVehicleListItemDetails>
      </SpecialVehicleListItemCard>
    </SpecialVehicleListItemBox>
  );
};

export default SpecialVehicleListItem;
