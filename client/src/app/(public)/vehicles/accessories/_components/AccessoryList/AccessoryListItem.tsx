"use client";
import React from "react";
import Image from "next/image";
import {
  AccessoryListItemBox,
  AccessoryListItemCard,
  AccessoryListItemImageSection,
  AccessoryListItemImageContainer,
  AccessoryListItemDetails,
  AccessoryListItemLikeWrapper,
  AccessoryListItemBadges,
} from "./AccessoryListItem.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_VEHICLES_ACCESSORIES } from "@/lib/constants/entityTypes";
import { SerializedAccessory } from "@/lib/vehicles/accessories/types/accessory.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { getAccessoryCategoryById } from "@/lib/vehicles/accessories/accessoryCategories";
import { getAccessoryKindById } from "@/lib/vehicles/accessories/accessoryKinds";
import { AccessoryCategoryId } from "@/lib/vehicles/accessories/accessoryCategories/types/accessoryCategory.schema";

interface AccessoryListItemProps {
  accessory: SerializedAccessory;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", { style: "currency", currency: "ILS" }).format(price);
};

const AccessoryListItem: React.FC<AccessoryListItemProps> = ({
  accessory,
}) => {
  const { images, publicId, district, city, category, kind, title, price } =
    accessory;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";
  const categoryData = getAccessoryCategoryById(category as AccessoryCategoryId);
  const kindData = getAccessoryKindById(kind, category as AccessoryCategoryId);
  const categoryName = categoryData?.russianName || category;
  const kindName = kindData?.russianName || kind;
  const firstImage = images[0];

  return (
    <AccessoryListItemBox id={publicId}>
      <AccessoryListItemCard variant="surface">
        <AccessoryListItemImageSection>
          <AccessoryListItemImageContainer>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 280px"
              />
            ) : null}
          </AccessoryListItemImageContainer>
        </AccessoryListItemImageSection>
        <AccessoryListItemDetails>
          <AccessoryListItemLikeWrapper>
            <LikeButton
              entityType={ENTITY_TYPE_VEHICLES_ACCESSORIES}
              publicId={publicId}
              size={18}
              stopPropagation
            />
          </AccessoryListItemLikeWrapper>
          <Heading size="4" weight="medium">
            {title}
          </Heading>
          <Text size="2" color="gray">
            {categoryName} • {kindName}
          </Text>
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
          <AccessoryListItemBadges>
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
          </AccessoryListItemBadges>
        </AccessoryListItemDetails>
      </AccessoryListItemCard>
    </AccessoryListItemBox>
  );
};

export default AccessoryListItem;
