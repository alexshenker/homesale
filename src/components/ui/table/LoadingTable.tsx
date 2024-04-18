import { useMemo } from "react";
import Table, { Props as TableProps, Row } from "./Table";
import { range } from "lodash";
import { Skeleton } from "@mui/material";

interface Props<ColName extends string>
  extends Pick<TableProps<ColName>, "columns"> {}

const LoadingTable = <ColName extends string>(
  props: Props<ColName>,
): JSX.Element => {
  const rows: Row<ColName>[] = useMemo(() => {
    return range(10).map((r) => {
      return {
        ...props.columns.reduce(
          (obj, col) => {
            return {
              ...obj,
              [col]: { value: <Skeleton /> },
            };
          },
          { key: `${r}` } as Row<ColName>,
        ),
      };
    });
  }, [props.columns]);

  return <Table columns={props.columns} rows={rows} />;
};

export default LoadingTable;
