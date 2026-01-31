"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { chatRepository } from "../repository/ChatRepository";

export type DeleteChatResult =
  | { success: true }
  | { success: false; error: string };

export async function deleteChat(chatId: string): Promise<DeleteChatResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Войдите в аккаунт" };
  }

  const deleted = await chatRepository.deleteConversationForUser(chatId, user.id);
  if (!deleted) {
    return { success: false, error: "Чат не найден" };
  }

  return { success: true };
}
