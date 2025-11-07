"use client";

import { useState } from "react";
import Link from "next/link";
import { Flex, Text } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  HeaderContainer,
  Logo,
  MobileMenuButton,
  HamburgerIcon,
  ActionsContainer,
  LoginButton,
  PublishAdButton,
} from "./../Header.styles";
import { MobileMenu } from "../MobileMenu";
import { ThemeToggleButton } from "../../ThemeToggleButton/ThemeToggleButton";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { LogoutButton } from "../../buttons/LogoutButton/LogoutButton";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer>
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
            <Text size="6" weight="bold">
              Sima
            </Text>
          </Logo>

          <ActionsContainer>
            <PublishAdButton asChild variant="solid" size="2">
              <Link href="/publish-ad">
                <PlusCircledIcon width="16" height="16" />
                <Text size="2" weight="medium">
                  Разместить объявление
                </Text>
              </Link>
            </PublishAdButton>
            {user ? (
              <LogoutButton />
            ) : (
              <LoginButton asChild variant="surface" size="2">
                <Link href="/auth/login">
                  <Text size="2" weight="medium">
                    Войти
                  </Text>
                </Link>
              </LoginButton>
            )}
            <ThemeToggleButton />
          </ActionsContainer>
        </Flex>
      </HeaderContainer>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        navigationItems={[]}
        onClose={closeMobileMenu}
      />
    </>
  );
}
