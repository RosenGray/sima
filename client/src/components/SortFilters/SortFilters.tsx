"use client";
import { FC } from "react";
import Link from "next/link";
import {
  SortFiltersContainer,
  SortFiltersList,
  SortFiltersListItem,
} from "./SortFilters.styles";

export interface SortFilterItem {
  title: string;
  href: string;
}

interface SortFiltersProps {
  items: SortFilterItem[];
}

const SortFilters: FC<SortFiltersProps> = ({ items }) => {
  return (
    <SortFiltersContainer>
      <SortFiltersList>
        {items.map((item, index) => (
          <SortFiltersListItem key={index}>
            <Link href={item.href}>{item.title}</Link>
          </SortFiltersListItem>
        ))}
      </SortFiltersList>
    </SortFiltersContainer>
  );
};

export default SortFilters;
