"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Text, IconButton } from "@radix-ui/themes";
import {
  PlusCircledIcon,
  Cross2Icon,
  HomeIcon,
  ChatBubbleIcon,
  HeartIcon,
  CounterClockwiseClockIcon,
  BellIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  MobileMenuOverlay,
  MobileMenuContainer,
  MobileMenuTopBar,
  MobileMenuLogoutLink,
  MobileMenuCloseButton,
  MobileMenuUserSection,
  MobileMenuUserInfo,
  MobileMenuUserName,
  MobileMenuPrivateAreaLink,
  MobileMenuAvatar,
  MobileMenuActionsSection,
  MobilePublishAdButton,
  MobileMenuNavSection,
  MobileMenuNavLink,
  MobileMenuNavLinkContent,
  MobileMenuNavLinkLabel,
  MobileMenuNavLinkBadge,
  NavigationItemsContainer,
} from "./MobileMenu.styles";
import NavMobileItem from "./NavMobileItem";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { logoutUser } from "@/lib/auth/actions/logout";

/** User nav links (Home, Chat, Liked Ads, etc.) - placeholder hrefs where feature does not exist yet */
const USER_NAV_LINKS = [
  { label: "Главная", href: "/", icon: HomeIcon },
  { label: "Чат", href: "/chat", icon: ChatBubbleIcon },
  {
    label: "Понравившиеся",
    href: "/private-area#liked",
    icon: HeartIcon,
    badge: 6,
  },
  {
    label: "Недавние поиски",
    href: "#",
    icon: CounterClockwiseClockIcon,
    active: true,
  },
  { label: "Уведомления", href: "#", icon: BellIcon },
  {
    label: "Служба поддержки",
    href: "#",
    icon: QuestionMarkCircledIcon,
  },
] as const;

interface NavigationItem {
  label: string;
  subItems: Array<{
    label: string;
    href: string;
  }>;
}

interface MobileMenuProps {
  isOpen: boolean;
  navigationItems: NavigationItem[];
  onClose: () => void;
  user?: SerializedUser | null;
}

// Placeholder route for private area; can be replaced with /chat or a dedicated /private-area page later
const PRIVATE_AREA_HREF = "/private-area";

export default function MobileMenu({
  isOpen,
  navigationItems,
  onClose,
  user,
}: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleLogout = async () => {
    onClose();
    await logoutUser();
  };

  const toggleCategory = (categoryLabel: string) => {
    setExpandedCategory(expandedCategory === categoryLabel ? null : categoryLabel);
  };

  const handleSubItemClick = (href: string) => {
    console.log(`Navigate to: ${href}`);
    onClose();
    setExpandedCategory(null);
  };

  const handleOverlayClick = () => {
    onClose();
    setExpandedCategory(null);
  };

  // Reset expanded category when menu closes
  React.useEffect(() => {
    if (!isOpen) {
      setExpandedCategory(null);
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay $isOpen={isOpen} onClick={handleOverlayClick} />

      {/* Mobile Menu Container */}
      <MobileMenuContainer $isOpen={isOpen}>
        {/* Top bar: Logout (left when authenticated), Close (right) */}
        <MobileMenuTopBar>
          {user ? (
            <MobileMenuLogoutLink type="button" onClick={handleLogout}>
              Выйти
            </MobileMenuLogoutLink>
          ) : (
            <span />
          )}
          <MobileMenuCloseButton>
            <IconButton
              variant="ghost"
              color="gray"
              size="2"
              onClick={onClose}
              aria-label="Закрыть меню"
            >
              <Cross2Icon width="20" height="20" />
            </IconButton>
          </MobileMenuCloseButton>
        </MobileMenuTopBar>

        {/* User section: full name, Private Area link, avatar (only when authenticated) */}
        {user && (
          <MobileMenuUserSection>
            <MobileMenuUserInfo>
              <MobileMenuUserName as="p">
                {user.firstName} {user.lastName}
              </MobileMenuUserName>
              <MobileMenuPrivateAreaLink href={PRIVATE_AREA_HREF} onClick={onClose}>
                Личный кабинет
              </MobileMenuPrivateAreaLink>
            </MobileMenuUserInfo>
            <MobileMenuAvatar as="div">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </MobileMenuAvatar>
          </MobileMenuUserSection>
        )}

        {/* Publish Ad button (between user section and user nav links) */}
        <MobileMenuActionsSection>
          <MobilePublishAdButton asChild variant="solid" size="3">
            <Link href="/publish-ad" onClick={onClose}>
              <PlusCircledIcon width="18" height="18" />
              <Text size="2" weight="bold">
                Добавить объявление
              </Text>
            </Link>
          </MobilePublishAdButton>
        </MobileMenuActionsSection>

        {/* User nav links (Home, Chat, Liked Ads, Recent Searches, etc.) */}
        <MobileMenuNavSection>
          {USER_NAV_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <MobileMenuNavLink
                key={item.label}
                href={item.href}
                onClick={onClose}
                $active={"active" in item && item.active}
              >
                <MobileMenuNavLinkContent>
                  <Icon width="20" height="20" />
                  <MobileMenuNavLinkLabel>{item.label}</MobileMenuNavLinkLabel>
                </MobileMenuNavLinkContent>
                {"badge" in item && typeof item.badge === "number" && (
                  <MobileMenuNavLinkBadge>{item.badge}</MobileMenuNavLinkBadge>
                )}
              </MobileMenuNavLink>
            );
          })}
        </MobileMenuNavSection>

        {/* Category navigation (Услуги, Работа, Транспорт, etc.) - only when navigationItems provided (e.g. main header; hidden in SimpleHeader) */}
        {navigationItems.length > 0 && (
          <NavigationItemsContainer>
            {navigationItems.map((item) => (
              <NavMobileItem
                key={item.label}
                label={item.label}
                subItems={item.subItems}
                isExpanded={expandedCategory === item.label}
                onToggle={() => toggleCategory(item.label)}
                onSubItemClick={handleSubItemClick}
              />
            ))}
          </NavigationItemsContainer>
        )}
      </MobileMenuContainer>
    </>
  );
}
