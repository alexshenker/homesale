import colors from "@/utils/public/colors";
import { IconButton, Badge as MUIBadge, badgeClasses } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
    badgeContent: React.ReactNode;
    ariaLabel: string;
}

const size = "15px";

const Badge = (props: PropsWithChildren<Props>): JSX.Element => {
    return (
        <IconButton aria-label={props.ariaLabel}>
            <MUIBadge
                badgeContent={props.badgeContent}
                color="primary"
                sx={{
                    [`& .${badgeClasses.badge}`]: {
                        width: size,
                        height: size,
                        minWidth: size,
                        fontSize: "10px",
                        backgroundColor: colors.error,
                    },
                }}
            >
                {props.children}
            </MUIBadge>
        </IconButton>
    );
};

export default Badge;
