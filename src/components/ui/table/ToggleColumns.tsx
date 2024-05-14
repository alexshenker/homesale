import { Box } from "@mui/material";
import Text from "../text/Text";
import { ColsToShow } from "./Table";

interface Props<ColName extends string> {
    columns: readonly ColName[];
    columnsToShow: ColsToShow<ColName>;
    setColumnsToShow: (cols: ColsToShow<ColName>) => void;
}

const ToggleColumns = <ColName extends string>(
    props: Props<ColName>
): JSX.Element => {
    return (
        <Box padding={2}>
            {props.columns.map((col) => {
                const on = props.columnsToShow[col];
                return (
                    <Box
                        component="button"
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
                        <Text>{col}:</Text>
                        {on ? (
                            <Text type="success">{"On"}</Text>
                        ) : (
                            <Text type="error">{"Off"}</Text>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

export default ToggleColumns;
