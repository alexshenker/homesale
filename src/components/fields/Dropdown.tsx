import {
  Autocomplete,
  AutocompleteProps,
  Stack,
  TextFieldProps,
  outlinedInputClasses,
} from "@mui/material";
import { isNil } from "lodash";
import Label from "../ui/label/Label";
import TextField from "./TextField";
import { HTMLAttributes } from "react";

const dropdownSX = {
  [`& .${outlinedInputClasses.root}`]: {
    padding: 0,
  },
};

const renderOption = (
  props: HTMLAttributes<HTMLLIElement>,
  option: DropdownOption,
) => (
  <li {...props} key={option.label}>
    {option.labelEnhanced ?? option.label}
  </li>
);

export const sharedAutocompleteProps = {
  sx: dropdownSX,
  renderOption: renderOption,
  filterSelectedOptions: true,
  isOptionEqualToValue: (o: DropdownOption, val: DropdownOption) =>
    o.label === val.label,
  getOptionLabel: (o: DropdownOption) => o.label,
  disablePortal: true,
};

export interface DropdownOption<T extends string = string> {
  label: T;
  labelEnhanced?: React.ReactNode;
}

export const presets = {
  getOptionLabel: (o: DropdownOption) => o.label,
};

export type Props<V> = Omit<
  AutocompleteProps<V, false | undefined, boolean, undefined>,
  "renderInput" | "multiple"
> &
  Omit<TextFieldProps, "onChange"> & { isLoading?: boolean };

const Dropdown = <V extends DropdownOption>({
  label,
  error,
  helperText,
  required,
  isLoading,
  ...autocompleteProps
}: Props<V>): JSX.Element => {
  return (
    <Stack>
      {!isNil(label) && <Label required={required}>{label}</Label>}

      <Autocomplete
        {...autocompleteProps}
        value={autocompleteProps.value ?? null}
        {...sharedAutocompleteProps}
        renderInput={(params) => (
          <TextField
            {...params}
            label={undefined}
            placeholder={isLoading ? "Loading..." : undefined}
            error={error}
            helperText={helperText}
            required={required}
          />
        )}
      />
    </Stack>
  );
};

export default Dropdown;
