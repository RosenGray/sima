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
  ListingCardFooter,
} from "./ListingCard.styles";

const ListingCard: React.FC<ListingCardProps> = ({
  imageUrl,
  title,
  subtitle,
  city,
  price,
  likeButton,
}) => {
  return (
    <ListingCardBox>
      <ListingCardStyled variant="surface">
        <ListingCardImageBlock>
          {likeButton && (
            <LikeButtonWrapper>
              <LikeButton
                entityType={likeButton.entityType}
                publicId={likeButton.publicId}
                size={18}
                stopPropagation
              />
            </LikeButtonWrapper>
          )}
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
          {price && (
            <Text size="5" weight="bold" style={{ textAlign: "end" }}>
              {price}
            </Text>
          )}
          <ListingCardTitle>
            <Text size="3" weight="medium" as="p">
              {title}
            </Text>
          </ListingCardTitle>
          {subtitle && (
            <ListingCardSubtitle>
              <Text size="2" color="gray" as="p">
                {subtitle}
              </Text>
            </ListingCardSubtitle>
          )}
        </ListingCardContent>
        <ListingCardFooter>
          <Text size="2" color="gray">
            {city}
          </Text>
        </ListingCardFooter>
      </ListingCardStyled>
    </ListingCardBox>
  );
};

export default ListingCard;
