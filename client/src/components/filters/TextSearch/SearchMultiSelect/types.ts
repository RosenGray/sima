import { Props } from "react-select";

export interface Option {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  maxSelectedOptions?: number;
  displayName?: string;
}

export interface SearchMultiSelectProps
  extends Omit<Props<Option, true>, "styles" | "classNames"> {
  options: Option[];
  maxSelectedOptions?: number;
  label?: string;
  paramName: string;
  displayName?: string;
}
