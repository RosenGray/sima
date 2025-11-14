import { FC, Ref } from "react";
import { TextArea, Text, TextAreaProps, Box } from "@radix-ui/themes";
import { FieldMetadata, getTextareaProps } from "@conform-to/react";

interface TextAreaFieldProps extends TextAreaProps {
  field: FieldMetadata<string | string[] | (string | undefined)[] | undefined>;
  dataIsValid: boolean;
  errors?: string[];
  ref?: Ref<HTMLTextAreaElement>;
  label?: string;
  isMandatory?: boolean;
}

const TextAreaField: FC<TextAreaFieldProps> = ({
  key,
  field,
  placeholder,
  size,
  className,
  dataIsValid,
  errors,
  ref,
  label,
  isMandatory,
  ...rest
}) => {
  return (
    <Box mb="15px">
      {label && (
        <Text
          htmlFor={rest.id}
          as="label"
          size="3"
          weight="bold"
          style={{
            lineHeight: "2",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          className={className}
        >
          {label}
          {isMandatory && (
            <Text as="span" size="3" weight="bold" color="tomato">
              *
            </Text>
          )}
        </Text>
      )}
      {!label && isMandatory && (
        <Text as="span" size="3" weight="bold" color="tomato">
          *
        </Text>
      )}
      <TextArea
        {...rest}
        {...getTextareaProps(field)}
        key={key}
        placeholder={placeholder}
        size={size}
        className={className}
        data-isvalid={dataIsValid}
        ref={ref}
      />
      <Text as="p" align="center" weight="bold" size="2" color="red">
        {errors}
      </Text>
    </Box>
  );
};

export default TextAreaField;
