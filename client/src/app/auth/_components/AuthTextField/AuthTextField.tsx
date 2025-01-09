import { FC, LegacyRef, ReactNode } from "react";
import { TextField, Text } from "@radix-ui/themes";

interface AuthTextFieldProps extends TextField.RootProps {
  dataIsValid: boolean;
  errors?: string[];
  ref?:LegacyRef<HTMLInputElement>
  children?:ReactNode;
}

const AuthTextField: FC<AuthTextFieldProps> = ({
  key,
  placeholder,
  size,
  defaultValue,
  className,
  dataIsValid,
  children,
  errors,
  ref,
  ...rest
}) => {
  return (
    <>
      <TextField.Root
        {...rest}
        key={key}
        placeholder={placeholder}
        size={size}
        defaultValue={defaultValue}
        className={className}
        data-isvalid={dataIsValid}
        ref={ref}
        >
        <TextField.Slot>{children}</TextField.Slot>
      </TextField.Root>
      <Text as="p" align="center" weight="bold" size="2" color="red">
        {errors}
      </Text>
    </>
  );
};

export default AuthTextField;
