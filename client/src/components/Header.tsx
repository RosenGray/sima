"use client";

import { useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  DropdownMenu,
  DropdownItem,
  MobileMenuButton,
  ThemeToggleButton,
  HamburgerIcon,
} from "./Header.styles";
import { MobileMenu } from "./Header/MobileMenu";

// Icons for light and dark theme
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

interface HeaderProps {
  isDark?: boolean;
  onThemeToggle?: () => void;
}

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

export default function Header({ isDark = false, onThemeToggle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      // Fallback theme toggle logic using next-themes
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
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

          {/* Theme Toggle - Right side */}
          <ThemeToggleButton
            variant="ghost"
            size="2"
            onClick={handleThemeToggle}
            title={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </ThemeToggleButton>
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
