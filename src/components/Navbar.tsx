"use client";

import { AppBar, Stack, Toolbar } from "@mui/material";
import { FC, useState } from "react";
import Logo from "./ui/logo/Logo";
import colors from "@/utils/public/colors";
import LinkText from "./ui/text/LinkText/LinkText";
import useTranslate from "@/utils/public/hooks/useTranslate";
import { isNil } from "lodash";
import { signIn, signOut } from "next-auth/react";
import useAuth from "@/utils/public/hooks/useAuth";
import usePermission from "@/utils/public/hooks/usePermission";
import routes, {
    accompaniment,
    admin,
    cart,
    store,
} from "@/utils/public/routes";
import SearchBar from "./SearchBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import Badge from "./ui/badge/Badge";
import useCart from "@/utils/public/hooks/useCart";

const Navbar: FC = () => {
    const t = useTranslate();

    const { data: session } = useAuth();

    const permission = usePermission("admin_view");

    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const { items } = useCart() || {};

    return (
        <AppBar
            style={{
                boxShadow: "none",
                backgroundColor: colors.backgroundBrand,
            }}
            position={"static"}
            sx={{
                zIndex: (t) => t.zIndex.appBar, //Ensures appBar remains above the clipped permanent Drawer
            }}
        >
            <Toolbar>
                <Stack
                    width={"100%"}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap="10px"
                >
                    <Stack direction={"row"} gap={1}>
                        <Logo />

                        <SearchBar
                            searchTerm={searchTerm}
                            onChange={setSearchTerm}
                        />
                    </Stack>

                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                        <LinkText href={routes[accompaniment].$} overlay>
                            {t("Accompaniment")}
                        </LinkText>

                        {permission.data?.admin_view === true && (
                            <LinkText href={routes[admin].$} overlay>
                                Admin
                            </LinkText>
                        )}

                        <LinkText href={routes[store].$} overlay>
                            {t("Store")}
                        </LinkText>

                        {!isNil(session) ? (
                            <LinkText onClick={() => signOut()} overlay>
                                {t("Logout")}
                            </LinkText>
                        ) : (
                            <LinkText onClick={() => signIn()} overlay>
                                {t("Sign in")}
                            </LinkText>
                        )}

                        <Link href={routes[cart].$}>
                            <Badge
                                badgeContent={items?.length ?? 0}
                                ariaLabel="items in shopping cart"
                            >
                                <ShoppingCartOutlinedIcon
                                    sx={{
                                        width: "15px",
                                        height: "15px",
                                        color: colors.textInverse,
                                    }}
                                />
                            </Badge>
                        </Link>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
