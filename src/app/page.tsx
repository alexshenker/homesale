"use client";

import SearchBar from "@/components/SearchBar";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Box position={"relative"}>
            <Image
                src="/images/lawn_1.webp"
                width={1792}
                height={1024}
                alt="lawn"
            />

            <Stack
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                display={"flex"}
                flexDirection="column"
                justifyContent={"center"}
                padding={5}
            >
                <Box width={"200px"}>
                    <SearchBar
                        searchTerm={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Enter a location"
                    />
                </Box>
            </Stack>
        </Box>
    );
}
