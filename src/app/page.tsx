"use client";

import SearchBar from "@/components/SearchBar";
import Space from "@/components/ui/Space";
import Text from "@/components/ui/text/Text";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Box position={"relative"}>
            <Box
                sx={{
                    display: "inline-block",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                            "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.2) 60%)",
                    },
                }}
            >
                <Image
                    src="/images/lawn_1.webp"
                    width={1792}
                    height={1024}
                    alt="lawn"
                />
            </Box>

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
                <Box width={"300px"}>
                    <Text fontSize={"30px"}>
                        Find a forever home that you love.
                    </Text>
                </Box>

                <Space h={50} />

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
