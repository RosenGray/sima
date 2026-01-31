"use client";

import { useState } from "react";
import Link from "next/link";
import { Text } from "@radix-ui/themes";
import { PersonIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  MobileMenuButton,
  HamburgerIcon,
} from "../Header.styles";
import { MobileMenu } from "../MobileMenu";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { PRIVATE_ZONE_NAV_LINKS } from "@/app/(private)/private-zone/constants/privateZoneNavLinks";
import {
  PrivateZoneHeaderContainer,
  PrivateZoneHeaderTopRow,
  PrivateZoneHeaderLeft,
  PrivateZoneTitle,
  PrivateZoneActionsContainer,
  PrivateZonePublishAdButton,
  PrivateZoneUserAvatar,
} from "./PrivateZoneHeader.styles";
import SimaDarkLogo from "@/components/svg/Sima/SimaDarkLogo";
import { Logo } from "../Header.styles";
import { DropdownMenu } from "@/components/DropdownMenu";
import { ThemeToggleButton } from "@/components/ThemeToggleButton/ThemeToggleButton";
import { logoutUser } from "@/lib/auth/actions/logout";

export default function PrivateZoneHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const userInitials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <PrivateZoneHeaderContainer>
        <PrivateZoneHeaderTopRow>
          <PrivateZoneHeaderLeft>
            <MobileMenuButton
              variant="ghost"
              size="2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <HamburgerIcon $isOpen={isMobileMenuOpen}>
                <span />
                <span />
                <span />
              </HamburgerIcon>
            </MobileMenuButton>
            <Logo>
              <Link
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                href="/"
              >
                <SimaDarkLogo width={200} height={60} />
              </Link>
            </Logo>
            <PrivateZoneTitle>Личный кабинет</PrivateZoneTitle>
          </PrivateZoneHeaderLeft>

          <PrivateZoneActionsContainer>
            <PrivateZonePublishAdButton asChild variant="solid" size="2">
              <Link href="/publish-ad">
                <PlusCircledIcon width="16" height="16" />
                <Text size="2" weight="medium">
                  Добавить объявление
                </Text>
              </Link>
            </PrivateZonePublishAdButton>
            {user && (
              <DropdownMenu
                trigger={
                  <PrivateZoneUserAvatar variant="soft" size="2">
                    <Text size="2" weight="bold">
                      {userInitials}
                    </Text>
                  </PrivateZoneUserAvatar>
                }
                items={[
                  {
                    type: "action",
                    label: "Выйти",
                    icon: <PersonIcon width="18" height="18" />,
                    onClick: async () => {
                      await logoutUser();
                    },
                  },
                ]}
                triggerMode="hover"
              />
            )}
            <ThemeToggleButton />
          </PrivateZoneActionsContainer>
        </PrivateZoneHeaderTopRow>
      </PrivateZoneHeaderContainer>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        navigationItems={[]}
        onClose={closeMobileMenu}
        user={user}
        userNavLinks={PRIVATE_ZONE_NAV_LINKS}
      />
    </>
  );
}
