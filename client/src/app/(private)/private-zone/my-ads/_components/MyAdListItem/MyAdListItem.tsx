"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge, Flex, Text } from "@radix-ui/themes";
import type { MyAdSummary } from "@/lib/likes/entityTypeToPath";
import { getEditPathForEntityType } from "@/lib/my-ads/getEditPathForEntityType";
import {
  AdRow,
  AdRowThumb,
  AdRowContent,
  AdRowTitle,
  AdRowMeta,
  AdRowDate,
  AdDetailLink,
} from "@/app/(private)/private-zone/my-ads/my-ads.styles";

const STATUS_LABELS: Record<string, string> = {
  active: "Активно",
  expired: "Истекло",
  archived: "В архиве",
  deleted: "Удалено",
  pending: "На модерации",
};

function formatDate(createdAt: string): string {
  if (!createdAt) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAt));
}

interface MyAdListItemProps {
  ad: MyAdSummary;
}

export default function MyAdListItem({ ad }: MyAdListItemProps) {
  const statusLabel = STATUS_LABELS[ad.status] ?? ad.status;
  const editHref = getEditPathForEntityType(ad.entityType, ad.publicId);

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
            <AdRowMeta>
              <Text size="1" color="gray">
                {ad.sectionLabel}
              </Text>
              <Badge size="1" variant="soft" color="gray">
                {statusLabel}
              </Badge>
              <AdRowDate as="span">{formatDate(ad.createdAt)}</AdRowDate>
            </AdRowMeta>
          </AdRowContent>
        </Flex>
      </AdDetailLink>
      <Link href={editHref}>
        <Text size="2" color="blue" style={{ textDecoration: "underline", whiteSpace: "nowrap" }}>
          Редактировать
        </Text>
      </Link>
    </AdRow>
  );
}
