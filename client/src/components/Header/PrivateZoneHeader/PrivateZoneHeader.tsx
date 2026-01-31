"use client";

import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import {
  MobileMenuButton,
  HamburgerIcon,
} from "../Header.styles";
import { MobileMenu } from "../MobileMenu";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { PrivateZoneHeaderContainer } from "./PrivateZoneHeader.styles";

export default function PrivateZoneHeader() {
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
      <PrivateZoneHeaderContainer>
        <Flex justify="start" align="center" height="100%">
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
        </Flex>
      </PrivateZoneHeaderContainer>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        navigationItems={[]}
        onClose={closeMobileMenu}
        user={user}
      />
    </>
  );
}
