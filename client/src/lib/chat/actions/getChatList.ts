"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { chatRepository } from "../repository/ChatRepository";
import type { SerializedConversationListItem } from "../types/chat.types";

export type GetChatListResult =
  | { success: true; list: SerializedConversationListItem[] }
  | { success: false; error: string };

export async function getChatList(): Promise<GetChatListResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Войдите в аккаунт" };
  }

  try {
    const list = await chatRepository.getConversationsByUserId(user.id);
    return { success: true, list };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Не удалось загрузить чаты";
    return { success: false, error: message };
  }
}
