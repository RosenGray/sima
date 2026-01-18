"use client";
import { FC, MouseEvent, useMemo } from "react";
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

type SortDirection = "asc" | "desc";

interface SortItem {
  field: string;
  direction: SortDirection;
  label: string;
  href: string;
  isActive: boolean;
  sort: string;
}

interface SortFiltersProps {
  currentSort?: string; // e.g., "date_desc"
  sortOptions: SortOption[]; // Array of sort options for this section
  onSortChange?: (nextSort: string) => void;
}

const SortFilters: FC<SortFiltersProps> = ({
  currentSort,
  sortOptions,
  onSortChange,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortItems: SortItem[] = useMemo(() => {
    // Guard against undefined sortOptions
    if (!sortOptions || !Array.isArray(sortOptions) || sortOptions.length === 0) {
      return [];
    }

    const generateSortLink = (field: string, direction: SortDirection) => {
      const params = new URLSearchParams(searchParams);
      const sort = `${field}_${direction}`;
      params.set("sort", sort);
      params.set("page", "1"); // Reset to first page when sort changes
      return `${pathname}?${params.toString()}`;
    };

    return sortOptions.flatMap((option) => {
      const ascSort = `${option.field}_asc`;
      const descSort = `${option.field}_desc`;
      const ascOption = option.ascLabel
        ? {
            field: option.field,
            direction: "asc" as const,
            label: option.ascLabel,
            href: generateSortLink(option.field, "asc"),
            isActive: currentSort === ascSort,
            sort: ascSort,
          }
        : null;

      const descOption = option.descLabel
        ? {
            field: option.field,
            direction: "desc" as const,
            label: option.descLabel,
            href: generateSortLink(option.field, "desc"),
            isActive: currentSort === descSort,
            sort: descSort,
          }
        : null;

      return [ascOption, descOption].filter(Boolean) as SortItem[];
    });
  }, [currentSort, searchParams, pathname, sortOptions]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, nextSort: string) => {
    if (!onSortChange) return;
    // Preserve native link behavior for new tab/window and modifier clicks.
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      // Middle click
      e.button === 1
    ) {
      return;
    }
    e.preventDefault();
    onSortChange(nextSort);
  };

  return (
    <SortFiltersContainer>
      <SortFiltersList>
        {sortItems.map((item, index) => (
          <SortFiltersListItem key={`${item.field}_${item.direction}_${index}`}>
            <Link
              href={item.href}
              data-active={item.isActive}
              onClick={(e) => handleClick(e, item.sort)}
            >
              {item.label}
            </Link>
          </SortFiltersListItem>
        ))}
      </SortFiltersList>
    </SortFiltersContainer>
  );
};

export default SortFilters;
