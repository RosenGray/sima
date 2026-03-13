import { FC } from "react";
import { Heading, Text, Separator } from "@radix-ui/themes";
import { SummaryCard, StatsGrid, MetricCell, MetricDivider } from "./StatsSummary.styles";

interface StatsSummaryProps {
  activeCount: number;
}

const StatsSummary: FC<StatsSummaryProps> = ({ activeCount }) => {
  const METRICS = [
    { value: String(activeCount), label: "Активные объявления" },
    // { value: "0", label: "Неактивные объявления" },
    // { value: "0", label: "Истёкшие объявления" },
    // { value: "0", label: "Опубликовано сегодня" },
  ];
  return (
    <SummaryCard variant="surface">
      <StatsGrid>
        {METRICS.map((metric, index) => (
          <MetricCell key={metric.label}>
            {index > 0 && (
              <MetricDivider>
                <Separator orientation="vertical" size="3" />
              </MetricDivider>
            )}
            <Heading size="7" weight="bold">
              {metric.value}
            </Heading>
            <Text size="2" color="gray">
              {metric.label}
            </Text>
          </MetricCell>
        ))}
      </StatsGrid>
    </SummaryCard>
  );
};

export default StatsSummary;
