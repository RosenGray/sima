import { components } from "react-select";
import { Option } from "./types";
// Custom Option component with checkbox
// Note: react-select automatically passes `isDisabled` prop here based on the
// `isOptionDisabled` function result (react-select calls isOptionDisabled for each

import { OptionProps } from "react-select";
import { Checkbox } from "@radix-ui/themes";

// option and passes the boolean result as `isDisabled` in OptionProps)
const OptionWithCheckbox = (props: OptionProps<Option>) => {
  const isDisabled = props.isDisabled || false;
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Checkbox
          size="3"
          checked={props.isSelected}
          onChange={() => null}
          disabled={isDisabled}
          style={{ margin: 0, cursor: isDisabled ? "not-allowed" : "pointer" }}
        />
        <label
          style={{
            margin: 0,
            cursor: isDisabled ? "not-allowed" : "pointer",
            opacity: isDisabled ? 0.5 : 1,
          }}
        >
          {props.label}
        </label>
      </div>
    </components.Option>
  );
};

export default OptionWithCheckbox;
