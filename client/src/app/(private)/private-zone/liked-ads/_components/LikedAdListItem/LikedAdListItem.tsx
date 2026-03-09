import Image from "next/image";
import { Flex, Text } from "@radix-ui/themes";
import type { MyAdSummary } from "@/lib/likes/entityTypeToPath";
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

export default function LikedAdListItem({ ad }: LikedAdListItemProps) {
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
              <AdRowDate as="span">{formatDate(ad.createdAt)}</AdRowDate>
            </AdRowMeta>
          </AdRowContent>
        </Flex>
      </AdDetailLink>
    </AdRow>
  );
}
