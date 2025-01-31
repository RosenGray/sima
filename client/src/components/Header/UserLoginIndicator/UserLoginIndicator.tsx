"use client";
import { FC } from "react";
import { User } from "@/types/auth/auth.types";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  IconButton,
  Link,
  Text,
  HoverCard,
  Card,
  Box,
} from "@radix-ui/themes";
import classNames from "classnames";
import styles from "./UserLoginIndicator.module.scss";
import { Icon } from "@radix-ui/themes/src/components/callout.jsx";
import { logout } from "@/app/auth/_lib/actions";
console.log(styles);
interface UserLoginIndicatorProps {
  user: User | null;
  buttonSize?: "1" | "2" | "3" | "4";
  hideOnMobile?: boolean;
}
const UserLoginIndicator: FC<UserLoginIndicatorProps> = ({
  user,
  buttonSize,
  hideOnMobile,
}) => {
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

  const userInitials = user.firstName[0] + user.lastName[0];

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <div className={styles.UserDropdown}>
          <Text as="span" size="3" weight="bold">
            {userInitials}
          </Text>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Content style={{ padding: 0 }}>
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
              <form action={logout}>
                <button className={styles.UserDropdown__Button} type="submit">
                  <ExitIcon width="18" height="18" />
                  <Text size="2" weight="bold" color="gray" as="span">
                    Выйти
                  </Text>
                </button>
              </form>
            </Box>
          </li>
        </ul>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default UserLoginIndicator;
