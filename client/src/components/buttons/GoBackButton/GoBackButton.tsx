"use client";
import { Button, ButtonProps } from "@radix-ui/themes";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { FC } from "react";


const GoBackButton:FC<ButtonProps> = ({...rest}) => {
  const router = useRouter();
  return (
    <Button {...rest} size="3" onClick={() => router.back()} style={{cursor: "pointer"}}>
      <ReloadIcon width="18" height="18" />
      Go Back
    </Button>
  );
};

export default GoBackButton;
