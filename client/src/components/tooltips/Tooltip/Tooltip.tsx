"use client";
import * as RadixUiTooltip from "@radix-ui/react-tooltip";
import { FC, ReactNode, useEffect, useState } from "react"; 
import { Box } from "@radix-ui/themes";
import { TooltipArrow, TooltipContent, TooltipTrigger } from "./Tooltip.styles";
interface TooltipProps extends RadixUiTooltip.TooltipProps {
  content: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ content, children, open }) => {
  const [container, setContainer] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const element =
      document.getElementById("radix-themes-portal") ?? document.body;
    setContainer(element);
  }, []);

  return (
    <RadixUiTooltip.Provider>
      <RadixUiTooltip.Root open={open} delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <RadixUiTooltip.Portal container={container}>
          <TooltipContent>
            <Box p="20px">{content}</Box>
            <TooltipArrow />
          </TooltipContent>
        </RadixUiTooltip.Portal>
      </RadixUiTooltip.Root>
    </RadixUiTooltip.Provider>
  );
};

export default Tooltip;
