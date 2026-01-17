"use client";
import React from "react";
import Image from "next/image";
import {
  Yad2ItemCardBox,
  Yad2ItemCardStyled,
  Yad2ItemCardFooter,
  Yad2ItemCardHeader,
  Yad2ItemCardImages,
  Yad2ItemCardImageContainer,
  Yad2ItemCardSwiper,
  Yad2ItemCardSwiperSlide,
  Yad2ItemCardContent,
} from "./Yad2ItemCard.styles";
import { Badge, Text, Heading } from "@radix-ui/themes";
import { Autoplay } from "swiper/modules";
import { SerializedYad2Item } from "@/lib/yad2/types/yad2.types";
import { getCityById } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import {
  getYad2CategoryById,
} from "@/lib/yad2/yad2Categories";
import {
  getYad2SubCategoryById,
} from "@/lib/yad2/yad2SubCategories";
import {
  Yad2CategoryId,
} from "@/lib/yad2/yad2Categories/types/yad2Category.schema";

interface Yad2ItemCardProps {
  yad2Item: SerializedYad2Item;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
};

const Yad2ItemCard: React.FC<Yad2ItemCardProps> = ({ yad2Item }) => {
  const {
    images,
    publicId,
    district,
    city,
    category,
    subCategory,
    productTitle,
    price,
  } = yad2Item;

  const location = getCityById(city, district as Districts);
  const locationName = location?.nameRussian || "";

  const categoryData = getYad2CategoryById(category as Yad2CategoryId);
  const categoryName = categoryData?.russianName || "";

  const subCategoryData = getYad2SubCategoryById(
    subCategory,
    category as Yad2CategoryId
  );
  const subCategoryName = subCategoryData?.russianName || "";

  return (
    <Yad2ItemCardBox id={publicId}>
      <Yad2ItemCardStyled variant="surface">
        <Yad2ItemCardHeader>
          {locationName && (
            <Badge size="2" color="blue" variant="soft">
              {locationName}
            </Badge>
          )}
        </Yad2ItemCardHeader>
        <Yad2ItemCardImages>
          {images.length === 1 ? (
            <Yad2ItemCardImageContainer>
              <Image
                src={images[0].url}
                alt={images[0].originalName}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              />
            </Yad2ItemCardImageContainer>
          ) : (
            <Yad2ItemCardSwiper
              modules={[Autoplay]}
              autoplay={true}
              spaceBetween={0}
              slidesPerView={1}
            >
              {images.map((image) => (
                <Yad2ItemCardSwiperSlide key={image.uniqueName}>
                  <Yad2ItemCardImageContainer>
                    <Image
                      src={image.url}
                      alt={image.originalName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </Yad2ItemCardImageContainer>
                </Yad2ItemCardSwiperSlide>
              ))}
            </Yad2ItemCardSwiper>
          )}
        </Yad2ItemCardImages>
        <Yad2ItemCardContent>
          <Heading size="4" weight="medium">
            {productTitle}
          </Heading>
          {categoryName && (
            <Text size="2" color="gray">
              {categoryName}
              {subCategoryName && ` • ${subCategoryName}`}
            </Text>
          )}
          <Text size="6" weight="bold" color="red">
            {formatPrice(price)}
          </Text>
        </Yad2ItemCardContent>
        <Yad2ItemCardFooter>
          <Badge size="1" color="gray" variant="soft">
            #{publicId}
          </Badge>
        </Yad2ItemCardFooter>
      </Yad2ItemCardStyled>
    </Yad2ItemCardBox>
  );
};

export default Yad2ItemCard;
