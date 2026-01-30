"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { chatRepository } from "../repository/ChatRepository";
import type { SerializedConversationWithMessages } from "../types/chat.types";

export type GetChatWithMessagesResult =
  | { success: true; chat: SerializedConversationWithMessages }
  | { success: false; error: string };

export async function getChatWithMessages(
  chatId: string
): Promise<GetChatWithMessagesResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Войдите в аккаунт" };
  }

  const chat = await chatRepository.getConversationByPublicId(chatId, user.id);
  if (!chat) {
    return { success: false, error: "Чат не найден" };
  }

  return { success: true, chat };
}
