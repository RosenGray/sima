"use client";

import React from "react";
import type { CategorySvgLinksProps } from "../CategoryLinks.types";
import {
  CategoryLinksNav,
  CategoryLinksList,
  CategoryLinksItem,
  CategoryLink,
  CategoryLinkIconWrapper,
  CategoryLinkLabel,
} from "../CategoryLinks.styles";

const DEFAULT_ARIA_LABEL = "Категории";

export function CategorySvgLinks({
  items,
  ariaLabel = DEFAULT_ARIA_LABEL,
  className,
}: CategorySvgLinksProps) {
  if (items.length === 0) return null;

  return (
    <CategoryLinksNav
      aria-label={ariaLabel}
      className={className}
      aria-hidden={false}
    >
      <CategoryLinksList role="list">
        {items.map((item, index) => (
          <CategoryLinksItem key={`${item.href}-${index}`}>
            <CategoryLink href={item.href}>
              <CategoryLinkIconWrapper width={"100px"} height={"100px"}>
                {item.icon}
              </CategoryLinkIconWrapper>
              <CategoryLinkLabel>{item.label}</CategoryLinkLabel>
            </CategoryLink>
          </CategoryLinksItem>
        ))}
      </CategoryLinksList>
    </CategoryLinksNav>
  );
}
