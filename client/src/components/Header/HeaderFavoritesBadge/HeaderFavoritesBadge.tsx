"use client";

import { FC } from "react";
import { HeartIcon } from "@radix-ui/react-icons";
import { useLikes } from "@/providers/LikesProvider/LikesProvider";
import { FavoritesBadgeWrapper, FavoritesBadgeCount } from "./HeaderFavoritesBadge.styles";

interface HeaderFavoritesBadgeProps {
  className?: string;
  /** Icon size in pixels. Default 32. */
  size?: number;
}

const HeaderFavoritesBadge: FC<HeaderFavoritesBadgeProps> = ({
  className,
  size = 32,
}) => {
  const { totalLikedCount } = useLikes();

  return (
    <FavoritesBadgeWrapper
      className={className}
      role="img"
      aria-label={`Количество избранных объявлений: ${totalLikedCount}`}
    >
      <HeartIcon width={size} height={size} style={{ color: "var(--gray-11)" }} />
      {totalLikedCount > 0 && (
        <FavoritesBadgeCount>{totalLikedCount}</FavoritesBadgeCount>
      )}
    </FavoritesBadgeWrapper>
  );
};

export default HeaderFavoritesBadge;
