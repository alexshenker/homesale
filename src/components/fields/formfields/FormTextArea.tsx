import { Controller, ControllerProps } from "react-hook-form";
import TextArea, { Props as TextAreaProps } from "../TextArea";

type Props = Omit<ControllerProps, "render"> &
    Pick<TextAreaProps, "label" | "required" | "placeholder" | "minRows"> & {
        render?: never; //Without this, ControllerProps requires render
    };

const FormTextArea = ({
    label,
    required,
    placeholder,
    minRows,
    ...controllerProps
}: Props): JSX.Element => {
    return (
        <Controller
            {...controllerProps}
            rules={{ ...controllerProps.rules, required }}
            render={({ field, fieldState }) => (
                <TextArea
                    {...field}
                    label={label}
                    ref={undefined} //Avoid passing on field.ref: improper syntax
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    required={required}
                    placeholder={placeholder}
                    minRows={minRows}
                />
            )}
        />
    );
};

export default FormTextArea;
