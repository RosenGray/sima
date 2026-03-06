import { checkRateLimit } from "@/lib/rateLimit/rateLimit";
import { chatRepository } from "../repository/ChatRepository";
import { EmailService } from "@/lib/common/services/EmailService";

export async function notifyRecipientByEmail(
  conversationPublicId: string,
  senderId: string,
  messageBody: string
): Promise<void> {
  const ctx = await chatRepository.getNotificationContext(conversationPublicId, senderId);
  if (!ctx) return;

  const { allowed } = await checkRateLimit({
    key: `conv_${conversationPublicId}_${ctx.recipientEmail}`,
    action: "message_notification",
    limit: 1,
    windowSeconds: 900,
  });

  if (!allowed) return;

  const conversationUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL + "/private-zone/chat/" + conversationPublicId;

  const senderName = `${ctx.senderFirstName} ${ctx.senderLastName}`.trim();

  await EmailService.sendNewMessageNotificationEmail({
    recipientEmail: ctx.recipientEmail,
    recipientFirstName: ctx.recipientFirstName,
    senderName: senderName || "Пользователь",
    messageBody,
    adTitle: ctx.adTitle,
    conversationUrl,
  });
}
