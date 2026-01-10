import {
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  Props,
  SingleValue,
} from "react-select";

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
  isPortalTarget?: boolean;
}

export interface SearchSingleSelectProps
  extends Omit<Props<Option, false>, "styles" | "classNames" | "options"> {
  options: SingleValue<Option>[];
  selectedOptions: MultiValue<Option>;
  setAllSelectedFilterOptions: (
    paramName: string,
    options: MultiValue<Option>
  ) => void;
  label?: string;
  paramName: string;
  displayName?: string;
  isPortalTarget?: boolean;
}



export type AllSelectedFilterOptionsMap = Map<string, MultiValue<Option>>;
