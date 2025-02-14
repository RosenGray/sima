import Loader from "@/components/Loader/Loader";
import { Button } from "@radix-ui/themes";
import { HTMLAttributes } from "react";

interface SubmitButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, "color"> {
  pending?: boolean;
  disabled?: boolean;
  text?: string;
  mt?: string;
  size?: "1" | "2" | "3" | "4";
}

export function SubmitButton({
  pending = false,
  disabled = false,
  text = "Submit",
  mt = "2",
  size = "3",
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      disabled={disabled || pending}
      variant={pending ? "surface" : "solid"}
      type="submit"
      size={size}
      mt={mt}
      {...props}
    >
      {pending ? <Loader isSpin width={500} height={500} /> : text}
    </Button>
  );
}
