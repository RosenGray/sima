"use client";

import { useState } from "react";
import Link from "next/link";
import { Flex, Text } from "@radix-ui/themes";
import { PersonIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Logo,
  MobileMenuButton,
  HamburgerIcon,
  ActionsContainer,
  LoginButton,
  PublishAdButton,
  SimpleHeaderContainer,
  DropdownMenuTrigger,
} from "./../Header.styles";
import { MobileMenu } from "../MobileMenu";
import { ThemeToggleButton } from "../../ThemeToggleButton/ThemeToggleButton";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import SimaDarkLogo from "@/components/svg/Sima/SimaDarkLogo";
import { logoutUser } from "@/lib/auth/actions/logout";
import { DropdownMenu } from "@/components/DropdownMenu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <SimpleHeaderContainer>
        <Flex justify="between" align="center" height="100%">
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

          {/* Logo - Center */}
          <Logo>
            <Link href="/">
              <SimaDarkLogo width={200} height={60} />
            </Link>
          </Logo>

          <ActionsContainer>
            <PublishAdButton asChild variant="solid" size="2">
              <Link href="/publish-ad">
                <PlusCircledIcon width="16" height="16" />
                <Text size="2" weight="medium">
                  Добавить объявление
                </Text>
              </Link>
            </PublishAdButton>
            {user ? (
              <DropdownMenu trigger={<DropdownMenuTrigger>
                <Text size="2" weight="medium">
                  {firstName?.charAt(0)}
                  {lastName?.charAt(0)}
                </Text>
              </DropdownMenuTrigger>} items={[{
                type: "action",
                label: "Выйти",
                icon: <PersonIcon width="18" height="18" />,
                onClick: async () => {
                  await logoutUser();
                },
              }]} triggerMode="hover" />
            ) : (
              <LoginButton asChild variant="surface" size="2">
                <Link href="/auth/login">
                  <PersonIcon width="18" height="18" />
                  <Text size="2" weight="medium">
                    Войти
                  </Text>
                </Link>
              </LoginButton>
            )}
            <ThemeToggleButton />
          </ActionsContainer>
        </Flex>
      </SimpleHeaderContainer>

      {/* Mobile Menu Component - same as normal header but no category nav (NavigationItemsContainer) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        navigationItems={[]}
        onClose={closeMobileMenu}
        user={user}
      />
    </>
  );
}
