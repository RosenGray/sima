import { GroupBase, MultiValue, Props, SelectInstance } from "react-select";

export interface Option {
  value: string;
  label: string;
  fieldKey?: string;
}

export interface CustomSelectProps {
  maxSelectedOptions?: number;
  displayName?: string;
  paramSelectionOptions?: Option[];
  customMenuCloseHandler?: () => void;
  customMenuCheckHandler?: (options: MultiValue<Option>) => void;
}

export interface SearchMultiSelectProps
  extends Omit<Props<Option, true>, "styles" | "classNames"> {
  options: Option[];
  setAllSelectedFilterOptions: (options: MultiValue<Option>) => void;
  maxSelectedOptions?: number;
  label?: string;
  paramName: string;
  displayName?: string;
}

export type MultiSelectRef = SelectInstance<
  Option,
  true,
  GroupBase<Option>
> | null;
