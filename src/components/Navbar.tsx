"use client";

import { AppBar, Stack, Toolbar } from "@mui/material";
import { FC, useState } from "react";
import Logo from "./ui/logo/Logo";

import SearchBar from "./SearchBar";

const Navbar: FC = () => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    return (
        <AppBar
            style={{
                boxShadow: "none",
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

                    <Stack
                        direction={"row"}
                        gap={1}
                        alignItems={"center"}
                    ></Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
