import { isNil } from "lodash";
import FormTextField from "./FormTextField";

interface Props {
    name: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    label?: React.ReactNode;
    intOnly?: boolean; //Only integers allowed
}

const FormAmountField = (props: Props): JSX.Element => {
    return (
        <FormTextField
            name={props.name}
            startAdornment={props.startAdornment}
            endAdornment={props.endAdornment}
            label={props.label}
            rules={{
                validate: {
                    isNumber: (v) => {
                        if (isNil(v) || v === "") {
                            return true;
                        }

                        const numberPattern = props.intOnly
                            ? /^(0|[1-9]\d*)$/
                            : /^(0|[1-9]\d*)(\.\d+)?$/;

                        return numberPattern.test((v ?? "").replace(/,/g, ""))
                            ? true
                            : props.intOnly
                              ? "Please enter a valid integer"
                              : "Please enter a valid number";
                    },
                },
            }}
            formatValue={(v) => {
                if (isNil(v) || v === "") {
                    return;
                }

                const rawValue = v.replace(/[^0-9.]/g, "");

                const numericValue = Number(rawValue);

                return numericValue.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                });
            }}
            numbersOnly
        />
    );
};

export default FormAmountField;
