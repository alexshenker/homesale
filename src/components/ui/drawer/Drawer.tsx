"use client";

import {
    DrawerProps,
    Drawer as MUIDrawer,
    Stack,
    Toolbar,
    drawerClasses,
} from "@mui/material";
import { PropsWithChildren } from "react";

type Size = "xs" | "sm" | "md" | "lg" | "full";

interface Props {
    onClose?: () => void;
    anchor?: DrawerProps["anchor"];
    size?: Size;
    variant?: DrawerProps["variant"];
    clipped?: boolean;
    open?: boolean;
}

const bySize: Record<Size, `${number}px` | `${number}%`> = {
    xs: "250px",
    sm: "525px",
    md: "700px",
    lg: "900px",
    full: "92%",
};

const Drawer = ({
    clipped,
    ...props
}: PropsWithChildren<Props>): JSX.Element => {
    return (
        <MUIDrawer
            open={props.open ?? true}
            {...props}
            anchor={props.anchor ?? "right"}
            sx={{
                width: bySize[props.size ?? "sm"],
                [`& .${drawerClasses.paper}`]: {
                    width: bySize[props.size ?? "sm"],
                },
                ...(clipped && {
                    zIndex: (t) => t.zIndex.appBar - 1,
                }) /* Ensures the clipped drawer zIndex is lower than AppBar zIndex */,
            }}
        >
            {clipped && <Toolbar /> /* Adds a space the height of navbar */}
            <Stack padding={2}>{props.children}</Stack>
        </MUIDrawer>
    );
};

export default Drawer;
