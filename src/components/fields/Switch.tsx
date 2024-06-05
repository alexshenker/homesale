import { Switch as MUISwitch, Stack, SwitchProps } from "@mui/material";
import Label from "../ui/label/Label";
import exhaustiveSwitch from "@/utils/public/exhaustiveSwitch";

export interface Props extends OmitMod<SwitchProps, "checked"> {
    label: React.ReactNode;
    on: boolean;
    labelPlacement?: "top" | "left" | "right";
}

const Switch = ({
    label,
    on,
    labelPlacement,
    ...props
}: Props): JSX.Element => {
    const labelPlacementLocal = labelPlacement ?? "right";

    return (
        <Stack
            direction={labelPlacementLocal === "top" ? "column" : "row"}
            alignItems={"center"}
        >
            {(() => {
                switch (labelPlacementLocal) {
                    case "left": {
                        return (
                            <>
                                <Label>{label}</Label>
                                <MUISwitch checked={on} {...props} />
                            </>
                        );
                    }
                    case "right": {
                        return (
                            <>
                                <MUISwitch checked={on} {...props} />
                                <Label>{label}</Label>
                            </>
                        );
                    }
                    case "top": {
                        return (
                            <>
                                <Label>{label}</Label>
                                <MUISwitch checked={on} {...props} />
                            </>
                        );
                    }
                    default: {
                        return exhaustiveSwitch(labelPlacementLocal);
                    }
                }
            })()}
        </Stack>
    );
};

export default Switch;
