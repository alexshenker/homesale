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

const TextField = ({ label, fullWidth, ...props }: Props): JSX.Element => {
  const hide = props.type === "hidden";

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
      },
      [`& .${outlinedInputClasses.notchedOutline}`]: {
        border: hide ? "none" : `1px solid ${colors.border}`,
      },
      [`& .${outlinedInputClasses.root}`]: {
        "&:hover fieldset": {
          border: `1px solid ${colors.border} `,
        },
        "&.Mui-focused fieldset": {
          border: `1px solid ${colors.border}`,
        },
        "&.Mui-error fieldset": {
          border: `1px solid ${colors.border}`,
        },
      },
    }));
  }, [fullWidth, hide, props.multiline]);

  return (
    <Stack>
      {!isNil(label) && !hide && (
        <Label required={props.required}>{label}</Label>
      )}

      <StyledTextField
        {...props}
        inputProps={{ ...props.inputProps, className: "text-sm" }}
        value={props.value ?? ""}
      />
    </Stack>
  );
};

export default TextField;
