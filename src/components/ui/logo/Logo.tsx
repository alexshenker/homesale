"use client";

import useThemeMode from "@/utils/public/hooks/useThemeMode";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const size = 40;

const Logo = (): JSX.Element => {
  const themeMode = useThemeMode();

  const src = useMemo(() => {
    return themeMode === "dark" ? "/logoDark.svg" : "/logoLight.svg";
  }, [themeMode]);

  return (
    <Link
      style={{ width: size, height: size, minWidth: size, maxWidth: size }}
      href="/"
    >
      <Image src={src} alt="logo" priority width={size} height={size} />
    </Link>
  );
};

export default Logo;
