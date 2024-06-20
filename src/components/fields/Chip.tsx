import colors from "@/utils/public/colors";
import { ChipProps, Chip as MUIChip, chipClasses } from "@mui/material";

interface Props extends OmitMod<ChipProps, "label"> {
    label: React.ReactNode;
}

const Chip = (props: Props): JSX.Element => {
    return (
        <MUIChip
            sx={{
                backgroundColor: colors.background,
                color: colors.text,
                fontSize: "12px",
                [`& .${chipClasses.deleteIcon}`]: {
                    color: colors.icon,
                    "&:hover": {
                        color: colors.icon,
                    },
                },
            }}
            {...props}
        />
    );
};

export default Chip;
