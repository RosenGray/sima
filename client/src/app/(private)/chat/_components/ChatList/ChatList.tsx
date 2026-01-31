"use client";

import React from "react";
import { Heading } from "@radix-ui/themes";
import type { SerializedConversationListItem } from "@/lib/chat/types/chat.types";
import ChatListItem from "./ChatListItem";
import { ChatListHeader, ChatListScroll } from "../ChatClient/ChatClient.styles";

interface ChatListProps {
  list: SerializedConversationListItem[];
  activeChatId: string | null;
}

const ChatList: React.FC<ChatListProps> = ({ list, activeChatId }) => {
  return (
    <>
      <ChatListHeader align="center">
        <Heading size="4">Чаты</Heading>
      </ChatListHeader>
      <ChatListScroll>
        {list.length === 0 ? (
          <div style={{ padding: "var(--space-4)", color: "var(--gray-11)" }}>
            Пока нет диалогов.
          </div>
        ) : (
          list.map((item) => (
            <ChatListItem
              key={item.publicId}
              item={item}
              isActive={activeChatId === item.publicId}
            />
          ))
        )}
      </ChatListScroll>
    </>
  );
};

export default ChatList;
