import { TableCell, TableCellProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface Props extends TableCellProps {}

const Cell: FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
    return (
        <TableCell
            {...props}
            style={{
                padding: "10px",
                ...props.style,
            }}
        >
            {children}
        </TableCell>
    );
};

export default Cell;
