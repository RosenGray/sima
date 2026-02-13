"use client";

import React, { FC } from "react";
import Link from "next/link";
import { Box, Button, Flex, Heading, Tabs, Text } from "@radix-ui/themes";
import { getWhatElseFlowTabs } from "@/lib/home/whatElseSectionConfig";
import {
  ContactCard,
  ContactCardWrapper,
  FlowLink,
  InnerFlex,
  LinkItem,
  LinksList,
  SectionWrapper,
  TabsWrapper,
} from "./WhatElseSection.styles";

const WhatElseSection: FC = () => {
  const tabs = getWhatElseFlowTabs();
  const firstTabId = tabs[0]?.id ?? "transport";

  return (
    <SectionWrapper as="section">
      <InnerFlex>
        <ContactCardWrapper>
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
        </ContactCardWrapper>

        <TabsWrapper>
          <Tabs.Root defaultValue={firstTabId}>
            <Tabs.List size="2" color="gray">
              {tabs.map((tab) => (
                <Tabs.Trigger key={tab.id} value={tab.id}>
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Box pt="4">
              {tabs.map((tab) => (
                <Tabs.Content key={tab.id} value={tab.id}>
                  <LinksList>
                    {tab.links.map((link, idx) => (
                      <LinkItem key={`${link.href}-${idx}`}>
                        <Text size="2" as="span">
                          <FlowLink href={link.href}>{link.label}</FlowLink>
                        </Text>
                      </LinkItem>
                    ))}
                  </LinksList>
                </Tabs.Content>
              ))}
            </Box>
          </Tabs.Root>
        </TabsWrapper>
      </InnerFlex>
    </SectionWrapper>
  );
};

export default WhatElseSection;
