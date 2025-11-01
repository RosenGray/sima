import { Button, Spinner } from "@radix-ui/themes";
import { HTMLAttributes } from "react";
import { Text } from "@radix-ui/themes";
interface SubmitButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "color"> {
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
      variant={pending ? "surface" : "soft"}
      type="submit"
      size={size}
      mt={mt}
      {...props}
    >
      {pending ? (
        <Spinner size="3" />
      ) : (
        <Text style={{ color: "var(--accent-12)" }} size="3">
          {text}
        </Text>
      )}
    </Button>
  );
}
