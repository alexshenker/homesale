import { Box, IconButton, Table as MUITable, Stack } from "@mui/material";
import Head from "./head/Head";
import Body from "./body/Body";
import Row from "./row/Row";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Cell from "./cell/Cell";
import copy from "@/utils/public/copy";
import Footer, { RowsPerPageOption } from "./footer/Footer";
import { useState } from "react";
import EmptyRows from "../EmptyRows";
import Text from "../text/Text";
import Tooltip from "../tooltip/Tooltip";
import ToggleColumns from "./ToggleColumns";
import SearchBar from "@/components/SearchBar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const sortValue = "sortValue";
const cellValue = "value";

export type CellContent =
    | string
    | JSX.Element
    | { [cellValue]: React.ReactNode; [sortValue]?: string };

export type ColsToShow<ColName extends string> = Record<ColName, boolean>;

export type Row<ColName extends string> = Record<ColName, CellContent> & {
    key: string;
    onClick?: () => void;
};

export type Props<ColName extends string> = {
    columns: readonly ColName[];
    initiallyDisabledColumns?: readonly ColName[];
    rows: Row<ColName>[];
    headComponent?: React.ReactNode;
} & (
    | { searchTerm: string; setSearchTerm: (t: string) => void }
    | { searchTerm?: undefined; setSearchTerm?: undefined }
);

const Table = <ColName extends string>(props: Props<ColName>): JSX.Element => {
    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState<RowsPerPageOption>(10);

    const [columnsToShow, setColumnsToShow] = useState<ColsToShow<ColName>>(
        props.columns.reduce((cols, col) => {
            if (props.initiallyDisabledColumns?.some((disC) => disC === col)) {
                cols[col] = false;
            } else {
                cols[col] = true;
            }

            return cols;
        }, {} as ColsToShow<ColName>)
    );

    return (
        <>
            <Stack direction={"row"} gap={2}>
                {props.searchTerm !== undefined &&
                    props.setSearchTerm !== undefined && (
                        <Box>
                            <SearchBar
                                searchTerm={props.searchTerm}
                                onChange={props.setSearchTerm}
                            />
                        </Box>
                    )}
                <ToggleColumns
                    columns={props.columns}
                    columnsToShow={columnsToShow}
                    setColumnsToShow={setColumnsToShow}
                />
                {props.headComponent}
            </Stack>
            <MUITable>
                <Head>
                    <Row>
                        {props.columns.map((col) => {
                            const columnDisabled = columnsToShow[col] === false;

                            if (columnDisabled) {
                                return (
                                    <Cell key={col}>
                                        <Text type="neutral">{col}</Text>
                                    </Cell>
                                );
                            }
                            return (
                                <Cell
                                    key={col}
                                    style={{ whiteSpace: "nowrap" }}
                                >
                                    <Text type="neutral" fontWeight={"bold"}>
                                        {col}
                                    </Text>
                                </Cell>
                            );
                        })}
                    </Row>
                </Head>

                <Body>
                    {props.rows.length === 0 && (
                        <EmptyRows numberOfColumns={props.columns.length} />
                    )}
                    {props.rows.map((r) => {
                        return (
                            <Row key={r.key}>
                                {props.columns.map((col) => {
                                    const key = `${r.key}-${col}`;
                                    const cell: CellContent = r[col];

                                    const valueToCopy =
                                        typeof cell === "string"
                                            ? cell
                                            : typeof cell === "object" &&
                                                sortValue in cell
                                              ? cell[sortValue] ?? null
                                              : null;

                                    const cellValueParsed =
                                        typeof cell === "string"
                                            ? cell
                                            : typeof cell === "object" &&
                                                cellValue in cell
                                              ? cell[cellValue]
                                              : cell;

                                    const columnDisabled =
                                        columnsToShow[col] === false;

                                    if (columnDisabled) {
                                        return <Cell key={key} />;
                                    }

                                    return (
                                        <Cell key={key}>
                                            <Box
                                                {...(valueToCopy !== null
                                                    ? {
                                                          display: "flex",
                                                          alignItems: "center",
                                                      }
                                                    : {})}
                                            >
                                                {cellValueParsed}

                                                {valueToCopy !== null && (
                                                    <Tooltip
                                                        title="Copied!"
                                                        placement="top"
                                                        reactOnClick
                                                    >
                                                        <IconButton
                                                            onClick={() =>
                                                                copy(
                                                                    valueToCopy
                                                                )
                                                            }
                                                        >
                                                            <ContentCopyIcon
                                                                style={{
                                                                    width: "13px",
                                                                    height: "13px",
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </Box>
                                        </Cell>
                                    );
                                })}

                                {r.onClick !== undefined && (
                                    <Cell>
                                        <IconButton onClick={r.onClick}>
                                            <ChevronRightIcon />
                                        </IconButton>
                                    </Cell>
                                )}
                            </Row>
                        );
                    })}
                </Body>
                <Footer
                    numberOfColumns={props.columns.length}
                    numberOfRows={props.rows.length}
                    currentPage={page}
                    rowsPerPage={rowsPerPage}
                    changePage={setPage}
                    changeRowsPerPage={setRowsPerPage}
                />
            </MUITable>
        </>
    );
};

export default Table;
