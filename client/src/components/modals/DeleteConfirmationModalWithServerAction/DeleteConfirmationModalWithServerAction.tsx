"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";

interface DeleteConfirmationModalWithServerActionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
  title?: string;
  description?: string;
}

const DeleteConfirmationModalWithServerAction: React.FC<
  DeleteConfirmationModalWithServerActionProps
> = ({
  open,
  onOpenChange,
  onConfirm,
  title = "Удалить объявление?",
  description = "Вы уверены, что хотите удалить это объявление? Это действие нельзя отменить.",
  isPending,
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {description}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" disabled={isPending}>
              Отмена
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <form action={onConfirm}>
              <Button variant="solid" color="red" disabled={isPending}>
                {isPending ? "Удаление..." : "Удалить"}
              </Button>
            </form>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteConfirmationModalWithServerAction;
