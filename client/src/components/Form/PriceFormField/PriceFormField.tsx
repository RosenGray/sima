import { FC, Ref, ReactNode, useCallback, useState } from "react";
import { TextField } from "@radix-ui/themes";
import { FieldMetadata } from "@conform-to/react";
import BasicFormField from "../BasicFormField/BasicFormField";
import { formatNumberWithCommas } from "@/utils/common";

interface PriceFormFieldProps extends TextField.RootProps {
  field: FieldMetadata<
    number | string | string[] | (string | undefined)[] | undefined
  >;
  dataIsValid: boolean;
  errors?: string[];
  ref?: Ref<HTMLInputElement>;
  children?: ReactNode;
  label?: string;
  anotherLabel?: string;
  showEmailDisclaimer?: boolean;
  _key?: string;
  isMandatory?: boolean;
}

const PriceFormField: FC<PriceFormFieldProps> = ({
  field,
  placeholder,
  size,
  defaultValue,
  className,
  dataIsValid,
  errors,
  ref,
  label,
  anotherLabel,
  showEmailDisclaimer,
  _key,
  isMandatory,
}) => {
  const initialValue = defaultValue
    ? formatNumberWithCommas(defaultValue.toString())
    : "";

  const [value, setValue] = useState<string | undefined>(initialValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatNumberWithCommas(inputValue);
    setValue(formatted);
  }, []);
  return (
    <BasicFormField
      field={field}
      dataIsValid={dataIsValid}
      errors={errors}
      ref={ref}
      label={label}
      anotherLabel={anotherLabel}
      showEmailDisclaimer={showEmailDisclaimer}
      type="text"
      _key={_key}
      isMandatory={isMandatory}
      placeholder={placeholder}
      size={size}
      value={value}
      className={className}
      pattern="[\d,]*"
      inputMode="numeric"
      onChange={handleChange}
    >
      ₪
    </BasicFormField>
  );
};

export default PriceFormField;
