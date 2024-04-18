"use client";

import colors from "@/utils/public/colors";
import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

export interface Props extends TypographyProps {
  overlay?: boolean; //This means the text is on top of a surface who's color is opposite of the main background color
  type?: "neutral" | "error" | "danger" | "success";
}

const Text: FC<React.PropsWithChildren<Props>> = ({
  overlay,
  type,
  ...props
}) => {
  return (
    <Typography
      {...props}
      sx={{
        color:
          type === "neutral"
            ? colors.textSubtle
            : type === "error" || type === "danger"
            ? colors.textError
            : type === "success"
            ? colors.textSuccess
            : overlay
            ? colors.textInverse
            : colors.text,
        fontSize: props.fontSize ?? "14px",
        cursor: props.onClick !== undefined ? "pointer" : undefined,
        width: "fit-content",
        ...props.sx,
      }}
    >
      {props.children}
    </Typography>
  );
};

export default Text;
