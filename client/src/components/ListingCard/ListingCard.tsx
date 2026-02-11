"use client";

import React from "react";
import Image from "next/image";
import { Text } from "@radix-ui/themes";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import type { ListingCardProps } from "./ListingCard.types";
import {
  ListingCardBox,
  ListingCardStyled,
  LikeButtonWrapper,
  ListingCardImageBlock,
  ListingCardImageContainer,
  ListingCardContent,
  ListingCardTitle,
  ListingCardSubtitle,
  ListingCardDescription,
  ListingCardFooter,
  ListingCardHeader,
} from "./ListingCard.styles";

const ListingCard: React.FC<ListingCardProps> = ({
  imageUrl,
  title,
  subtitle,
  description,
  city,
  district,
  price,
  likeButton,
}) => {
  return (
    <ListingCardBox>
      <ListingCardStyled variant="surface">
        <ListingCardImageBlock>
            <LikeButtonWrapper>
              <LikeButton
                entityType={likeButton.entityType}
                publicId={likeButton.publicId}
                size={18}
                stopPropagation
              />
            </LikeButtonWrapper>

          <ListingCardImageContainer>
            <Image
              src={imageUrl}
              alt={title || "Listing image"}
              fill
              style={{ objectFit: "cover" }}
              sizes="300px"
            />
          </ListingCardImageContainer>
        </ListingCardImageBlock>
        <ListingCardContent>
          <ListingCardHeader>
            <ListingCardTitle>
              <Text truncate  size="2" weight="medium" as="p">
                {title}
              </Text>
            </ListingCardTitle>
            {subtitle && (
              <ListingCardSubtitle>
                <Text truncate size="1" color="gray" as="p">
                  {subtitle}
                </Text>
              </ListingCardSubtitle>
            )}
          </ListingCardHeader>
          {description && (
            <ListingCardDescription>
              <Text size="2" color="gray" as="p">
                {description}
              </Text>
            </ListingCardDescription>
          )}
        </ListingCardContent>
        <ListingCardFooter>
          <Text size="2" color="gray">
            {city}
          </Text>
          {price && (
            <Text size="1" weight="bold" style={{ textAlign: "end" }}>
              {price}
            </Text>
          )}
          <Text size="2" color="gray">
            {district}
          </Text>
        </ListingCardFooter>
      </ListingCardStyled>
    </ListingCardBox>
  );
};

export default ListingCard;
