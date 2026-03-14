import { Heading, Text, Button } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { WelcomeWrapper, WelcomeDivider } from "./page.styles";

export default async function PrivateZonePage() {
  const user = await getCurrentUser();
  const firstName = user?.firstName ?? "Гость";

  return (
    <WelcomeWrapper>
      <Heading size="8" weight="bold">
        Добро пожаловать,{" "}
        <span style={{ color: "var(--red-9)" }}>{firstName}</span>!
      </Heading>
      <Text size="3" color="gray">
        Здесь вы управляете своими объявлениями и общаетесь с покупателями.
      </Text>
      <WelcomeDivider />
      <Button size="3" variant="solid" color="red" asChild>
        <Link href="/publish-ad">
          <PlusCircledIcon />
          Разместить объявление
        </Link>
      </Button>
    </WelcomeWrapper>
  );
}
