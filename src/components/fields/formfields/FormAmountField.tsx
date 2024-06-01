import FormTextField from "./FormTextField";

interface Props {
    name: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    label?: React.ReactNode;
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
                        const numberPattern = /^(0|[1-9]\d*)(\.\d+)?$/;
                        return numberPattern.test((v ?? "").replace(/,/g, ""))
                            ? true
                            : "Please enter a valid number";
                    },
                },
            }}
            formatValue={(v) => {
                const rawValue = v.replace(/[^0-9.]/g, "");
                
                const numericValue = Number(rawValue);

                return numericValue.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                });
            }}
        />
    );
};

export default FormAmountField;
