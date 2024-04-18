import {
  Autocomplete,
  AutocompleteProps,
  Stack,
  TextFieldProps,
} from "@mui/material";
import { DropdownOption, sharedAutocompleteProps } from "./Dropdown";
import TextField from "./TextField";
import Chip from "./Chip";
import { isNil } from "lodash";
import Label from "../ui/label/Label";

export type Props<V> = Omit<
  AutocompleteProps<V, true, boolean, undefined>,
  "renderInput" | "multiple"
> &
  Omit<TextFieldProps, "onChange"> & {
    isLoading?: boolean;
    maxReached?: boolean;
  };

const DropdownMulti = <V extends DropdownOption>({
  label,
  error,
  helperText,
  required,
  maxReached,
  isLoading,
  ...autocompleteProps
}: Props<V>): JSX.Element => {
  return (
    <Stack>
      {!isNil(label) && <Label required={required}>{label}</Label>}

      <Autocomplete
        {...autocompleteProps}
        multiple={true}
        getOptionDisabled={maxReached ? () => true : undefined}
        renderTags={(tags, getProps) => {
          return tags.map((t, i) => {
            const { key, ...chipProps } = getProps({ index: i });
            return <Chip {...chipProps} key={key} {...t} />;
          });
        }}
        {...sharedAutocompleteProps}
        renderInput={(params) => (
          <TextField
            {...params}
            label={undefined}
            placeholder={isLoading ? "Loading..." : undefined}
            error={error}
            helperText={helperText}
            required={required}
            fullWidth={false}
          />
        )}
      />
    </Stack>
  );
};

export default DropdownMulti;
