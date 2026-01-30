"use client";
import React from "react";
import Image from "next/image";
import {
  JobCardBox,
  JobCard,
  JobCardHeader,
  JobCardImages,
  JobCardImageContainer,
  JobCardSwiper,
  JobCardSwiperSlide,
  JobCardContent,
  JobCardFooter,
  LikeButtonWrapper,
} from "./JobCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedJob } from "@/lib/jobs/types/job.types";
import { getCityById, getDistrictById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import LikeButton from "@/components/buttons/LikeButton/LikeButton";
import { ENTITY_TYPE_JOBS } from "@/providers/LikesProvider/LikesProvider";

interface JobCardProps {
  job: SerializedJob;
}

const JobCardComponent: React.FC<JobCardProps> = ({ job }) => {
  const { images, publicId, district, city, title, description } = job;

  const location = getCityById(city, district as Districts);
  const _district = getDistrictById(district as Districts);
  const locationName = location?.nameRussian || "";

  return (
    <JobCardBox id={publicId}>
      <JobCard variant="surface">
        <LikeButtonWrapper>
          <LikeButton
            entityType={ENTITY_TYPE_JOBS}
            publicId={publicId}
            size={18}
            stopPropagation
          />
        </LikeButtonWrapper>
        <JobCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
          <Badge size="2" color="gray" variant="outline">
            {_district.name}
          </Badge>
        </JobCardHeader>
        <JobCardImages>
          {images.length === 1 ? (
            <JobCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </JobCardImageContainer>
          ) : (
            <JobCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <JobCardSwiperSlide key={image.uniqueName}>
                  <JobCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </JobCardImageContainer>
                </JobCardSwiperSlide>
              ))}
            </JobCardSwiper>
          )}
        </JobCardImages>
        <JobCardContent>
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
        </JobCardContent>
        <JobCardFooter>
          <Badge size="1" color="gray" variant="soft">
            #{publicId}
          </Badge>
        </JobCardFooter>
      </JobCard>
    </JobCardBox>
  );
};

export default JobCardComponent;
