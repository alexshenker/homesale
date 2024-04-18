import { IconButton as MUIIconButton, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
    onClick: () => void;
    icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
        muiName: string;
    };
    disabled?: boolean;
}

const IconButton = (props: Props): JSX.Element => {
    return (
        <MUIIconButton onClick={props.onClick} disabled={props.disabled}>
            <props.icon />
        </MUIIconButton>
    );
};

export default IconButton;
