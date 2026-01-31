
"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { ThemeToggleButton as ThemeToggleButtonStyles } from "./ThemeToggleButton.styles";
import { useIsMounted } from "@/lib/auth/hooks/useIsMounted";
import { useTheme } from "next-themes";

export function ThemeToggleButton() {
  const isMounted = useIsMounted();
  const { theme, setTheme } = useTheme();
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  if (!isMounted) return null;
  return (
    <ThemeToggleButtonStyles
      variant="surface"
      size="2"
      onClick={handleThemeToggle}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <SunIcon color="yellow" /> : <MoonIcon color="red" />}
    </ThemeToggleButtonStyles>
  );
}
