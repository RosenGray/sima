import Loader from "@/components/Loader/Loader";
import { Button } from "@radix-ui/themes";


interface SubmitButtonProps {
  pending: boolean;
  text?: string;
  mt?: string;
  size?: "1" | "2" | "3" | "4";
}

export function SubmitButton({
  pending,
  text = "Submit",
  mt = "2",
  size = "3",
}: SubmitButtonProps) {
  return (
    <Button
      disabled={pending}
      variant={pending ? "surface" : "solid"}
      type="submit"
      size={size}
      mt={mt}
    >
      {pending ? <Loader isSpin width={500} height={500} /> : text}
    </Button>
  );
} 