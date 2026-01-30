"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { chatRepository } from "../repository/ChatRepository";
import type { SerializedMessage } from "../types/chat.types";

export type SendMessageResult =
  | { success: true; message: SerializedMessage }
  | { success: false; error: string };

export async function sendMessage(
  chatId: string,
  body: string
): Promise<SendMessageResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Войдите в аккаунт" };
  }

  const message = await chatRepository.createMessage(chatId, user.id, body);
  if (!message) {
    return { success: false, error: "Не удалось отправить сообщение" };
  }

  return { success: true, message };
}
