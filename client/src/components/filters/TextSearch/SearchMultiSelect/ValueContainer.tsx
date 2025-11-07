import { Props, ValueContainerProps } from "react-select";
import { Option, CustomSelectProps } from "./types";
import { components } from "react-select";
import React from "react";

// Custom ValueContainer to show count instead of individual values
const ValueContainer = ({
  children,
  ...props
}: ValueContainerProps<Option, true>) => {
  const { getValue, hasValue } = props;
  const selectedCount = getValue().length;
  const customProps = props.selectProps as Props<Option, true> &
    CustomSelectProps;
  const maxSelectedOptions = customProps.maxSelectedOptions;
  const displayName = customProps.displayName || "Items";
  const isAtMax =
    maxSelectedOptions !== undefined && selectedCount >= maxSelectedOptions;

  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }

  return (
    <components.ValueContainer {...props}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          overflow: "hidden",
        }}
      >
        {/* Show "Category (2)" instead of individual selections */}
        <span
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: isAtMax ? "var(--accent-9)" : undefined,
          }}
        >
          ({selectedCount}
          {maxSelectedOptions && `/${maxSelectedOptions}`}) {displayName}
        </span>
      </div>
      {/* Keep the input for typing/searching */}
      {React.Children.map(children, (child) =>
        React.isValidElement(child) &&
        (child.type as typeof components.Input) === components.Input
          ? child
          : null
      )}
    </components.ValueContainer>
  );
};

export default ValueContainer;
