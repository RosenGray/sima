import { logoutUser } from "@/lib/auth/actions/logout";
import { Button } from "@radix-ui/themes";

export function LogoutButton() {
  return (
    <form action={logoutUser}>
      <Button style={{cursor: "pointer"}} type="submit" variant="surface" size="2">
        Logout
      </Button>
    </form>
  );
}
