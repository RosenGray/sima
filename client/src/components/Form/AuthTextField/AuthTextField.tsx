import { FC, ReactNode, Ref } from "react";
import {  Text, TextField } from "@radix-ui/themes";
import { AuthTextFieldRoot } from "./AuthTextField.styles";

interface AuthTextFieldProps extends TextField.RootProps {
  dataIsValid: boolean;
  errors?: string[];
  ref?: Ref<HTMLInputElement>;
  children?: ReactNode;
  _key?: string;
}

const AuthTextField: FC<AuthTextFieldProps> = ({
  placeholder,
  size,
  defaultValue,
  className,
  dataIsValid,
  children,
  errors,
  ref,
  _key,
  ...rest
}) => {
  return (
    <>
      <Text
        htmlFor={rest.id}
        as="label"
        size="2"
        mb="1"
        weight="medium"
        className={className}
      >
        {placeholder}
      </Text>
      <AuthTextFieldRoot
        {...rest}
        key={_key}
        placeholder={placeholder}
        size={size}
        defaultValue={defaultValue}
        className={className}
        data-isvalid={dataIsValid}
        ref={ref}
      >
        <TextField.Slot>{children}</TextField.Slot>
      </AuthTextFieldRoot>
      <Text as="p" align="center" weight="bold" size="2" color="red">
        {errors}
      </Text>
    </>
  );
};

export default AuthTextField;
