import { Switch as MUISwitch, Stack, SwitchProps } from "@mui/material";
import Label from "../ui/label/Label";

export interface Props extends OmitMod<SwitchProps, "checked"> {
  label: React.ReactNode;
  checked: boolean;
}

const Switch = ({ label, checked, ...props }: Props): JSX.Element => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <MUISwitch checked={checked} {...props} />
      <Label>{label}</Label>
    </Stack>
  );
};

export default Switch;
