"use client";

import React from "react";
import Image from "next/image";
import type { CategoryLinksProps, CategoryLinkItem } from "./CategoryLinks.types";
import {
  CategoryLinksNav,
  CategoryLinksList,
  CategoryLinksItem,
  CategoryLink,
  CategoryLinkImageWrapper,
  CategoryLinkLabel,
} from "./CategoryLinks.styles";

const DEFAULT_ARIA_LABEL = "Категории";

export function CategoryLinks({
  items,
  ariaLabel = DEFAULT_ARIA_LABEL,
  className,
}: CategoryLinksProps) {
  if (items.length === 0) return null;

  return (
    <CategoryLinksNav
      aria-label={ariaLabel}
      className={className}
      aria-hidden={false}
    >
      <CategoryLinksList role="list" data-nagish="category-links-list">
        {items.map((item: CategoryLinkItem, index: number) => (
          <CategoryLinksItem
            key={`${item.href}-${index}`}
            data-nagish="category-links-item"
          >
            <CategoryLink href={item.href} data-nagish="category-link">
              <CategoryLinkImageWrapper data-nagish="category-link-image-wrapper">
                <Image
                  src={item.imageUrl}
                  alt=""
                  role="presentation"
                  fill
                  sizes="150px"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  decoding="async"
                  data-nagish="category-link-image"
                />
              </CategoryLinkImageWrapper>
              <CategoryLinkLabel data-nagish="category-link-label">
                {item.label}
              </CategoryLinkLabel>
            </CategoryLink>
          </CategoryLinksItem>
        ))}
      </CategoryLinksList>
    </CategoryLinksNav>
  );
}
