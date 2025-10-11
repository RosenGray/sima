"use client";

import { useState } from "react";
import Link from "next/link";
import { Flex, Text } from "@radix-ui/themes";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  DropdownMenu,
  DropdownItem,
  MobileMenuButton,
  HamburgerIcon,
  ActionsContainer,
  LoginButton,
} from "./Header.styles";
import { MobileMenu } from "./Header/MobileMenu";
import { ThemeToggleButton } from "./ThemeToggleButton/ThemeToggleButton";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { LogoutButton } from "./buttons/LogoutButton/LogoutButton";


const navigationItems = [
  {
    label: "Products",
    subItems: [
      { label: "Electronics", href: "/products/electronics" },
      { label: "Fashion", href: "/products/fashion" },
      { label: "Home & Garden", href: "/products/home-garden" },
      { label: "Sports", href: "/products/sports" },
    ],
  },
  {
    label: "Sellers",
    subItems: [
      { label: "Find Sellers", href: "/sellers" },
      { label: "Become a Seller", href: "/sellers/join" },
      { label: "Seller Resources", href: "/sellers/resources" },
      { label: "Success Stories", href: "/sellers/stories" },
    ],
  },
  {
    label: "Community",
    subItems: [
      { label: "Forums", href: "/community/forums" },
      { label: "Events", href: "/community/events" },
      { label: "Blog", href: "/community/blog" },
      { label: "Support", href: "/community/support" },
    ],
  },
  {
    label: "About",
    subItems: [
      { label: "Our Story", href: "/about" },
      { label: "Team", href: "/about/team" },
      { label: "Careers", href: "/about/careers" },
      { label: "Contact", href: "/about/contact" },
    ],
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user} = useAuth();

  const toggleMobileMenu = () => {
    console.log("Toggle mobile menu, current state:", isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  return (
    <>
      <HeaderContainer>
        <Flex justify="between" align="center" height="100%">
          {/* Mobile Menu Button - Left side on mobile */}
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

          {/* Desktop Navigation - Hidden on mobile */}
          <Nav>
            {navigationItems.map((item) => (
              <NavItem key={item.label}>
                <Text size="3" weight="medium">
                  {item.label}
                </Text>
                <DropdownMenu>
                  {item.subItems.map((subItem) => (
                    <DropdownItem key={subItem.label} href={subItem.href}>
                      <Text size="2">{subItem.label}</Text>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </NavItem>
            ))}
          </Nav>

          {/* Right-side Actions: Login + Theme Toggle */}
          <ActionsContainer>
            {user ? <LogoutButton /> : <Link href="/auth/login">
              <LoginButton variant="surface" size="2">
                <Text size="2" weight="medium">
                  Login
                </Text>
              </LoginButton>
            </Link>}
            <ThemeToggleButton />
          </ActionsContainer>
        </Flex>
      </HeaderContainer>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        navigationItems={navigationItems}
        onClose={closeMobileMenu}
      />
    </>
  );
}
