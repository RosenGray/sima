"use client";

import { FC } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useLastSearch } from "@/providers/LastSearchProvider/LastSearchProvider";
import { SearchBadgeWrapper, SearchBadgeCount } from "./HeaderLastSearchBadge.styles";

interface HeaderLastSearchBadgeProps {
  /** Icon size in pixels. Default 18. */
  size?: number;
}

const HeaderLastSearchBadge: FC<HeaderLastSearchBadgeProps> = ({ size = 18 }) => {
  const { lastSearchCount } = useLastSearch();

  return (
    <SearchBadgeWrapper>
      <MagnifyingGlassIcon width={size} height={size} />
      <SearchBadgeCount>{lastSearchCount}</SearchBadgeCount>
    </SearchBadgeWrapper>
  );
};

export default HeaderLastSearchBadge;
