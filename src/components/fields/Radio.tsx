import {
    FormControlLabel,
    Radio as MUIRadio,
    RadioGroup,
    RadioGroupProps,
    formGroupClasses,
} from "@mui/material";
import { capitalize } from "lodash";
import Text from "../ui/text/Text";

export type RadioProps<T extends string> = {
    value: T | null;
    options: T[];

    /** Should attempt to display buttons horizontally? */
    row?: boolean;
} & OmitMod<RadioGroupProps, "value">;

const Radio = <T extends string>({
    options,
    row,
    ...radioGroupProps
}: RadioProps<T>): JSX.Element => {
    return (
        <RadioGroup
            aria-labelledby="listing-type-label"
            name="listing-type-selection"
            sx={{
                [`&.${formGroupClasses.root}`]: {
                    flexDirection: row ? "row" : "column",
                },
            }}
            {...radioGroupProps}
        >
            {options.map((o) => {
                return (
                    <FormControlLabel
                        key={o}
                        value={o}
                        control={<MUIRadio />}
                        label={
                            <Text
                                fontSize={"16px"}
                                fontWeight={
                                    radioGroupProps.value === o
                                        ? "bold"
                                        : undefined
                                }
                            >
                                {capitalize(o)}
                            </Text>
                        }
                    />
                );
            })}
        </RadioGroup>
    );
};

export default Radio;
