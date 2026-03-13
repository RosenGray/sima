import { FC } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button, Text, Separator } from "@radix-ui/themes";
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

const METRICS = [
  { color: "var(--purple-9)", label: "Просмотры объявления" },
  { color: "var(--red-9)", label: "Сохранения объявления" },
  { color: "var(--teal-9)", label: "Клики по номеру телефона" },
];

const GeneralDataSection: FC = () => {
  return (
    <SectionWrapper>
      <SectionHeader>
        <Button variant="outline" size="2">
          Последние 7 дней
          <ChevronDownIcon />
        </Button>
        <Text weight="bold" size="3">
          Общие данные
        </Text>
      </SectionHeader>
      <InnerCard variant="surface">
        {METRICS.map((metric, index) => (
          <div key={metric.label}>
            {index > 0 && (
              <MetricRowSeparator>
                <Separator size="4" />
              </MetricRowSeparator>
            )}
            <MetricRow>
              <MetricLabel>
                <ColorDot style={{ background: metric.color }} />
                <Text size="2">{metric.label}</Text>
              </MetricLabel>
              <MetricCount>
                <Text size="2" weight="bold">
                  0
                </Text>
              </MetricCount>
            </MetricRow>
          </div>
        ))}
      </InnerCard>
    </SectionWrapper>
  );
};

export default GeneralDataSection;
