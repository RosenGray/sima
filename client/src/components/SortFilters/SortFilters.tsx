"use client";
import { FC, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import {
  SortFiltersContainer,
  SortFiltersList,
  SortFiltersListItem,
} from "./SortFilters.styles";

export interface SortOption {
  field: string;
  label: string;
  ascLabel?: string;
  descLabel?: string;
}

interface SortFiltersProps {
  currentSort?: string; // e.g., "date_desc"
  sortOptions: SortOption[]; // Array of sort options for this section
}

const SortFilters: FC<SortFiltersProps> = ({ currentSort, sortOptions }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortItems = useMemo(() => {
    // Guard against undefined sortOptions
    if (!sortOptions || !Array.isArray(sortOptions) || sortOptions.length === 0) {
      return [];
    }

    const generateSortLink = (field: string, direction: "asc" | "desc") => {
      const params = new URLSearchParams(searchParams);
      params.set("sort", `${field}_${direction}`);
      params.set("page", "1"); // Reset to first page when sort changes
      return `${pathname}?${params.toString()}`;
    };

    return sortOptions.flatMap((option) => {
      const ascSort = `${option.field}_asc`;
      const descSort = `${option.field}_desc`;
      const ascOption = option.ascLabel ? {
        field: option.field,
        direction: "asc" as const,
        label: option.ascLabel,
        href: generateSortLink(option.field, "asc"),
        isActive: currentSort === ascSort,
        } : null;

      const descOption = option.descLabel ? {
        field: option.field,
        direction: "desc" as const,
        label: option.descLabel,
        href: generateSortLink(option.field, "desc"),
        isActive: currentSort === descSort,
      } : null;

      return [ascOption, descOption].filter(Boolean);
    });
  }, [currentSort, searchParams, pathname, sortOptions]);

  return (
    <SortFiltersContainer>
      <SortFiltersList>
        {sortItems.map((item, index) => (
          item && <SortFiltersListItem key={`${item.field}_${item.direction}_${index}`}>
            <Link
              href={item.href}>
              {item.label}
            </Link>
          </SortFiltersListItem>
        ))}
      </SortFiltersList>
    </SortFiltersContainer>
  );
};

export default SortFilters;
