"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Flex, Text } from "@radix-ui/themes";
import { PersonIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  HeaderContainer,
  HeaderTopRow,
  HeaderBottomRow,
  Logo,
  Nav,
  NavItem,
  DropdownMenu,
  NavLikItem,
  MobileMenuButton,
  HamburgerIcon,
  ActionsContainer,
  LoginButton,
  PublishAdButton,
  DropdownMenuTrigger,
} from "./../Header.styles";
import { MobileMenu } from "../MobileMenu";
import { ThemeToggleButton } from "../../ThemeToggleButton/ThemeToggleButton";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import { LogoutButton } from "../../buttons/LogoutButton/LogoutButton";
import { useHomePage } from "@/providers/HomePageProvider/HomePageProvider";
import SimaDarkLogo from "@/components/svg/Sima/SimaDarkLogo";
import { NavigationItems, renderLinkOrDropdown } from "../Header.utils";
import { navItems } from "./navItems";
import { DropdownMenu as DropdownMenuComponent } from "@/components/DropdownMenu";
import { logoutUser } from "@/lib/auth/actions/logout";

export default function Header() {
  const { serviceCategories } = useHomePage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const navigationItems = useMemo(() => {
    const services = {
      label: "Услуги специалистов",
      type: "dropdown",
      subItems: [
        { label: "Все", href: "/professional-service" },
        ...serviceCategories.map((category) => ({
          label: category.navItem.label,
          href: category.navItem.href,
        })),
      ],
    };

    return [services, ...navItems] as NavigationItems;
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
        {/* Top row: Logo left, Actions right (hamburger on mobile only) */}
        <HeaderTopRow>
          <Flex align="center" gap="2">
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
          </Flex>
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
              // <LogoutButton />
              <DropdownMenuComponent trigger={<DropdownMenuTrigger>
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
        </HeaderTopRow>

        {/* Bottom row: Nav in the middle (desktop only) */}
        <HeaderBottomRow>
          <Nav>
            {navigationItems.map((item) => (
              <NavItem key={item.label}>
                {renderLinkOrDropdown(item)}
                {item.type === "dropdown" && (
                  <DropdownMenu>
                    {item.subItems.map((subItem) => (
                      <NavLikItem key={subItem?.label} href={subItem?.href}>
                        <Text size="2">{subItem?.label}</Text>
                      </NavLikItem>
                    ))}
                  </DropdownMenu>
                )}
              </NavItem>
            ))}
          </Nav>
        </HeaderBottomRow>
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
