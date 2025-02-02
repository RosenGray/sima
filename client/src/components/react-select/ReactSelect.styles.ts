import { GroupBase, StylesConfig } from "react-select";

export const styles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  control: (base,state) => ({
    ...base,
    backgroundColor: "var(--color-surface)",
    boxShadow: state.isFocused 
      ? "0 0 0 2px var(--color-focus)" // or whatever Radix focus ring variable you're using
      : base.boxShadow,
    borderColor: state.isFocused 
      ? "var(--color-accent-8)" 
      : "var(--color-border)",
    "&:hover": {
      borderColor: "var(--color-accent-8)"
    }
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--mauve-1)",
    border: '1px solid var(--white-a12)',
    padding: '10px',
  }),
  menuList: (base) => ({
    ...base,
    '::-webkit-scrollbar': {
      display: 'none', // Safari and Chrome
    },
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE 10+
  }),
  
  option: (base,state) => ({
    ...base,
    backgroundColor: state.isFocused ? 'var(--red-9)' : 'var(--mauve)', 
    cursor: 'pointer', 
    "&:hover": {
        backgroundColor: "var(--red-9)",
        borderRadius: '4px'
      }
  }),
//   valueContainer: (base) => ({
//     ...base,
//     backgroundColor: 'green'
//     // You can add other value container styles here
//   }),
  placeholder: (base) => ({
    ...base,
    color: "var(--red-11)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--red-11)",
  }),
  input: (base) => ({
    ...base,
    color: "var(--red-11)",
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "var(--red-11)",
  }),
};
