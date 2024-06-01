import { Controller, ControllerProps } from "react-hook-form";
import Radio, { RadioProps } from "../Radio";

type Props<T extends string> = Omit<ControllerProps, "render"> &
    OmitMod<RadioProps<T>, "value"> & { required?: boolean };

const FormRadioField = <T extends string>({
    options,
    required,
    ...controllerProps
}: Props<T>): JSX.Element => {
    return (
        <Controller
            {...controllerProps}
            rules={{ ...controllerProps.rules, required }}
            render={({ field }) => {
                const { ref: _ref, ...restField } = field;

                return <Radio {...restField} options={options} />;
            }}
        />
    );
};

export default FormRadioField;
