"use client";

import React, { FC } from "react";
import Link from "next/link";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import {
  ContactCard,
  FooterContainer,
  FooterInner,
  FooterLeft,
  FooterRight,
} from "./Footer.styles";

const Footer: FC = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterLeft>
          <ContactCard size="2">
            <Flex direction="column" gap="3">
              <Heading size="4" weight="bold">
                Есть вопросы? Мы с радостью поможем!
              </Heading>
              <Text size="2" color="gray">
                Пн–Пт с 08:30 до 16:00
              </Text>
              <Button variant="outline" color="amber" size="3" asChild>
                <Link href="#">Связаться с нами</Link>
              </Button>
            </Flex>
          </ContactCard>
        </FooterLeft>
        <FooterRight />
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;
