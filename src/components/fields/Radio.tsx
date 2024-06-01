import { FormControlLabel, Radio as MUIRadio, RadioGroup } from "@mui/material";
import { capitalize } from "lodash";

interface Props<T extends string> {
    value: T | null;
    options: T[];
}

const Radio = <T extends string>(props: Props<T>): JSX.Element => {
    return (
        <RadioGroup
            aria-labelledby="listing-type-label"
            defaultValue={props.value}
            name="listing-type-selection"
        >
            {props.options.map((o) => {
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
