"use client";

import { FC, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Flex, IconButton, Spinner, Text } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { MyAdSummary } from "@/lib/likes/entityTypeToPath";
import { removeLike } from "@/lib/likes/actions/likes.actions";
import {
  AdRow,
  AdRowThumb,
  AdRowContent,
  AdRowTitle,
  AdRowMeta,
  AdRowDate,
  AdDetailLink,
} from "@/app/(private)/private-zone/my-ads/my-ads.styles";

function formatDate(createdAt: string): string {
  if (!createdAt) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAt));
}

interface LikedAdListItemProps {
  ad: MyAdSummary;
}

const LikedAdListItem: FC<LikedAdListItemProps> = ({ ad }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      const result = await removeLike(ad.entityType, ad.publicId);
      if (result.success) {
        router.refresh();
      }
    });
  };

  return (
    <AdRow>
      <AdDetailLink href={ad.href}>
        <Flex align="center" gap="3" wrap="wrap" style={{ flex: 1, minWidth: 0 }}>
          <AdRowThumb>
            {ad.thumbnailUrl ? (
              <Image
                src={ad.thumbnailUrl}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                sizes="64px"
                unoptimized={ad.thumbnailUrl.startsWith("http")}
              />
            ) : null}
          </AdRowThumb>
          <AdRowContent>
            <AdRowTitle as="span">{ad.title || "Без названия"}</AdRowTitle>
            <AdRowMeta style={{ flexWrap: "wrap" }}>
              <Text size="1" color="gray">
                {ad.sectionLabel}
              </Text>
              <AdRowDate as="span">{formatDate(ad.createdAt)}</AdRowDate>
            </AdRowMeta>
          </AdRowContent>
        </Flex>
      </AdDetailLink>
      <IconButton
        type="button"
        size="2"
        variant="ghost"
        color="gray"
        aria-label="Удалить из избранного"
        disabled={isPending}
        onClick={handleDelete}
        style={{ flexShrink: 0, cursor: "pointer" }}
      >
        {isPending ? (
          <Spinner size="1" />
        ) : (
          <Cross2Icon width={18} height={18} />
        )}
      </IconButton>
    </AdRow>
  );
};

export default LikedAdListItem;
