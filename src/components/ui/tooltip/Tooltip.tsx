import { Box, Tooltip as MUITooltip, TooltipProps } from "@mui/material";
import { useState } from "react";

interface Props extends Pick<TooltipProps, "title" | "placement" | "children"> {
  reactOnClick: boolean;
}

const Tooltip = ({ reactOnClick, ...props }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  const openTooltip = () => {
    setOpen(true);

    setTimeout(() => setOpen(false), 400);
  };

  if (reactOnClick === true) {
    return (
      <Box display={"inline-block"} onClick={openTooltip}>
        <MUITooltip open={open} disableHoverListener={true} {...props}>
          {props.children}
        </MUITooltip>
      </Box>
    );
  }

  return <MUITooltip {...props}>{props.children}</MUITooltip>;
};

export default Tooltip;
