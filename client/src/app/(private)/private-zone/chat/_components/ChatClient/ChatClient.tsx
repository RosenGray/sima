"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import type {
  SerializedConversationListItem,
  SerializedConversationWithMessages,
  SerializedMessage,
} from "@/lib/chat/types/chat.types";
import { getChatWithMessages } from "@/lib/chat/actions/getChatWithMessages";
import ChatList from "../ChatList/ChatList";
import ActiveChat from "../ActiveChat/ActiveChat";
import {
  ChatPageContainer,
  ChatLayoutCard,
  ChatListPanel,
  ActiveChatPanel,
  PlaceholderPanel,
  ChatBackBar,
} from "./ChatClient.styles";

const POLL_INTERVAL_MS = 30_000;

interface ChatClientProps {
  initialChatList: SerializedConversationListItem[];
  initialSelectedChat: SerializedConversationWithMessages | null;
  initialMessages: SerializedMessage[] | null;
  selectedChatId: string | null;
  currentUserId: string;
}

const ChatClient: React.FC<ChatClientProps> = ({
  initialChatList,
  initialSelectedChat,
  initialMessages,
  selectedChatId,
  currentUserId,
}) => {
  const [chatList, setChatList] = useState(initialChatList);
  const [selectedChat, setSelectedChat] = useState(initialSelectedChat);
  const [messages, setMessages] = useState(initialMessages ?? []);

  const refreshChat = useCallback(async (chatId: string) => {
    const result = await getChatWithMessages(chatId);
    if (result.success && result.chat) {
      setSelectedChat(result.chat);
      setMessages(result.chat.messages);
    }
  }, []);

  useEffect(() => {
    if (!selectedChatId) return;
    const interval = setInterval(() => {
      refreshChat(selectedChatId);
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [selectedChatId, refreshChat]);

  const handleMessagesUpdate = useCallback((next: SerializedMessage[]) => {
    setMessages(next);
  }, []);

  return (
    <ChatPageContainer>
      <ChatLayoutCard>
        <ChatListPanel $hideOnMobile={!!selectedChatId}>
          <ChatList list={chatList} activeChatId={selectedChatId} />
        </ChatListPanel>

        <ActiveChatPanel $hideOnMobile={!selectedChatId}>
          {selectedChat ? (
            <>
              <ChatBackBar align="center" gap="2">
                <Button size="1" variant="ghost" asChild>
                  <Link href="/chat">
                    <ArrowLeftIcon />
                    К списку чатов
                  </Link>
                </Button>
              </ChatBackBar>
              <ActiveChat
                chat={{
                  ...selectedChat,
                  messages,
                }}
                currentUserId={currentUserId}
                onMessagesUpdate={handleMessagesUpdate}
              />
            </>
          ) : (
            <PlaceholderPanel direction="column" align="center" justify="center" gap="2">
              <p>Выберите чат</p>
            </PlaceholderPanel>
          )}
        </ActiveChatPanel>
      </ChatLayoutCard>
    </ChatPageContainer>
  );
};

export default ChatClient;
