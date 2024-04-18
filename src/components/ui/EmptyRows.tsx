import React from "react";
import Row from "./table/row/Row";
import Cell from "./table/cell/Cell";
import Text from "./text/Text";
import { range } from "lodash";
import { Box } from "@mui/material";

interface Props {
  numberOfColumns: number;
}

const EmptyRows = (props: Props): JSX.Element => {
  return (
    <>
      <Row>
        <Cell colSpan={props.numberOfColumns}>
          <Text type="neutral">Empty</Text>
        </Cell>
      </Row>
      {range(9).map((i) => (
        <Row key={i}>
          <Cell colSpan={props.numberOfColumns}>
            <Box visibility={"hidden"}>
              <Text>Placeholder</Text>
            </Box>
          </Cell>
        </Row>
      ))}
    </>
  );
};

export default EmptyRows;
