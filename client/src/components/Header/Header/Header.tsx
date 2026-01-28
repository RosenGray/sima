"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Flex, Text } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
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
  PublishAdButton,
} from "./../Header.styles";
import { MobileMenu } from "../MobileMenu";
import { ThemeToggleButton } from "../../ThemeToggleButton/ThemeToggleButton";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { LogoutButton } from "../../buttons/LogoutButton/LogoutButton";
import { useHomePage } from "@/providers/HomePageProvider/HomePageProvider";
import SimaDarkLogo from "@/components/svg/Sima/SimaDarkLogo";

// const navigationItems = [
//   {
//     label: "Услуги специалистов",
//     subItems: [
//       { label: "Все", href: "/professional-service" },
//       {
//         label: "Electronics",
//         href: "/professional-service?categoryId=6902000307fc0b06bd2a4294",
//       },
//       {
//         label: "Fashion",
//         href: "/professional-service?categoryId=6902000307fc0b06bd2a428a",
//       },
//       { label: "Home & Garden", href: "/professional-service?categoryId=3" },
//       { label: "Sports", href: "/professional-service?categoryId=4" },
//     ],
//   },
//   {
//     label: "Sellers",
//     subItems: [
//       { label: "Find Sellers", href: "/sellers" },
//       { label: "Become a Seller", href: "/sellers/join" },
//       { label: "Seller Resources", href: "/sellers/resources" },
//       { label: "Success Stories", href: "/sellers/stories" },
//     ],
//   },
//   {
//     label: "Community",
//     subItems: [
//       { label: "Forums", href: "/community/forums" },
//       { label: "Events", href: "/community/events" },
//       { label: "Blog", href: "/community/blog" },
//       { label: "Support", href: "/community/support" },
//     ],
//   },
//   {
//     label: "About",
//     subItems: [
//       { label: "Our Story", href: "/about" },
//       { label: "Team", href: "/about/team" },
//       { label: "Careers", href: "/about/careers" },
//       { label: "Contact", href: "/about/contact" },
//     ],
//   },
// ];

export default function Header() {
  const { serviceCategories } = useHomePage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const navigationItems = useMemo(() => {
    const services = {
      label: "Услуги специалистов",
      subItems: [
        { label: "Все", href: "/professional-service" },
        ...serviceCategories.map((category) => ({
          label: category.navItem.label,
          href: category.navItem.href,
        })),
      ],
    };
    const vehicles = {
      label: "Транспорт",
      subItems: [{ label: "Все", href: "/vehicles" }],
    };
    return [services, vehicles];
  }, [serviceCategories]);

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
            <Link href="/">
              <SimaDarkLogo width={200} height={60}  />
            </Link>
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
                    <DropdownItem key={subItem?.label} href={subItem?.href}>
                      <Text size="2">{subItem?.label}</Text>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </NavItem>
            ))}
          </Nav>

          {/* Right-side Actions: Publish Ad + Login + Theme Toggle */}
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
        navigationItems={navigationItems}
        onClose={closeMobileMenu}
      />
    </>
  );
}
