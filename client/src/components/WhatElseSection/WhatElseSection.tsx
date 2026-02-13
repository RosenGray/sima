"use client";

import React, { FC } from "react";
import { Box, Tabs, Text } from "@radix-ui/themes";
import { getWhatElseFlowTabs } from "@/lib/home/whatElseSectionConfig";
import {
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
