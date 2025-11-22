import { MultiValue, Props, SingleValue } from "react-select";

export interface Option {
  value: string;
  label: string;
  fieldKey?: string;
}

export interface CustomSelectProps {
  maxSelectedOptions?: number;
  displayName?: string;
  customMenuCloseHandler?: () => void;
}

export interface SearchMultiSelectProps
  extends Omit<Props<Option, true>, "styles" | "classNames"> {
  options: MultiValue<Option>;
  selectedOptions: MultiValue<Option>;
  setAllSelectedFilterOptions: (
    paramName: string,
    options: MultiValue<Option>
  ) => void;
  maxSelectedOptions?: number;
  label?: string;
  paramName: string;
  displayName?: string;
}

export type AllSelectedFilterOptionsMap = Map<string, MultiValue<Option>>;
