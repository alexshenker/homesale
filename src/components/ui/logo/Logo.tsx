"use client";

import useThemeMode from "@/utils/public/hooks/useThemeMode";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Text from "../text/Text";
import { Box } from "@mui/material";

const size = 30;

const Logo = (): JSX.Element => {
    const themeMode = useThemeMode();

    const src = useMemo(() => {
        return themeMode === "dark" ? "/logo.jpg" : "/logo.jpg";
    }, [themeMode]);

    return (
        <Link
            style={{ display: "flex", alignItems: "center", gap: 7 }}
            href="/"
        >
            <Box
                style={{
                    width: size,
                    height: size,
                    minWidth: size,
                    maxWidth: size,
                }}
            >
                <Image
                    src={src}
                    alt="logo"
                    priority
                    width={size}
                    height={size}
                />
            </Box>
            <Text>Be the Balabeit™ you are!</Text>
        </Link>
    );
};

export default Logo;
