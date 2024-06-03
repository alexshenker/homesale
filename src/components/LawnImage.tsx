import { Box } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

interface Props {}

const LawnImage = (props: Props): JSX.Element => {
    return (
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
                        "linear-gradient(to bottom, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 0.2) 60%)",
                },
            }}
        >
            <Image
                src="/images/lawn_3.webp"
                width={2048}
                height={2048}
                alt="lawn"
                objectFit="contain"
            />
        </Box>
    );
};

export default LawnImage;
