import { FC } from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import classes from "./ErrorModal.module.scss";
import { ErrorsFromServer } from "@/types/form.types";

interface ErrorModalProps extends Dialog.RootProps {
  errorMessage?: string | ErrorsFromServer[]
}

const ErrorModal: FC<ErrorModalProps> = ({ open, onOpenChange }) => {
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
            Мы столкнулись с непредвиденной ошибкой. Пожалуйста, попробуйте еще
            раз
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
