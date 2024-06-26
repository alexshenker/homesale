import { Grid } from "@mui/material";
import { Children, PropsWithChildren } from "react";

type NumOfCols = 1 | 2 | 3 | 4;

interface Props {
    cols?: NumOfCols;
    smCols?: NumOfCols;
    xsCols?: NumOfCols; //Optional alternative num of columns for small screen width
}

const Wrap = (props: PropsWithChildren<Props>): JSX.Element => {
    return (
        <Grid container spacing={2} flexWrap="wrap">
            {Children.map(props.children, (child) => {
                return (
                    <Grid
                        md={12 / (props.cols ?? 2)}
                        sm={12 / (props.smCols ?? props.cols ?? 2)}
                        xs={
                            12 /
                            (props.xsCols ?? props.smCols ?? props.cols ?? 2)
                        }
                        item
                    >
                        {child}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Wrap;
