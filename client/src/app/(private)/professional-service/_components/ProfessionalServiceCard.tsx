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
} from "./ProfessionalServiceCard.styles";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

interface ProfessionalServiceCardProps {
  service: SerilizeProfessionalService;
}

const ProfessionalServiceCard: React.FC<ProfessionalServiceCardProps> = ({
  service,
}) => {
  const { images, publicId, district, city, description } = service;

  return (
    <Link href={`/professional-service/${publicId}`}>
      <ServiceCardBox>
        <ServiceCard variant="surface">
          <ServiceCardHeader>
            <Text weight="bold">
              {getCityById(city, district as Districts)?.nameRussian}
            </Text>
            <Text size="1" color="gray" weight="bold">
              #{publicId}
            </Text>
          </ServiceCardHeader>
          {/* <ServiceCardImages>
            <ServiceCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={2}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {images.map((image) => (
                <ServiceCardSwiperSlide key={image.uniqueName}>
                  <ServiceCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </ServiceCardImageContainer>
                </ServiceCardSwiperSlide>
              ))}
            </ServiceCardSwiper>
          </ServiceCardImages> */}
          <ServiceCardFooter>
            <Text as="p" size="2" color="gray" weight="bold">
              {description}
            </Text>
          </ServiceCardFooter>
        </ServiceCard>
      </ServiceCardBox>
    </Link>
  );
};

export default ProfessionalServiceCard;
