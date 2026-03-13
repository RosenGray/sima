import { FC } from "react";

import { Text, Separator } from "@radix-ui/themes";
import {
  SectionWrapper,
  SectionHeader,
  InnerCard,
  MetricRow,
  ColorDot,
  MetricLabel,
  MetricCount,
  MetricRowSeparator,
} from "./GeneralDataSection.styles";

interface GeneralDataSectionProps {
  views: number;
  likes: number;
  phoneClicks: number;
}

const GeneralDataSection: FC<GeneralDataSectionProps> = ({
  views,
  likes,
  phoneClicks,
}) => {
  return (
    <SectionWrapper>
      <SectionHeader>
        {/* <Button variant="outline" size="2">
          Последние 7 дней
          <ChevronDownIcon />
        </Button> */}
        <Text weight="bold" size="3">
          Общие данные
        </Text>
      </SectionHeader>
      <InnerCard variant="surface">
        <MetricRow>
          <MetricLabel>
            <ColorDot style={{ background: "var(--purple-9)" }} />
            <Text size="2">Просмотры объявления</Text>
          </MetricLabel>
          <MetricCount>
            <Text size="2" weight="bold">
              {views}
            </Text>
          </MetricCount>
        </MetricRow>
        <MetricRowSeparator>
          <Separator size="4" />
        </MetricRowSeparator>
        <MetricRow>
          <MetricLabel>
            <ColorDot style={{ background: "var(--red-9)" }} />
            <Text size="2">Сохранения объявления</Text>
          </MetricLabel>
          <MetricCount>
            <Text size="2" weight="bold">
              {likes}
            </Text>
          </MetricCount>
        </MetricRow>
        <MetricRowSeparator>
          <Separator size="4" />
        </MetricRowSeparator>
        <MetricRow>
          <MetricLabel>
            <ColorDot style={{ background: "var(--teal-9)" }} />
            <Text size="2">Клики по номеру телефона</Text>
          </MetricLabel>
          <MetricCount>
            <Text size="2" weight="bold">
              {phoneClicks}
            </Text>
          </MetricCount>
        </MetricRow>
      </InnerCard>
    </SectionWrapper>
  );
};

export default GeneralDataSection;
