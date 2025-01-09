import { Heading, Box, Flex, Text, Checkbox } from "@radix-ui/themes";

import * as RadixUiTooltip from "@radix-ui/react-tooltip";
import styles from "./ValidationCheckListTooltip.module.scss";
import Tooltip from "../Tooltip/Tooltip";
import { ReactNode } from "react";
import { ToolTipValidationItem } from "./validationCheckListTooltip.types";


interface ValidationCheckListTooltipProps extends RadixUiTooltip.TooltipProps {
  children: ReactNode;
  title: string;
  placeHolderItems: Array<ToolTipValidationItem>;
  itemsAfterValidation: Array<ToolTipValidationItem>;
  isValid: boolean;
  isDirty: boolean;
}
const ValidationCheckListTooltip = ({
  title,
  placeHolderItems,
  itemsAfterValidation,
  children,
  isValid,
  isDirty,
  open,
}: ValidationCheckListTooltipProps) => {
  const labelSet = new Set(itemsAfterValidation.map((item) => item.label));

  return (
    <Tooltip
      open={open}
      content={
        <>
          <Heading as="h1" size="6" mb="10px">
            {title}
          </Heading>
          <Box className={styles.listWrapper}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {placeHolderItems.map((item) => {
                const { id, label, isHidden } = item;
                const isValidStep = !labelSet.has(label);
                const isChecked = (isValid && isDirty) || (isDirty && isValidStep);

                if (isHidden) return null;

                return (
                  <li key={id}>
                    <Text as="label" size="2">
                      <Flex gap="2">
                        <Checkbox checked={isChecked} />
                        {label}
                      </Flex>
                    </Text>
                  </li>
                );
              })}
            </ul>
          </Box>
        </>
      }
    >
      {children}
    </Tooltip>
  );
};

export default ValidationCheckListTooltip;
