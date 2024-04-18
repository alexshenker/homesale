import { TextFieldProps } from "@mui/material";
import TextField from "../TextField";
import { Controller, ControllerProps } from "react-hook-form";

type Props = Omit<ControllerProps, "render"> &
  Pick<
    TextFieldProps,
    "label" | "required" | "disabled" | "placeholder" | "type"
  > & {
    render?: never; //Without this, ControllerProps requires render
  } & {
    hidden?: boolean;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  };

const FormTextField = ({
  label,
  required,
  disabled,
  hidden,
  placeholder,
  startAdornment,
  endAdornment,
  ...controllerProps
}: Props): JSX.Element => {
  return (
    <Controller
      {...controllerProps}
      rules={{ ...controllerProps.rules, required }}
      render={({ field, fieldState }) => {
        return (
          <TextField
            {...field}
            label={label}
            ref={undefined} //Avoid passing on field.ref: improper syntax
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            required={required}
            disabled={disabled}
            type={hidden ? "hidden" : controllerProps.type}
            placeholder={placeholder}
            InputProps={{
              startAdornment,
              endAdornment,
            }}
          />
        );
      }}
    />
  );
};

export default FormTextField;
