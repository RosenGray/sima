"use client";
import { FC } from "react";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { IconButton, Link, Text, HoverCard, Box } from "@radix-ui/themes";
import classNames from "classnames";
import styles from "./UserLoginIndicator.module.scss";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";
interface UserLoginIndicatorProps {
  buttonSize?: "1" | "2" | "3" | "4";
  hideOnMobile?: boolean;
}
const UserLoginIndicator: FC<UserLoginIndicatorProps> = ({
  buttonSize,
  hideOnMobile,
}) => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  if (!user)
    return (
      <IconButton
        className={classNames({
          [styles.UserDropdown__HideOnMobile]: hideOnMobile,
        })}
        size={buttonSize}
        color="green"
      >
        <Link href="/auth/login">
          <PersonIcon width="22" height="22" />
        </Link>
      </IconButton>
    );
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const userInitials = firstName[0] + lastName[0];

  return (
    <HoverCard.Root>
      <HoverCard.Trigger
        className={classNames({
          [styles.UserDropdown__HideOnMobile]: hideOnMobile,
        })}
      >
        <div className={styles.UserDropdown}>
          <Text as="span" size="3" weight="bold">
            {userInitials}
          </Text>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Content
        style={{
          padding: 0,
          borderRadius: 4,
          boxShadow: "0 3px 10px 0 rgba(0,0,0,0.15)",
          border: "1px solid var(--gray-6)",
        }}
      >
        <ul>
          <li className={styles.UserDropdown__Item}>
            <Box height="40px" className={styles.UserDropdown__Content}>
              <Link className={styles.UserDropdown__Button} href="/">
                <PersonIcon width="18" height="18" />
                <Text as="span" size="2" weight="bold" color="gray">
                  Личный кабинет
                </Text>
              </Link>
            </Box>
          </li>
          <li className={styles.UserDropdown__Item}>
            <Box height="40px" className={styles.UserDropdown__Content}>
              <button
                onClick={async () => {
                  await fetch("/api/auth/signout", {
                    credentials: "include",
                    method: "POST",
                  });
                  setUser(null);
                  router.push("/");
                }}
                className={styles.UserDropdown__Button}
                type="submit"
              >
                <ExitIcon width="18" height="18" />
                <Text size="2" weight="bold" color="gray" as="span">
                  Выйти
                </Text>
              </button>
            </Box>
          </li>
        </ul>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default UserLoginIndicator;
