"use client";
import React from "react";
import Image from "next/image";
import {
  ServiceCard,
  ServiceCardBox,
  ServiceCardFooter,
  ServiceCardHeader,
  ServiceCardImages,
  ServiceCardImageContainer,
  ServiceCardSwiper,
  ServiceCardSwiperSlide,
  LikeButtonWrapper,
} from "./ProfessionalServiceCard.styles";
import { Badge, Text } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";
import { getCityById } from "@/lib/cities";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_PROFESSIONAL_SERVICE } from "@/providers/LikesProvider/LikesProvider";
import { Districts } from "@/lib/cities/types/cities.schema";

interface ProfessionalServiceCardProps {
  service: SerilizeProfessionalService;
}
//
const ProfessionalServiceCard: React.FC<ProfessionalServiceCardProps> = ({
  service,
}) => {
  const { images, publicId, district, city, description } = service;

  return (
    <ServiceCardBox id={publicId}>
      <ServiceCard variant="surface">
        <LikeButtonWrapper>
          <LikeButton
            entityType={ENTITY_TYPE_PROFESSIONAL_SERVICE}
            publicId={publicId}
            size={18}
            stopPropagation
          />
        </LikeButtonWrapper>
        <ServiceCardHeader>
          <Badge size="2" color="blue" variant="soft">
            {getCityById(city, district as Districts)?.nameRussian}
          </Badge>
          <Badge size="2" color="gray" variant="outline">
            {service.category.russianDisplayName}
          </Badge>

          <Badge size="2" color="green" variant="soft">
            {service.subCategory.russianDisplayName}
          </Badge>

        </ServiceCardHeader>
        <ServiceCardImages>
          {images.length === 1 ? (
            <ServiceCardImageContainer>
              <Image src={images[0].url} alt={images[0].originalName} fill />
            </ServiceCardImageContainer>
          ) : (
            <ServiceCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            >
              {images.map((image) => (
                <ServiceCardSwiperSlide key={image.uniqueName}>
                  <ServiceCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </ServiceCardImageContainer>
                </ServiceCardSwiperSlide>
              ))}
            </ServiceCardSwiper>
          )}
        </ServiceCardImages>
        <ServiceCardFooter>
          <Text
            style={{ display: "block", height: "100%" }}
            as="p"
            color="gray"

          >
            {description}
          </Text>
        </ServiceCardFooter>
      </ServiceCard>
    </ServiceCardBox>
  );
};

export default ProfessionalServiceCard;
