import { FC } from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Badge, Text } from "@radix-ui/themes";
import {
  CardWrapper,
  CardInner,
  TextBlock,
} from "./ChatNotificationCard.styles";

interface ChatNotificationCardProps {
  count: number;
}

function formatConversationLabel(n: number): string {
  if (n === 0) return "У вас нет диалогов в чате.";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `У вас ${n} диалог в чате.`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `У вас ${n} диалога в чате.`;
  return `У вас ${n} диалогов в чате.`;
}

const ChatNotificationCard: FC<ChatNotificationCardProps> = ({ count }) => {
  return (
    <CardWrapper variant="surface">
      <CardInner>
        <Badge color="orange" size="1">
          {count}
        </Badge>
        <ChatBubbleIcon width={20} height={20} />
        <TextBlock>
          <Text size="2" color="gray">
            {formatConversationLabel(count)}
          </Text>
        </TextBlock>
      </CardInner>
    </CardWrapper>
  );
};

export default ChatNotificationCard;
