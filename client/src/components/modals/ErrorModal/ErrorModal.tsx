import { FC } from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import classes from "./ErrorModal.module.scss";
import { ErrorsFromServer, ServerErrorType } from "@/fetch/fetch.types";

interface ErrorModalProps extends Dialog.RootProps {
  errorMessage?: string | ErrorsFromServer[];
  errorType?: ServerErrorType;
}

const ErrorModal: FC<ErrorModalProps> = ({ open, onOpenChange, errorType }) => {
  const errorMessage =
    errorType === ServerErrorType.NotAuthorized
      ? "Неверный логин или пароль"
      : "Мы столкнулись с непредвиденной ошибкой. Пожалуйста, попробуйте еще раз";
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
          <Dialog.Description size="3">
            {errorMessage}
          </Dialog.Description>
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
