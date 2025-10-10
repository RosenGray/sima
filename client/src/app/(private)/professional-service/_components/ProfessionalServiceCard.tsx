"use client";
import React from "react";
import { IProfessionalService } from "@/lib/professionals/professional-service/models/ProfessionalService";
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
import {Text} from "@radix-ui/themes";
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay  } from "swiper/modules";
import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";

interface ProfessionalServiceCardProps {
  service: SerilizeProfessionalService;
}

const ProfessionalServiceCard: React.FC<ProfessionalServiceCardProps> = ({
  service,
}) => {
  const {images,publicId} = service;
  console.log('service',service)

  return (
    <ServiceCardBox>
      <ServiceCard variant="surface">
        <ServiceCardHeader>
          <Text>{publicId}</Text>
        </ServiceCardHeader>
        <ServiceCardImages>
          {/* <ServiceCardSwiper
            modules={[Autoplay]}
            autoplay={true}
            spaceBetween={0  }
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
          </ServiceCardSwiper> */}
        </ServiceCardImages>

        {/* 
      <ServiceCardImageContainer>
          <Image 
        src={firstImage.url} 
        alt={firstImage.originalName} 
        fill 
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        priority={false}
      />
      </ServiceCardImageContainer> */}
        {/* <ServiceCardImages>
        {service.images.map((image) => (
          <ServiceCardImageContainer key={image.uniqueName}>
            <Image src={image.url} alt={image.originalName} fill />
          </ServiceCardImageContainer>
        ))}
      </ServiceCardImages> */}

        <ServiceCardFooter>footer</ServiceCardFooter>
      </ServiceCard>
    </ServiceCardBox>
  );
};

export default ProfessionalServiceCard;
