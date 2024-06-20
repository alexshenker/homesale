import colors from "@/utils/public/colors";
import { FormLabel } from "@mui/material";
import { FC } from "react";

interface Props {
    required?: boolean;
}

const Label: FC<React.PropsWithChildren<Props>> = (props) => {
    return (
        <FormLabel
            required={props.required}
            component="label"
            className="text-sm"
            style={{
                color: colors.text,
            }}
        >
            {props.children}
        </FormLabel>
    );
};

export default Label;
