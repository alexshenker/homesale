import { Grid } from "@mui/material";
import { Children, PropsWithChildren } from "react";

type NumOfCols = 2 | 3 | 4;

interface Props {
    cols?: NumOfCols;
}

const Wrap = (props: PropsWithChildren<Props>): JSX.Element => {
    return (
        <Grid container spacing={2}>
            {Children.map(props.children, (child) => {
                return (
                    <Grid xs={12 / (props.cols ?? 2)} item>
                        {child}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Wrap;
