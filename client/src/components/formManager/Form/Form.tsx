import { FC, ReactNode } from "react";
import { FormStatus, useFormStatus } from "react-dom";

interface FormProps {
  children: (formStatus: FormStatus) => ReactNode;
  action: string | ((formData: FormData) => void);
  noValidate?: boolean;
}

interface FormStatusWrapperProps {
  children: (formStatus: FormStatus) => ReactNode;
}

const FormStatusWrapper: FC<FormStatusWrapperProps> = ({ children }) => {
  const formStatus = useFormStatus();
  const renderChildren = () => {
    return children(formStatus);
  };
  return <>{renderChildren()}</>;
};

const Form: FC<FormProps> = ({ children, ...rest }) => {
  return (
    <form {...rest}>
      <FormStatusWrapper>
        {(formStatus) => children(formStatus)}
      </FormStatusWrapper>
    </form>
  );
};

export default Form;
