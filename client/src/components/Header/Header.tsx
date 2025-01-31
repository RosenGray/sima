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
} from "@radix-ui/react-icons";

import simaLightLogo from "@/assets/images/sima.light.logo.png";
import simaDarkLogo from "@/assets/images/sima.dark.logo.png";
import Image from "next/image";
import realestate from "@/assets/images/realestate.webp";
// import professionals from "@/assets/images/professionals.webp";

import NavigationItem from "./NavigationItem/NavigationItem";
import { realEstatenavigationItems } from "./config";
import Loader from "../Loader/Loader";

import { Box, Button, IconButton, Text } from "@radix-ui/themes";
import Link from "next/link";
import styles from "./Header.module.scss";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import UserLoginIndicator from "./UserLoginIndicator/UserLoginIndicator";
{
  /* <form action={logout}>
<button type="submit">Logout</button>
</form>
 */
}
console.log(process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL);
const Header = () => {
  const { user } = useAuth();
  console.log("header user", user);
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
  const logoSrc = isMounted
    ? isDark
      ? simaDarkLogo
      : simaLightLogo
    : simaLightLogo;

  if (!isMounted)
    return (
      <div className={styles.LoaderContainer}>
        <Loader isSpin width={100} height={100} />
      </div>
    );
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
          <IconButton onClick={toggleThemeHandler} size="3" color="yellow">
            <MoonIcon />
          </IconButton>
          <UserLoginIndicator
            hideOnMobile={true}
            buttonSize="3"
            user={user}
          />

          <aside className={styles.Aside}>
            <section className={styles.TopSection}>
              <Box className={styles.MobileMenuTop} height="100px">
                <UserLoginIndicator user={user} buttonSize="3" />

                <Button size="3">
                  <PlusIcon width="26" height="26" />
                  <Text as="span">Добавить объявление</Text>
                </Button>
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
                    innerListClassNames={`${styles.List} ${styles.List__One}`}
                    imageSrc={realestate.src}
                    menuItems={realEstatenavigationItems}
                    hideImageOnMobile={true}
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
          <IconButton size="3" className={styles.HamburgerIconButton} color="yellow">
            {menuIsOpen ? (
              <CrossCircledIcon onClick={toggleMenuVisibilityHandler} />
            ) : (
              <HamburgerMenuIcon onClick={toggleMenuVisibilityHandler} />
            )}
          </IconButton>
          <div className={styles.LogoContainer}>
            <Link href="/">
              <Image width={150} src={logoSrc} alt="Sima" priority />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
