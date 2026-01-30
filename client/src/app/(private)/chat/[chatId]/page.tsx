import { FC } from "react";
import { notFound } from "next/navigation";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";
import { getChatList } from "@/lib/chat/actions/getChatList";
import { getChatWithMessages } from "@/lib/chat/actions/getChatWithMessages";
import ChatClient from "../_components/ChatClient/ChatClient";

interface ChatIdPageProps {
  params: Promise<{ chatId: string }>;
}

const ChatIdPage: FC<ChatIdPageProps> = async ({ params }) => {
  const user = await requireAuthOrRedirectTo("/auth/login");
  const { chatId } = await params;

  const [listResult, chatResult] = await Promise.all([
    getChatList(),
    getChatWithMessages(chatId),
  ]);

  const list = listResult.success ? listResult.list : [];

  if (!chatResult.success || !chatResult.chat) {
    notFound();
  }

  return (
    <ChatClient
      initialChatList={list}
      initialSelectedChat={chatResult.chat}
      initialMessages={chatResult.chat.messages}
      selectedChatId={chatId}
      currentUserId={user.id}
    />
  );
};

export default ChatIdPage;
