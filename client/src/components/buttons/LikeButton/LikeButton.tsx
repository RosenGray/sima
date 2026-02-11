"use client";

import { FC } from "react";
import { IconButton } from "@radix-ui/themes";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useLikes } from "@/providers/LikesProvider/LikesProvider";
import { EntityType } from "@/lib/constants/entityTypes";

interface LikeButtonProps {
  entityType: EntityType;
  publicId: string;
  /** Optional className for positioning (e.g. on cards). */
  className?: string;
  /** Icon size in pixels. Default 18. */
  size?: number;
  /** Prevents navigation when inside a Link (e.g. card). Call in onClick. */
  stopPropagation?: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({
  entityType,
  publicId,
  className,
  size = 18,
  stopPropagation = true,
}) => {
  const { isLiked, toggle } = useLikes();
  const liked = isLiked(entityType, publicId);

  const handleClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
    void toggle(entityType, publicId);
  };

  return (
    <IconButton
      type="button"
      variant="soft"
      color={liked ? "red" : "gray"}
      size="2"
      className={className}
      style={{ cursor: "pointer" }}
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? "Убрать из избранного" : "Добавить в избранное"}
    >
      {liked ? (
        <HeartFilledIcon width={size} height={size} />
      ) : (
        <HeartIcon width={size} height={size} />
      )}
    </IconButton>
  );
};

export default LikeButton;
