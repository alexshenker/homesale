import {
    Checkbox as MUICheckbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    checkboxClasses,
    typographyClasses,
} from "@mui/material";
import Label from "../ui/label/Label";
import Text from "../ui/text/Text";

export type Option<T extends string> = {
    label: T;
};

export type CheckboxProps<T extends string, O extends Option<T>> = {
    value: O[];
    options: O[] | readonly O[];
    label?: React.ReactNode;
    onChange: (val: O[]) => void;
    disabled?: boolean;
};

const Checkboxes = <T extends string, O extends Option<T>>(
    props: CheckboxProps<T, O>
): JSX.Element => {
    return (
        <FormControl component="fieldset" variant="standard">
            {props.label !== undefined && <Label>{props.label}</Label>}
            <FormGroup>
                {props.options.map((o) => {
                    const checked = props.value.some(
                        (v) => v.label === o.label
                    );

                    return (
                        <FormControlLabel
                            key={o.label}
                            control={
                                <MUICheckbox
                                    name={o.label}
                                    checked={checked}
                                    onChange={() => {
                                        if (props.disabled === true) {
                                            return;
                                        }

                                        if (checked) {
                                            props.onChange(
                                                props.value.filter(
                                                    (v) => v.label !== o.label
                                                )
                                            );
                                        } else {
                                            props.onChange([...props.value, o]);
                                        }
                                    }}
                                    disabled={props.disabled}
                                />
                            }
                            label={
                                <Text
                                    type={
                                        props.disabled ? "neutral" : undefined
                                    }
                                >
                                    {o.label}
                                </Text>
                            }
                        />
                    );
                })}
            </FormGroup>
        </FormControl>
    );
};

export default Checkboxes;
