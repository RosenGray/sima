"use client";

import Link from "next/link";
import { Text } from "@radix-ui/themes";
import {
  IconCardContainer,
  IconCardContent,
  IconCardIcon,
  IconCardTitle,
  IconCardDescription,
} from "./IconCard.styles";

interface IconCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

const IconCard = ({ icon, title, description, href }: IconCardProps) => {
  const cardContent = (
    <IconCardContainer variant="surface" $isClickable={!!href}>
      <IconCardContent>
        <IconCardIcon>{icon}</IconCardIcon>
        <IconCardTitle>
          <Text size="5" weight="bold">
            {title}
          </Text>
        </IconCardTitle>
        <IconCardDescription>
          <Text size="3" color="gray">
            {description}
          </Text>
        </IconCardDescription>
      </IconCardContent>
    </IconCardContainer>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
};

export default IconCard;

