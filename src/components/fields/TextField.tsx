import colors from "@/utils/public/colors";
import {
    TextField as MUITextField,
    Stack,
    TextFieldProps,
    inputBaseClasses,
    outlinedInputClasses,
    styled,
} from "@mui/material";
import { useMemo } from "react";
import Label from "../ui/text/Label";
import { isNil } from "lodash";

export type Props = TextFieldProps & {
    fullWidth?: boolean;
};

export const textFieldPaddingY = "10px";
export const textFieldPaddingX = "14px";
export const textFieldBorderRadius = "10px";

const TextField = ({ label, fullWidth, ...props }: Props): JSX.Element => {
    const StyledTextField = useMemo(() => {
        return styled(MUITextField)(() => ({
            [`& .${inputBaseClasses.root}`]: {
                color: colors.text,
                ...(props.multiline === true && {
                    padding: `0px`,
                }), //This means its being used as textarea, which needs updated padding
            },
            [`& .${outlinedInputClasses.input}`]: {
                padding: `${textFieldPaddingY} ${textFieldPaddingX}`,
                width: fullWidth === false ? "auto" : "100%",
                backgroundColor: colors.background,
                borderRadius: textFieldBorderRadius,
            },
            [`& .${outlinedInputClasses.notchedOutline}`]: {
                border: "none",
            },
            [`& .${outlinedInputClasses.root}`]: {
                "&:hover fieldset": {
                    border: "none",
                },
                "&.Mui-focused fieldset": {
                    border: "none",
                },
                "&.Mui-error fieldset": {
                    border: "none",
                },
                paddingRight: "0px",
                borderRadius: textFieldBorderRadius,
                backgroundColor: colors.surface,
                border: `1px solid ${colors.text}`,
            },
        }));
    }, [fullWidth, props.multiline]);

    return (
        <Stack>
            {!isNil(label) && <Label required={props.required}>{label}</Label>}

            <StyledTextField
                {...props}
                inputProps={{ ...props.inputProps, className: "text-sm" }}
                value={props.value ?? ""}
            />
        </Stack>
    );
};

export default TextField;
