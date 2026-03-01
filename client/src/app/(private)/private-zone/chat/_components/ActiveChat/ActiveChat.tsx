"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Text, Button, TextField } from "@radix-ui/themes";
import {
  DotsHorizontalIcon,
  TrashIcon,
  Link2Icon,
} from "@radix-ui/react-icons";
import type {
  SerializedConversationWithMessages,
  SerializedMessage,
} from "@/lib/chat/types/chat.types";
import { sendMessage } from "@/lib/chat/actions/sendMessage";
import { deleteChat } from "@/lib/chat/actions/deleteChat";
import EmptyStateNoMessages from "../EmptyStateNoMessages/EmptyStateNoMessages";
import {
  ActiveChatHeader,
  ActiveChatHeaderInfo,
  ChatContextMenuTrigger,
  ChatContextMenu,
  ChatContextMenuItem,
  AdSubHeader,
  AdSubHeaderThumb,
  AdSubHeaderContent,
  ChatBody,
  MessageList,
  MessageBubble,
  InputStripe,
} from "./ActiveChat.styles";

interface ActiveChatProps {
  chat: SerializedConversationWithMessages;
  currentUserId: string;
  onMessagesUpdate?: (messages: SerializedMessage[]) => void;
}

function formatLastSeen(iso: string | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
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

const ActiveChat: React.FC<ActiveChatProps> = ({
  chat,
  currentUserId,
  onMessagesUpdate,
}) => {
  const router = useRouter();
  const [messages, setMessages] = useState<SerializedMessage[]>(chat.messages);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const otherName =
    [chat.otherParticipant.firstName, chat.otherParticipant.lastName]
      .filter(Boolean)
      .join(" ") || "Пользователь";
  const lastSeenFormatted = formatLastSeen(chat.otherParticipant.lastSeenAt);

  const handleSend = useCallback(async () => {
    const body = inputValue.trim();
    if (!body || sending) return;
    setSending(true);
    const result = await sendMessage(chat.publicId, body);
    setSending(false);
    if (result.success && result.message) {
      setMessages((prev) => [...prev, result.message!]);
      setInputValue("");
      onMessagesUpdate?.([...messages, result.message]);
    }
  }, [chat.publicId, inputValue, sending, messages, onMessagesUpdate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleDeleteChat = useCallback(async () => {
    if (deleting) return;
    setDeleting(true);
    const result = await deleteChat(chat.publicId);
    setDeleting(false);
    setMenuOpen(false);
    if (result.success) {
      router.push("/chat");
    }
  }, [chat.publicId, deleting, router]);

  React.useEffect(() => {
    setMessages(chat.messages);
  }, [chat.messages]);

  React.useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <>
      <ActiveChatHeader>
        <ActiveChatHeaderInfo>
          <Text size="4" weight="bold">
            {otherName}
          </Text>
          {lastSeenFormatted != null && (
            <Text size="2" color="gray">
              Был(а) в сети: {lastSeenFormatted}
            </Text>
          )}
        </ActiveChatHeaderInfo>
        <ChatContextMenuTrigger ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Меню чата"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DotsHorizontalIcon width={20} height={20} />
          </button>
          {menuOpen && (
            <ChatContextMenu>
              <ChatContextMenuItem
                $danger
                type="button"
                onClick={handleDeleteChat}
                disabled={deleting}
              >
                <TrashIcon width={18} height={18} />
                Удалить чат
              </ChatContextMenuItem>
            </ChatContextMenu>
          )}
        </ChatContextMenuTrigger>
      </ActiveChatHeader>

      <AdSubHeader>
        <AdSubHeaderThumb>
          <Image
            src={chat.adSnapshot.thumbnailUrl || "/placeholder.png"}
            alt=""
            fill
            style={{ objectFit: "cover" }}
            sizes="48px"
            unoptimized={chat.adSnapshot.thumbnailUrl?.startsWith("http")}
          />
        </AdSubHeaderThumb>
        <AdSubHeaderContent>
          <Text size="2" weight="medium" truncate>
            {chat.adSnapshot.title}
          </Text>
          {chat.adSnapshot.price != null && (
            <Text size="2" color="gray">
              {formatPrice(chat.adSnapshot.price)}
            </Text>
          )}
        </AdSubHeaderContent>
        {!chat.adSnapshot.adRemoved && (
          <Button size="2" variant="soft" asChild>
            <Link href={chat.adSnapshot.adLink}>К объявлению</Link>
          </Button>
        )}
      </AdSubHeader>

      <ChatBody>
        {messages.length === 0 ? (
          <EmptyStateNoMessages />
        ) : (
          <MessageList>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} $isOwn={msg.senderId === currentUserId}>
                <Text size="2">{msg.body}</Text>
              </MessageBubble>
            ))}
          </MessageList>
        )}
      </ChatBody>

      <InputStripe>
        <Box style={{ flexShrink: 0 }}>
          {/* <Link2Icon width={20} height={20} style={{ opacity: 0.5 }} /> */}
        </Box>
        <TextField.Root
          placeholder="Написать сообщение"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Button size="2" onClick={handleSend} disabled={sending || !inputValue.trim()}>
          Отправить
        </Button>
      </InputStripe>
    </>
  );
};

export default ActiveChat;
