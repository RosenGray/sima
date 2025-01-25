"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import * as Navigation from "@radix-ui/react-navigation-menu";
import {
  CaretDownIcon,
  HamburgerMenuIcon,
  MoonIcon,
  CrossCircledIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

import simaLightLogo from "@/assets/images/sima.light.logo.png";
import simaDarkLogo from "@/assets/images/sima.dark.logo.png";
import Image from "next/image";
import realestate from "@/assets/images/realestate.webp";
// import professionals from "@/assets/images/professionals.webp";
// import marketPlace from "@/assets/images/marketPlace.webp";

import NavigationItem from "./NavigationItem/NavigationItem";
import { realEstatenavigationItems } from "./config";
import Loader from "../Loader/Loader";
import styles from "./Header.module.scss";
import { IconButton, Button } from "@radix-ui/themes";
import Link from "next/link";
import { config } from "@/utils/config";
// import { logout } from "@/app/auth/_lib/actions";
{
  /* <form action={logout}>
<button type="submit">Logout</button>
</form>
 */
}
console.log(process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL)
const Header = () => {
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
      <h1>{process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL}</h1>
      <h1>{config.BACKBLAZEB_BASE_URL}</h1>
      {menuIsOpen && (
        <div
          onClick={toggleMenuVisibilityHandler}
          className={styles.BackDrop}
        ></div>
      )}
      <header className={styles.AppHeader}>
        <div className={styles.Left}>
          <IconButton onClick={toggleThemeHandler} color="yellow">
            <MoonIcon />
          </IconButton>
          <IconButton  color="green">
            <Link href="/auth/login">
              <PersonIcon width="16" height="16" />
            </Link>
          </IconButton>
  
          <aside className={styles.Aside}>
            <section className={styles.TopSection}></section>
            <section className={styles.BottomSection}>
              <Navigation.Root className={styles.NavigationMenuRoot}>
                <Navigation.List className={styles.NavigationMenuList}>
                  <NavigationItem
                    title="Недвижимость"
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
          <IconButton className={styles.HamburgerIconButton} color="yellow">
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
