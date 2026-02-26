"use client";
import React from "react";
import Image from "next/image";
import {
  ProfessionalServiceListItemBox,
  ProfessionalServiceListItemCard,
  ProfessionalServiceListItemImageSection,
  ProfessionalServiceListItemImageContainer,
  ProfessionalServiceListItemDetails,
  ProfessionalServiceListItemLikeWrapper,
  ProfessionalServiceListItemBadges,
} from "./ProfessionalServiceListItem.styles";
import { Badge, Text } from "@radix-ui/themes";
import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_PROFESSIONAL_SERVICE } from "@/lib/constants/entityTypes";

interface ProfessionalServiceListItemProps {
  service: SerilizeProfessionalService;
}

const ProfessionalServiceListItem: React.FC<ProfessionalServiceListItemProps> = ({
  service,
}) => {
  const { images, publicId, district, city, description, category, subCategory } =
    service;

  const locationName = getCityById(city, district as Districts)?.nameRussian ?? "";
  const firstImage = images[0];

  return (
    <ProfessionalServiceListItemBox id={publicId}>
      <ProfessionalServiceListItemCard variant="surface">
        <ProfessionalServiceListItemImageSection>
          <ProfessionalServiceListItemImageContainer>
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, 280px"
              />
            ) : null}
          </ProfessionalServiceListItemImageContainer>
        </ProfessionalServiceListItemImageSection>
        <ProfessionalServiceListItemDetails>
          <ProfessionalServiceListItemLikeWrapper>
            <LikeButton
              entityType={ENTITY_TYPE_PROFESSIONAL_SERVICE}
              publicId={publicId}
              size={18}
              stopPropagation
            />
          </ProfessionalServiceListItemLikeWrapper>
          <ProfessionalServiceListItemBadges>
            {locationName && (
              <Badge size="2" color="blue" variant="soft">
                {locationName}
              </Badge>
            )}
            <Badge size="2" color="gray" variant="outline">
              {category.russianDisplayName}
            </Badge>
            <Badge size="2" color="green" variant="soft">
              {subCategory.russianDisplayName}
            </Badge>
          </ProfessionalServiceListItemBadges>
          <Text
            as="p"
            size="3"
            color="gray"
            style={{ whiteSpace: "pre-wrap", display: "block" }}
          >
            {description}
          </Text>
        </ProfessionalServiceListItemDetails>
      </ProfessionalServiceListItemCard>
    </ProfessionalServiceListItemBox>
  );
};

export default ProfessionalServiceListItem;
