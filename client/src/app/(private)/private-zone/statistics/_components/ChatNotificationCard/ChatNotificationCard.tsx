import { FC } from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Badge, Text } from "@radix-ui/themes";
import { CardWrapper, CardInner, TextBlock } from "./ChatNotificationCard.styles";

const ChatNotificationCard: FC = () => {
  return (
    <CardWrapper variant="surface">
      <CardInner>
        <Badge color="orange" size="1">0</Badge>
        <ChatBubbleIcon width={20} height={20} />
        <TextBlock>
          <Text size="2" color="gray">
            У вас нет новых сообщений в чате. Сообщения ждут вас на мобильном.
          </Text>
        </TextBlock>
      </CardInner>
    </CardWrapper>
  );
};

export default ChatNotificationCard;
