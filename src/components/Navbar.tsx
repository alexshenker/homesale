"use client";

import { AppBar, Stack, Toolbar } from "@mui/material";
import { FC } from "react";
import Logo from "./ui/logo/Logo";

import colors from "@/utils/public/colors";
import LinkText from "./ui/text/LinkText/LinkText";
import { signIn, signOut } from "next-auth/react";
import useAuth from "@/utils/public/hooks/useAuth";
import routes, {
    buy,
    create_new_listing,
    manage,
    rent,
} from "@/utils/public/routes";
import { isNil } from "lodash";

const Navbar: FC = () => {
    const auth = useAuth();

    return (
        <AppBar
            style={{
                boxShadow: "none",
            }}
            position={"static"}
            sx={{
                zIndex: (t) => t.zIndex.appBar, //Ensures appBar remains above the clipped permanent Drawer
                backgroundColor: colors.background,
                width: "100%",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
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
                    </Stack>

                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                        {<LinkText href={routes[buy].$}>Buy</LinkText>}

                        {<LinkText href={routes[rent].$}>Rent</LinkText>}

                        {
                            <LinkText href={routes[create_new_listing].$}>
                                List your home
                            </LinkText>
                        }

                        {auth.data?.authenticated && (
                            <LinkText href={routes[manage].$}>Manage</LinkText>
                        )}

                        {auth.hasError ? (
                            <></>
                        ) : auth.isLoading || auth.data === null ? (
                            <LinkText onClick={() => signIn()}>Login</LinkText>
                        ) : (
                            <LinkText onClick={() => signOut()}>
                                Logout
                            </LinkText>
                        )}
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
