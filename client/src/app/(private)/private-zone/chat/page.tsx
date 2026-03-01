import { FC } from "react";
import { requireAuthOrRedirectTo } from "@/lib/auth/utils/auth.utils";
import { getChatList } from "@/lib/chat/actions/getChatList";
import ChatClient from "./_components/ChatClient/ChatClient";

const ChatPage: FC = async () => {
  const user = await requireAuthOrRedirectTo("/auth/login");
  const listResult = await getChatList();

  const list = listResult.success ? listResult.list : [];

  return (
    <ChatClient
      initialChatList={list}
      initialSelectedChat={null}
      initialMessages={null}
      selectedChatId={null}
      currentUserId={user.id}
    />
  );
};

export default ChatPage;
