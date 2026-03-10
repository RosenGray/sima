"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "@radix-ui/themes";
import { getLikedAdSummaries } from "@/lib/likes/actions/getLikedAdSummaries";
import type { MyAdSummary } from "@/lib/likes/entityTypeToPath";
import { useLikes } from "@/providers/LikesProvider/LikesProvider";
import {
  FavoritesDropdownPanel,
  FavoritesDropdownList,
  FavoritesDropdownRowLink,
  FavoritesDropdownThumb,
  FavoritesDropdownText,
  FavoritesDropdownTitle,
  FavoritesDropdownSectionLabel,
  FavoritesDropdownFooter,
  FavoritesDropdownButton,
} from "./FavoritesDropdownContent.styles";
import { Text } from "@radix-ui/themes";

const MY_FAVORITES_LABEL = "Все мои избранные";

export default function FavoritesDropdownContent() {
  const { refreshKey } = useLikes();
  const [summaries, setSummaries] = useState<MyAdSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getLikedAdSummaries().then((data) => {
      if (!cancelled) {
        setSummaries(data.slice(0, 3));
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (loading) {
    return (
      <FavoritesDropdownPanel>
        <Text size="2" color="gray">
          Загрузка...
        </Text>
      </FavoritesDropdownPanel>
    );
  }

  return (
    <FavoritesDropdownPanel>
      <FavoritesDropdownList>
        {summaries.map((s) => (
          <FavoritesDropdownRowLink href={s.href} key={`${s.entityType}-${s.publicId}`}>
            <FavoritesDropdownThumb>
              {s.thumbnailUrl ? (
                <Image
                  src={s.thumbnailUrl}
                  alt=""
                  fill
                  sizes="56px"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </FavoritesDropdownThumb>
            <FavoritesDropdownText>
              <FavoritesDropdownTitle>{s.title || "\u00A0"}</FavoritesDropdownTitle>
              <FavoritesDropdownSectionLabel>{s.sectionLabel}</FavoritesDropdownSectionLabel>
            </FavoritesDropdownText>
          </FavoritesDropdownRowLink>
        ))}
      </FavoritesDropdownList>
      <Separator size="4" />
      <FavoritesDropdownFooter>
        <FavoritesDropdownButton href="/private-zone/my-favorites">
          {MY_FAVORITES_LABEL}
        </FavoritesDropdownButton>
      </FavoritesDropdownFooter>
    </FavoritesDropdownPanel>
  );
}
