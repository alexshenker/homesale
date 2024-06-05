import { Controller, ControllerProps } from "react-hook-form";
import Radio, { RadioProps } from "../Radio";
import Checkboxes, { CheckboxProps, Option } from "../Checkbox";

type Props<T extends string, O extends Option<T>> = Omit<
    ControllerProps,
    "render"
> &
    Pick<CheckboxProps<T, O>, "label" | "options">;

const FormCheckboxField = <T extends string, O extends Option<T>>({
    options,
    label,
    disabled,
    ...controllerProps
}: Props<T, O>): JSX.Element => {
    return (
        <Controller
            {...controllerProps}
            rules={{ ...controllerProps.rules }}
            render={({ field }) => {
                const { ref: _ref, ...restField } = field;

                return (
                    <Checkboxes
                        {...restField}
                        options={options}
                        label={label}
                        disabled={disabled}
                    />
                );
            }}
        />
    );
};

export default FormCheckboxField;
