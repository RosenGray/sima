import { FC, Ref, ReactNode } from "react";
import { TextField, Text, Box, Select, Flex } from "@radix-ui/themes";
import {
  FieldMetadata,
  getInputProps,
  getSelectProps,
} from "@conform-to/react";

interface AreaCodeSelectProps extends Select.RootProps {
  areaCodeField: FieldMetadata<
    number | string | string[] | (string | undefined)[] | undefined
  >;
}

interface PhoneFormFieldProps extends TextField.RootProps {
  areaCodeField: FieldMetadata<
    number | string | string[] | (string | undefined)[] | undefined
  >;
  field: FieldMetadata<
    number | string | string[] | (string | undefined)[] | undefined
  >;
  errors?: string[];
  ref?: Ref<HTMLInputElement>;
  children?: ReactNode;
  label?: string;
  _key?: string;
}

const AreaCodeSelect: FC<AreaCodeSelectProps> = ({ size, areaCodeField }) => {
  const { name } = getSelectProps(areaCodeField);
  return (
    <Select.Root size={size} name={name} defaultValue="03">
      <Select.Trigger />
      <Select.Content>
        <Select.Item value="02">02</Select.Item>
        <Select.Item value="03">03</Select.Item>
        <Select.Item value="04">04</Select.Item>
        <Select.Item value="08">08</Select.Item>
        <Select.Item value="09">09</Select.Item>
        <Select.Item value="050">050</Select.Item>
        <Select.Item value="057">057</Select.Item>
        <Select.Item value="052">052</Select.Item>
        <Select.Item value="054">054</Select.Item>
        <Select.Item value="072">072</Select.Item>
        <Select.Item value="073">073</Select.Item>
        <Select.Item value="074">074</Select.Item>
        <Select.Item value="076">076</Select.Item>
        <Select.Item value="077">077</Select.Item>
        <Select.Item value="053">053</Select.Item>
        <Select.Item value="058">058</Select.Item>
        <Select.Item value="055">055</Select.Item>
        <Select.Item value="051">051</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

const PhoneFormField: FC<PhoneFormFieldProps> = ({
  field,
  areaCodeField,
  placeholder,
  size,
  defaultValue,
  className,
  children,
  errors,
  ref,
  label,
  _key,
  ...rest
}) => {
  const { mb, mt, mr, ml } = rest;
  console.log('deffffffffff', defaultValue);

  return (
    <Box mb={mb} mt={mt} mr={mr} ml={ml}>
      {label && (
        <Text
          htmlFor={rest.id}
          as="label"
          size="3"
          weight="bold"
          style={{ lineHeight: "2" }}
          className={className}
        >
          {label}
        </Text>
      )}
      <Flex gap="2">
        <AreaCodeSelect size={size} areaCodeField={areaCodeField} />
        <span style={{ fontSize: "20px", alignSelf: "center" }}>-</span>
        <TextField.Root
          {...getInputProps(field, { type: "tel" })}
          key={_key}
          placeholder={placeholder}
          size={size}
          defaultValue={defaultValue}
          className={className}
          data-isvalid={field.valid}
          ref={ref}
          autoComplete="one-time-code"
          {...rest}
        >
          <TextField.Slot>{children}</TextField.Slot>
        </TextField.Root>
      </Flex>

      <Text as="p" align="center" weight="bold" size="2" color="red">
        {errors}
      </Text>
    </Box>
  );
};

export default PhoneFormField;
