"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@radix-ui/themes";
import type {
  AdSnapshotStatus,
  SerializedConversationListItem,
} from "@/lib/chat/types/chat.types";
import {
  ChatListItemBox,
  ChatListItemThumbnailWrap,
  ChatListItemContent,
  ChatListItemStatusMessage,
} from "./ChatListItem.styles";

const GHOST_STATUSES: AdSnapshotStatus[] = ["archived", "expired", "pending"];
const STATUS_UNAVAILABLE = "Объявление больше недоступно";
const STATUS_REMOVED_BY_OWNER = "Объявление удалено владельцем";

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

function getDisplayMode(status: AdSnapshotStatus | undefined): "active" | "ghost" | "deleted" {
  const s = status ?? "active";
  if (s === "deleted") return "deleted";
  if (GHOST_STATUSES.includes(s)) return "ghost";
  return "active";
}

const ChatListItem: React.FC<ChatListItemProps> = ({ item, isActive }) => {
  const name =
    [item.otherParticipant.firstName, item.otherParticipant.lastName]
      .filter(Boolean)
      .join(" ") || "User";

  const status = item.adSnapshot.status ?? "active";
  const displayMode = getDisplayMode(status);
  const isGhost = displayMode === "ghost";
  const isDeleted = displayMode === "deleted";

  return (
    <Link href={`/private-zone/chat/${item.publicId}`} style={{ textDecoration: "none" }}>
      <ChatListItemBox $active={isActive}>
        <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
          {!isDeleted && (
            <ChatListItemThumbnailWrap $ghost={isGhost}>
              <Image
                src={item.adSnapshot.thumbnailUrl || "/placeholder.png"}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                sizes="48px"
                unoptimized={item.adSnapshot.thumbnailUrl?.startsWith("http")}
              />
            </ChatListItemThumbnailWrap>
          )}
          <ChatListItemContent>
            <Text size="2" weight="bold" truncate>
              {item.adSnapshot.title}
            </Text>
            {isDeleted ? (
              <ChatListItemStatusMessage size="1">
                {STATUS_REMOVED_BY_OWNER}
              </ChatListItemStatusMessage>
            ) : isGhost ? (
              <ChatListItemStatusMessage size="1">
                {STATUS_UNAVAILABLE}
              </ChatListItemStatusMessage>
            ) : (
              <Text size="1" color="gray">
                {name} {formatPrice(item.adSnapshot.price)}
              </Text>
            )}
            {!isDeleted && item.lastMessageSnippet && (
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
