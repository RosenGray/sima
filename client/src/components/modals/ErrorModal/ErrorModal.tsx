import { FC, ReactNode } from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import classes from "./ErrorModal.module.scss";
import { ErrorsFromServer } from "@/fetch/fetch.types";

interface ErrorModalProps extends Dialog.RootProps {
  errorMessage?: string | ErrorsFromServer[];
}

const parseErrorMessage = (
  errorMessage?: string | ErrorsFromServer[]
): string | ReactNode => {
  let errorMessageToShow: string | ReactNode =
    "Мы столкнулись с непредвиденной ошибкой. Пожалуйста, попробуйте еще раз";
  if (!errorMessage) return errorMessageToShow;

  if (typeof errorMessage === "string") {
    errorMessageToShow = errorMessage;
  } else if (Array.isArray(errorMessage)) {
    errorMessageToShow = (
      <ul>
        {errorMessage.map((error) => (
          <li key={error.message}>{error.message}</li>
        ))}
      </ul>
    );
  }
  return errorMessageToShow;
};
//Неверный логин или пароль
const ErrorModal: FC<ErrorModalProps> = ({
  open,
  onOpenChange,
  errorMessage,
}) => {
  const errorMessageToShow = parseErrorMessage(errorMessage);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className={classes.ErrorModal__Content}>
        <Flex
          direction="column"
          align="center"
          gap="2"
          justify="center"
          mb="30px"
        >
          <ExclamationTriangleIcon color="red" width={40} height={40} />
          <Dialog.Title
            size={{
              initial: "4",
              xs: "6",
              sm: "7",
            }}
          >
            Упс! Что-то пошло не так
          </Dialog.Title>
          <Dialog.Description size="3">{errorMessageToShow}</Dialog.Description>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="yellow">
              отмена
            </Button>
          </Dialog.Close>
          <Button
            color="red"
            variant="soft"
            onClick={() => (window.location.href = "/")}
          >
            <ReloadIcon width="16" height="16" />
            вернуться домой
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ErrorModal;
