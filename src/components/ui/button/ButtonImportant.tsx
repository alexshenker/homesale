import { FC } from "react";
import Button, { Props as ButtonProps } from "./Button";

import opacity from "hex-color-opacity";
import { buttonClasses } from "@mui/material";
import colors from "@/utils/public/colors";

const whiteBorder = "#ffffff";

interface Props extends ButtonProps {}

const ButtonImportant: FC<Props> = ({ style, sx, ...props }: Props) => {
  return (
    <Button
      overlay
      style={{
        border: `1px solid ${opacity(whiteBorder, 0.4)}`,
        borderRadius: "30px",
        background: colors.gradientReverse,
        letterSpacing: "1.5px",
        fontWeight: 500,
        padding: "7px 23px",
        fontSize: "17px",
        ...style,
      }}
      sx={{
        [`&.${buttonClasses.root}`]: {
          "&:hover": {
            borderColor: `${opacity(whiteBorder, 0.6)} !important`,
            boxShadow: `3px 3px 2px -2px ${opacity(
              whiteBorder,
              0.2,
            )} !important`,
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default ButtonImportant;
