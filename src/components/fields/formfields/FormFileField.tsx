"use client";

import { Controller, ControllerProps } from "react-hook-form";

import FileField, { Props as FileFieldProps } from "../fileField/FileField";

type Props = Omit<ControllerProps, "render"> &
    Pick<FileFieldProps, "label" | "placeholder" | "required" | "accept"> & {
        render?: never; //Without this, ControllerProps requires render
    };

const FormFileField = ({
    label,
    required,
    placeholder,
    accept,
    ...controllerProps
}: Props): JSX.Element => {
    return (
        <Controller
            {...controllerProps}
            rules={{ ...controllerProps.rules, required }}
            render={({ field, fieldState }) => {
                const { ref: _ref, ...restField } = field;

                return (
                    <FileField
                        {...restField}
                        placeholder={placeholder}
                        label={label}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        required={required}
                        accept={accept}
                    />
                );
            }}
        />
    );
};

export default FormFileField;
