"use client";

import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import UserLoginIndicator from "../UserLoginIndicator/UserLoginIndicator";
import { useTheme } from "next-themes";
import { Logo } from "@/components/Logo/Logo";
import { FC, useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import styles from "./SimpleHeader.module.scss";

const SimpleHeader: FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <header className={styles.Header}>
      <div className={styles.Header__leftSection}>
        <Link className={styles.Header__exitButton} href="/publish-ad">
          Выйти
        </Link>
        <UserLoginIndicator buttonSize="3" />
      </div>

      <div className={styles.Header__rightSection}>
        {mounted ? (
          <Logo isDark={isDark} />
        ) : (
          <Loader isSpin width={150} height={55} />
        )}
      </div>
    </header>
  );
};

export default SimpleHeader;
