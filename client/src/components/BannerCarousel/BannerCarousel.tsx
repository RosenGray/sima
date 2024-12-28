"use client";

import React, { useState, useEffect } from "react";
import { Container, Box, Flex, IconButton } from "@radix-ui/themes";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import styles from "./BannerCarousel.module.scss";

interface Slide {
  id: number;
  desktopImage: string;
  mobileImage: string;
  link: string;
  alt: string;
}

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data - you would typically get this from props or an API
  const slides: Slide[] = [
    {
      id: 1,
      desktopImage:
        "https://variety.com/wp-content/uploads/2023/10/25-Greatest-Disney-Characters-of-All-Time-3.jpg?w=1000&h=563&crop=1",
      mobileImage: "/api/placeholder/400/300",
      link: "https://example.com/slide1",
      alt: "Campaign image 1",
    },
    {
      id: 2,
      desktopImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELucfjtBEYjitpfT7gbE1WUh7BBVf1MHAEQ&s",
      mobileImage: "/api/placeholder/400/300",
      link: "https://example.com/slide2",
      alt: "Campaign image 2",
    },
    {
      id: 3,
      desktopImage:
        "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/1AB2965C5F230407C8E91E6D14269FBD3F4ED99D10C2B0C7C8CBC12D392B0578/scale?width=1600&aspectRatio=1.78&format=webp",
      mobileImage: "/api/placeholder/400/300",
      link: "https://example.com/slide3",
      alt: "Campaign image 3",
    },
    {
      id: 4,
      desktopImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaf4w69FQd8fHJT-jYgyxnhWWCNzbe_BItA&s",
      mobileImage: "/api/placeholder/400/300",
      link: "https://example.com/slide4",
      alt: "Campaign image 4",
    },
  ];

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
    <Container size="4">
      <Box className={styles.carouselContainer}>
        <Box className={styles.slideContainer}>
          <Flex
            className={styles.slidesWrapper}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <Box key={slide.id} className={styles.slide}>
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.slideLink}
                >
                  <img
                    src={slide.desktopImage}
                    alt={slide.alt}
                    className={styles.desktopImage}
                  />
                  <img
                    src={slide.mobileImage}
                    alt={slide.alt}
                    className={styles.mobileImage}
                  />
                </a>
              </Box>
            ))}
          </Flex>

          <Flex className={styles.navigationDots}>
            {slides.map((_, index) => (
              <Box
                key={index}
                as="div"
                role="button"
                className={`${styles.dot} ${currentSlide === index ? styles.active : ""}`}
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
            className={`${styles.navigationButton} ${styles.prev}`}
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
            className={`${styles.navigationButton} ${styles.next}`}
            aria-label="Next slide"
          >
            <CaretRightIcon width="24" height="24" />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default BannerCarousel;
