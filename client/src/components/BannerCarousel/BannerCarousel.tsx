"use client";

import React, { useState, useEffect, FC } from "react";
import Image from "next/image";
import { Container, Box, Flex, IconButton } from "@radix-ui/themes";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import styles from "./BannerCarousel.module.scss";
import { Slide } from "./config";

interface BannerCarousel {
  slides: Slide[];
}

const BannerCarousel: FC<BannerCarousel> = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Container size={"4"}>
      <Box className={styles.BannerCarousel__Container}>
        <Flex
          direction="column"
          className={styles.BannerCarousel__slideContainer}
        >
          <Flex
            className={styles.BannerCarousel__slidesWrapper}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <Box key={slide.id} className={styles.BannerCarousel__slide}>
                {/* <Heading className={styles.heading} color="red" style={{position:'absolute'}} as="h2" size="8">{slide.alt}</Heading> */}
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.BannerCarousel__slideLink}
                >
                  <Image
                    priority
                    src={slide.desktopImage}
                    alt={slide.alt}
                    className={`${styles.BannerCarousel__slideImage} ${styles["BannerCarousel__slideImage--desktop"]}`}
                    fill
                  />
                  <Image
                    priority
                    src={slide.mobileImage}
                    alt={slide.alt}
                    className={`${styles.BannerCarousel__slideImage} ${styles["BannerCarousel__slideImage--mobile"]}`}
                    fill
                  />
                </a>
              </Box>
            ))}
          </Flex>

          <Flex className={styles.BannerCarousel__navigationDots}>
            {slides.map((_, index) => (
              <Box
                key={index}
                as="div"
                role="button"
                className={`${styles.BannerCarousel__navigationDot} ${currentSlide === index ? `${styles["BannerCarousel__navigationDot--active"]}` : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </Flex>

          <IconButton
            color="yellow"
            size="3"
            variant="soft"
            data-acc
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + slides.length) % slides.length
              )
            }
            className={`${styles.BannerCarousel__navigationButton} ${styles["BannerCarousel__navigationButton--prev"]}`}
            aria-label="Previous slide"
          >
            <CaretLeftIcon width="24" height="24" />
          </IconButton>

          <IconButton
            size="3"
            color="yellow"
            variant="soft"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className={`${styles.BannerCarousel__navigationButton} ${styles["BannerCarousel__navigationButton--next"]}`}
            aria-label="Next slide"
          >
            <CaretRightIcon width="24" height="24" />
          </IconButton>
        </Flex>
      </Box>
    </Container>
  );
};

export default BannerCarousel;
