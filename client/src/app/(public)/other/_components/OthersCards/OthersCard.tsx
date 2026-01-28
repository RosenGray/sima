"use client";
import React from "react";
import Image from "next/image";
import {
  OthersCardBox,
  OthersCard,
  OthersCardHeader,
  OthersCardImages,
  OthersCardImageContainer,
  OthersCardSwiper,
  OthersCardSwiperSlide,
  OthersCardContent,
  OthersCardFooter,
} from "./OthersCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedOthers } from "@/lib/other/types/others.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface OthersCardProps {
  others: SerializedOthers;
}

const OthersCardComponent: React.FC<OthersCardProps> = ({ others }) => {
  const { images, publicId, district, city, title, description } = others;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  return (
    <OthersCardBox id={publicId}>
      <OthersCard variant="surface">
        <OthersCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
          <Badge size="2" color="gray" variant="outline">
            {district}
          </Badge>
        </OthersCardHeader>
        <OthersCardImages>
          {images.length === 1 ? (
            <OthersCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </OthersCardImageContainer>
          ) : (
            <OthersCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <OthersCardSwiperSlide key={image.uniqueName}>
                  <OthersCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </OthersCardImageContainer>
                </OthersCardSwiperSlide>
              ))}
            </OthersCardSwiper>
          )}
        </OthersCardImages>
        <OthersCardContent>
          <Heading size="4" weight="medium">
            {title}
          </Heading>
          <Text
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            as="p"
            color="gray"
            size="2"
          >
            {description}
          </Text>
        </OthersCardContent>
        <OthersCardFooter>
          <Badge size="1" color="gray" variant="soft">
            #{publicId}
          </Badge>
        </OthersCardFooter>
      </OthersCard>
    </OthersCardBox>
  );
};

export default OthersCardComponent;
