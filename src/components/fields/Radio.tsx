import {
    FormControlLabel,
    Radio as MUIRadio,
    RadioGroup,
    RadioGroupProps,
} from "@mui/material";
import { capitalize } from "lodash";

export type RadioProps<T extends string> = {
    value: T | null;
    options: T[];
} & OmitMod<RadioGroupProps, "value">;

const Radio = <T extends string>({
    options,
    ...radioGroupProps
}: RadioProps<T>): JSX.Element => {
    return (
        <RadioGroup
            aria-labelledby="listing-type-label"
            name="listing-type-selection"
            {...radioGroupProps}
        >
            {options.map((o) => {
                return (
                    <FormControlLabel
                        key={o}
                        value={o}
                        control={<MUIRadio />}
                        label={capitalize(o)}
                    />
                );
            })}
        </RadioGroup>
    );
};

export default Radio;
