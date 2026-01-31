"use client";

import React from "react";
import Link from "next/link";
import { Avatar, Flex } from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { logoutUser } from "@/lib/auth/actions/logout";
import { PRIVATE_ZONE_NAV_LINKS } from "../../constants/privateZoneNavLinks";
import {
  SidebarInner,
  SidebarUserBlock,
  SidebarUserName,
  SidebarUserEmail,
  SidebarNavList,
  SidebarNavLink,
  SidebarNavLinkLabel,
  SidebarLogoutBlock,
  SidebarLogoutLabel,
} from "./PrivateZoneSidebarContent.styles";

export default function PrivateZoneSidebarContent() {
  const { user } = useAuth();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const fullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : "Пользователь";
  const initials = user?.firstName?.[0] && user?.lastName?.[0]
    ? `${user.firstName[0]}${user.lastName[0]}`
    : "?";

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <SidebarInner direction="column" gap="4">
      {/* User block: avatar, full name, email */}
      <SidebarUserBlock>
        <Avatar
          size="6"
          fallback={initials}
          radius="full"
          style={{
            backgroundColor: isDark ? "var(--gray-5)" : "var(--gray-9)",
            color: isDark ? "var(--gray-12)" : "var(--gray-1)",
            fontWeight: 600,
          }}
        />
        <SidebarUserName>{fullName}</SidebarUserName>
        <SidebarUserEmail>{user?.email ?? ""}</SidebarUserEmail>
      </SidebarUserBlock>

      {/* Nav links */}
      <SidebarNavList>
        {PRIVATE_ZONE_NAV_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <Link href={item.href} key={item.label}>
              <SidebarNavLink>
                <Icon width="18" height="18" />
                <SidebarNavLinkLabel>{item.label}</SidebarNavLinkLabel>
                {typeof item.badge === "number" && (
                  <Flex
                    ml="auto"
                    align="center"
                    justify="center"
                    style={{
                      minWidth: 20,
                      height: 20,
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--accent-9)",
                      color: "var(--accent-1)",
                      fontSize: "var(--font-size-1)",
                      fontWeight: 600,
                      padding: "0 6px",
                    }}
                  >
                    {item.badge}
                  </Flex>
                )}
              </SidebarNavLink>
            </Link>
          );
        })}
      </SidebarNavList>

      {/* Logout */}
      <SidebarLogoutBlock
        onClick={handleLogout}
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && handleLogout()}
      >
        <ExitIcon width="18" height="18" />
        <SidebarLogoutLabel>Выйти</SidebarLogoutLabel>
      </SidebarLogoutBlock>
    </SidebarInner>
  );
}
