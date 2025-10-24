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
  const { images, publicId, district, city } = service;

  return (
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
          )}
        </ServiceCardImages>
        <ServiceCardFooter>
          <Text
            style={{ display: "block", height: "100%" }}
            as="p"
            color="gray"
            weight="bold"
          >
            loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. loremp ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos. loremp ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos. loremp ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. loremp ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. loremp ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam, quos. loremp ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. loremp
            ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. loremp ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos. loremp ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos. loremp ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. loremp ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. loremp ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam, quos. loremp ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. loremp
            ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            loremp ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. loremp ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos. loremp ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos. vladi vladi
          </Text>
        </ServiceCardFooter>
      </ServiceCard>
    </ServiceCardBox>
  );
};

export default ProfessionalServiceCard;
