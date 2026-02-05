"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Separator, Text } from "@radix-ui/themes";
import { getLikedAdSummaries } from "@/lib/likes/actions/getLikedAdSummaries";
import type { LikedAdSummary } from "@/lib/likes/entityTypeToPath";
import {
  FavoritesDropdownPanel,
  FavoritesDropdownList,
  FavoritesDropdownRowLink,
  FavoritesDropdownThumb,
  FavoritesDropdownText,
  FavoritesDropdownTitle,
  FavoritesDropdownDescription,
  FavoritesDropdownPrice,
  FavoritesDropdownFooter,
  FavoritesDropdownButton,
} from "./FavoritesDropdownContent.styles";

const NO_PRICE_LABEL = "Цена не указана";
const MY_FAVORITES_LABEL = "Мои избранные";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  }).format(price);
}

export default function FavoritesDropdownContent() {
  const [summaries, setSummaries] = useState<LikedAdSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getLikedAdSummaries().then((data) => {
      if (!cancelled) {
        setSummaries(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
              <FavoritesDropdownDescription>{s.description || "\u00A0"}</FavoritesDropdownDescription>
              <FavoritesDropdownPrice>
                {s.price != null ? formatPrice(s.price) : NO_PRICE_LABEL}
              </FavoritesDropdownPrice>
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
