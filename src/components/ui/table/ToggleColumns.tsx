import { Box } from "@mui/material";
import Text from "../text/Text";
import { ColsToShow } from "./Table";
import Switch from "@/components/fields/Switch";

interface Props<ColName extends string> {
    columns: readonly ColName[];
    columnsToShow: ColsToShow<ColName>;
    setColumnsToShow: (cols: ColsToShow<ColName>) => void;
}

const ToggleColumns = <ColName extends string>(
    props: Props<ColName>
): JSX.Element => {
    return (
        <Box>
            {props.columns.map((col) => {
                const on = props.columnsToShow[col];
                return (
                    <Box
                        key={col}
                        display="flex"
                        gap={1}
                        onClick={() => {
                            props.setColumnsToShow({
                                ...props.columnsToShow,
                                [col]: !on,
                            });
                        }}
                    >
                        <Switch on={on} label={col}></Switch>
                    </Box>
                );
            })}
        </Box>
    );
};

export default ToggleColumns;
