import colors from "@/utils/public/colors";
import { FormLabel, formLabelClasses } from "@mui/material";

interface Props {
    required?: boolean;
}

const Label = (props: React.PropsWithChildren<Props>): JSX.Element => {
    return (
        <FormLabel
            required={props.required}
            component="label"
            className="text-sm"
            sx={{
                [`&.${formLabelClasses.root}`]: {
                    color: colors.text,
                },
            }}
        >
            {props.children}
        </FormLabel>
    );
};

export default Label;
