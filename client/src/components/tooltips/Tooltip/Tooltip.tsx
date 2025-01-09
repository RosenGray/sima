"use client";
import * as RadixUiTooltip from "@radix-ui/react-tooltip";
import { FC, ReactNode, useEffect, useState } from "react";
import styles from "./Tooltip.module.scss";
import { Box } from "@radix-ui/themes";

interface TooltipProps extends RadixUiTooltip.TooltipProps {
  content: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ content, children , open }) => {
  const [container, setContainer] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const element =
      document.getElementById("radix-themes-portal") ?? document.body;
    setContainer(element);
  }, []);

  return (
    <RadixUiTooltip.Provider>
      <RadixUiTooltip.Root open={open} delayDuration={0}>
        <RadixUiTooltip.Trigger asChild className={styles.tooltipTrigger}>
          {children}
        </RadixUiTooltip.Trigger>
        <RadixUiTooltip.Portal container={container}>
          <RadixUiTooltip.Content className={styles.tooltipContent}>
            <Box p="20px">{content}</Box>
            <RadixUiTooltip.Arrow className={styles.tooltipArrow} />
          </RadixUiTooltip.Content>
        </RadixUiTooltip.Portal>
      </RadixUiTooltip.Root>
    </RadixUiTooltip.Provider>
  );
};

export default Tooltip;
