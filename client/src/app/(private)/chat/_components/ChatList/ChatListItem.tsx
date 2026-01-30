"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@radix-ui/themes";
import type { SerializedConversationListItem } from "@/lib/chat/types/chat.types";
import {
  ChatListItemBox,
  ChatListItemThumbnailWrap,
  ChatListItemRemovedBadge,
  ChatListItemContent,
} from "./ChatListItem.styles";

interface ChatListItemProps {
  item: SerializedConversationListItem;
  isActive: boolean;
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  });
}

function formatPrice(price: number | undefined): string {
  if (price == null) return "";
  return new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(price);
}

const ChatListItem: React.FC<ChatListItemProps> = ({ item, isActive }) => {
  const name =
    [item.otherParticipant.firstName, item.otherParticipant.lastName]
      .filter(Boolean)
      .join(" ") || "User";

  return (
    <Link href={`/chat/${item.publicId}`} style={{ textDecoration: "none" }}>
      <ChatListItemBox $active={isActive}>
        <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
          <ChatListItemThumbnailWrap>
            <Image
              src={item.adSnapshot.thumbnailUrl || "/placeholder.png"}
              alt=""
              fill
              style={{ objectFit: "cover" }}
              sizes="48px"
              unoptimized={item.adSnapshot.thumbnailUrl?.startsWith("http")}
            />
            {item.adSnapshot.adRemoved && (
              <ChatListItemRemovedBadge align="center">Снято</ChatListItemRemovedBadge>
            )}
          </ChatListItemThumbnailWrap>
          <ChatListItemContent>
            <Text size="2" weight="bold" truncate>
              {item.adSnapshot.title}
            </Text>
            <Text size="1" color="gray">
              {name} {formatPrice(item.adSnapshot.price)}
            </Text>
            {item.lastMessageSnippet && (
              <Text size="1" color="gray" truncate>
                {item.lastMessageSnippet}
              </Text>
            )}
          </ChatListItemContent>
          {item.lastMessageAt && (
            <Text size="1" color="gray" style={{ flexShrink: 0 }}>
              {formatDate(item.lastMessageAt)}
            </Text>
          )}
        </div>
      </ChatListItemBox>
    </Link>
  );
};

export default ChatListItem;
