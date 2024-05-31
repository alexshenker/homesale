"use client";

import colors from "@/utils/public/colors";
import {
    ButtonProps,
    Button as MUIButton,
    SxProps,
    Theme,
    buttonClasses,
} from "@mui/material";
import opacity from "hex-color-opacity";
import { useMemo } from "react";

export type Props = ButtonProps & {
    overlay?: boolean;
};

const Button = ({ sx, variant, ...props }: Props): JSX.Element => {
    const sxLocal: SxProps<Theme> = useMemo(() => {
        const shadowColor = "#000000";

        const shadowColor1 = opacity(shadowColor, 0.2);

        const shadowColor2 = opacity(shadowColor, 0.14);

        const shadowColor3 = opacity(shadowColor, 0.12);

        const shadow2 = `0px 2px 2px 0px ${shadowColor2}`;

        const shadow3 = `0px 3px 5px 0px ${shadowColor3}`;

        return {
            color: colors.text,
            textTransform: "none",
            width: "fit-content",
            height: "fit-content",
            borderTop: `1px solid ${opacity(shadowColor, 0.1)}`,
            [`&.${buttonClasses.root}`]: {
                boxShadow: `2px 4px 5px -2px ${shadowColor1}, ${shadow2}, ${shadow3}`,
                "&:hover": {
                    backgroundColor: colors.surface,
                    boxShadow: `4px 4px 5px -1px ${shadowColor1}, ${shadow2}, ${shadow3}`,
                },
                "&:active": {
                    boxShadow: `1px 2px 2px -2px ${shadowColor1}, ${shadow2}, ${shadow3}`,
                },
                backgroundColor: colors.surface,
            },
            [`&.${buttonClasses.disabled}`]: {
                backgroundColor: colors.border,
                color: "rgba(0, 0, 0, 0.9)",
                opacity: 0.5,
            },
            ...sx,
        };
    }, [sx]);

    return (
        <MUIButton variant={variant ?? "contained"} sx={sxLocal} {...props} />
    );
};

export default Button;
