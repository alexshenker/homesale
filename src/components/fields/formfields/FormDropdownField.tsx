import {
    Controller,
    ControllerProps,
    ControllerRenderProps,
} from "react-hook-form";
import Dropdown, { DropdownOption } from "../Dropdown";
import { TextFieldProps } from "@mui/material";
import { Props as DropdownProps } from "../Dropdown";

type Props = Omit<ControllerProps, "render"> &
    Pick<TextFieldProps, "label" | "required"> & {
        render?: never; //Without this, ControllerProps requires render
    } & Pick<
        DropdownProps<DropdownOption>,
        "options" | "onKeyDown" | "disableClearable"
    > & {
        isLoading?: boolean;
    };

const FormDropdownField = ({
    label,
    required,
    options,
    onKeyDown,
    isLoading,
    disableClearable,
    ...controllerProps
}: Props): JSX.Element => {
    return (
        <Controller
            {...controllerProps}
            rules={{ ...controllerProps.rules, required }}
            render={({ field, fieldState }) => {
                return (
                    <Dropdown
                        {...field}
                        placeholder={isLoading ? "Loading..." : undefined}
                        onChange={
                            ((_, val) =>
                                field.onChange(
                                    val
                                )) as ControllerRenderProps["onChange"]
                        }
                        label={label}
                        ref={undefined} //Avoid passing on field.ref: improper syntax
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        options={options}
                        required={required}
                        onKeyDown={onKeyDown}
                        disableClearable={disableClearable}
                    />
                );
            }}
        />
    );
};

export default FormDropdownField;
