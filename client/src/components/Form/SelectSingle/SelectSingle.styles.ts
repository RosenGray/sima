import { GroupBase, StylesConfig } from "react-select";

export const styles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  control: (base, state) => ({
    ...base,
    minHeight: '40px',
    minWidth: '180px',
    backgroundColor: "var(--color-surface)",
    borderColor: state.isFocused ? "var(--accent-9)" : "var(--gray-6)",
    boxShadow: state.isFocused ? "0 0 0 2px var(--accent-5)" : "none",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: state.isFocused ? "var(--accent-9)" : "var(--gray-8)"
    }
  }),
  
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--brown-1)",
    border: '1px solid var(--gray-6)',
    borderRadius: 'var(--radius-2)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '4px',
    zIndex: 100,
  }),
  
  menuList: (base) => ({
    ...base,
    padding: '0',
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: 'var(--gray-3)',
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'var(--gray-8)',
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'var(--gray-9)',
    },
  }),
  
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? 'var(--accent-9)' 
      : state.isFocused 
        ? 'var(--accent-5)' 
        : 'transparent',
    color: state.isSelected ? 'var(--accent-contrast)' : 'var(--gray-12)',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: 'var(--radius-1)',
    transition: 'all 0.15s ease',
    border: state.isFocused && !state.isSelected 
      ? '1px solid var(--accent-8)' 
      : '1px solid transparent',
    outline: state.isFocused && !state.isSelected 
      ? '2px solid var(--accent-6)' 
      : 'none',
    outlineOffset: '-1px',
    "&:active": {
      backgroundColor: 'var(--accent-6)',
    }
  }),
  
  placeholder: (base) => ({
    ...base,
    color: "var(--gray-11)",
    fontSize: '14px',
  }),
  
  singleValue: (base) => ({
    ...base,
    color: "var(--gray-12)",
    fontSize: '14px',
  }),
  
  input: (base) => ({
    ...base,
    color: "var(--gray-12)",
    fontSize: '14px',
  }),
  
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--accent-4)',
    borderRadius: 'var(--radius-1)',
  }),
  
  multiValueLabel: (base) => ({
    ...base,
    color: 'var(--accent-12)',
    fontSize: '13px',
  }),
  
  multiValueRemove: (base) => ({
    ...base,
    color: 'var(--accent-11)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--accent-9)',
      color: 'var(--accent-contrast)',
    }
  }),
  
  clearIndicator: (base) => ({
    ...base,
    color: 'var(--gray-10)',
    cursor: 'pointer',
    padding: '8px',
    '&:hover': {
      color: 'var(--gray-12)',
    }
  }),
  
  dropdownIndicator: (base) => ({
    ...base,
    color: 'var(--gray-10)',
    cursor: 'pointer',
    padding: '8px',
    '&:hover': {
      color: 'var(--gray-12)',
    }
  }),
  
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: 'var(--gray-6)',
  }),
  
  noOptionsMessage: (base) => ({
    ...base,
    color: "var(--gray-11)",
    fontSize: '14px',
    padding: '12px',
  }),
};
