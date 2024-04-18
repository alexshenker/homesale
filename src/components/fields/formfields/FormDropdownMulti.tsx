import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
} from "react-hook-form";
import { DropdownOption } from "../Dropdown";
import DropdownMulti, { Props as DropdownProps } from "../DropdownMulti";
import { Props as TextFieldProps } from "../TextField";

type Props = Omit<ControllerProps, "render"> &
  Pick<TextFieldProps, "label" | "required"> & {
    render?: never; //Without this, ControllerProps requires render
  } & Pick<DropdownProps<DropdownOption>, "options" | "onKeyDown"> & {
    maxSelections?: number;
    isLoading?: boolean;
  };

const FormDropdownMulti = ({
  label,
  required,
  options,
  onKeyDown,
  maxSelections,
  isLoading,
  ...controllerProps
}: Props): JSX.Element => {
  return (
    <Controller
      {...controllerProps}
      rules={{ ...controllerProps.rules, required }}
      render={({ field, fieldState }) => {
        const maxReached =
          maxSelections === undefined
            ? false
            : Array.isArray(field.value) && field.value.length >= maxSelections;

        return (
          <DropdownMulti
            {...field}
            onChange={
              ((_, val) =>
                field.onChange(val)) as ControllerRenderProps["onChange"]
            }
            label={label}
            ref={undefined} //Avoid passing on field.ref: improper syntax
            error={fieldState.invalid}
            helperText={
              fieldState.error?.message ?? maxReached
                ? "Maximum selections reached"
                : undefined
            }
            options={options}
            required={required}
            onKeyDown={onKeyDown}
            maxReached={maxReached}
            isLoading={isLoading}
          />
        );
      }}
    />
  );
};

export default FormDropdownMulti;
