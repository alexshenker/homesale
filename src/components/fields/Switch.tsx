import { Switch as MUISwitch, Stack, SwitchProps } from "@mui/material";
import Label from "../ui/label/Label";

export interface Props extends OmitMod<SwitchProps, "checked"> {
    label: React.ReactNode;
    on: boolean;
}

const Switch = ({ label, on, ...props }: Props): JSX.Element => {
    return (
        <Stack direction={"row"} alignItems={"center"}>
            <MUISwitch checked={on} {...props} />
            <Label>{label}</Label>
        </Stack>
    );
};

export default Switch;
