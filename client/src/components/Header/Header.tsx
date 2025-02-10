"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import * as Navigation from "@radix-ui/react-navigation-menu";
import {
  CaretDownIcon,
  HamburgerMenuIcon,
  MoonIcon,
  CrossCircledIcon,
  PlusIcon,
  SunIcon,
} from "@radix-ui/react-icons";

import NavigationItem from "./NavigationItem/NavigationItem";
import { professionalServicesItems } from "./config";
import Loader from "../Loader/Loader";
import { Box, IconButton, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import UserLoginIndicator from "./UserLoginIndicator/UserLoginIndicator";
import { Logo } from "../Logo/Logo";
import classNames from "classnames";
import styles from "./Header.module.scss";
const AddAdButton = ({
  isLoggedIn,
  shouldHideOnMobile,
}: {
  isLoggedIn: boolean;
  shouldHideOnMobile?: boolean;
}) => {
  return (
    <Link
      className={classNames({
        [styles.AddAdButton]: true,
        [styles.AddAdButton__HideOnMobile]: shouldHideOnMobile,
      })}
      href={isLoggedIn ? "/publish-ad/professionals" : "/auth/login"}
    >
      <PlusIcon width="26" height="26" />
      <Text as="span">Добавить объявление</Text>
    </Link>
  );
};

const Header = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleThemeHandler = () => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  function toggleMenuVisibilityHandler() {
    setMenuIsOpen((p) => !p);
  }

  const isDark = theme === "dark";

  return (
    <div className={styles.AppHeaderContainer} data-menu-is-open={menuIsOpen}>
      {menuIsOpen && (
        <div
          onClick={toggleMenuVisibilityHandler}
          className={styles.BackDrop}
        ></div>
      )}
      <header className={styles.AppHeader}>
        <div className={styles.Left}>
          <UserLoginIndicator hideOnMobile={true} buttonSize="3" />
          <IconButton onClick={toggleThemeHandler} size="3" color="yellow">
            {!isMounted ? (
              <Loader isSpin width={150} height={55} />
            ) : isDark ? (
              <SunIcon width="22" height="22" />
            ) : (
              <MoonIcon width="22" height="22" />
            )}
          </IconButton>

          <AddAdButton isLoggedIn={!!user} shouldHideOnMobile={true} />

          <aside className={styles.Aside}>
            <section className={styles.TopSection}>
              <Box className={styles.MobileMenuTop} height="100px">
                <UserLoginIndicator user={user} buttonSize="3" />

                <AddAdButton isLoggedIn={!!user} />
              </Box>
            </section>
            <section className={styles.BottomSection}>
              <Navigation.Root className={styles.NavigationMenuRoot}>
                <Navigation.List className={styles.NavigationMenuList}>
                  <NavigationItem
                    title="Услуги специалистов"
                    icon={
                      <CaretDownIcon className={styles.CaretDown} aria-hidden />
                    }
                    menuItems={professionalServicesItems}
                  />

                  <Navigation.Indicator
                    className={styles.NavigationMenuIndicator}
                  >
                    <div className={styles.Arrow} />
                  </Navigation.Indicator>
                </Navigation.List>

                <div className={styles.ViewportPosition}>
                  <Navigation.Viewport
                    className={styles.NavigationMenuViewport}
                  />
                </div>
              </Navigation.Root>
            </section>
          </aside>
        </div>
        <div className={styles.Right}>
          <IconButton
            size="3"
            className={styles.HamburgerIconButton}
            color="yellow"
          >
            {menuIsOpen ? (
              <CrossCircledIcon onClick={toggleMenuVisibilityHandler} />
            ) : (
              <HamburgerMenuIcon onClick={toggleMenuVisibilityHandler} />
            )}
          </IconButton>
          {isMounted ? (
            <Logo isDark={isDark} />
          ) : (
            <Loader isSpin width={150} height={55} />
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
