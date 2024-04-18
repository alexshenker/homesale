import { TableFooter, TablePagination } from "@mui/material";
import Row from "../row/Row";

export type RowsPerPageOption = 10 | 25 | 50 | 100 | -1;

const rowsPerPage: { label: string; value: RowsPerPageOption }[] = [
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
  { label: "All", value: -1 },
];

interface Props {
  numberOfColumns: number;
  numberOfRows: number;
  currentPage: number;
  rowsPerPage: RowsPerPageOption;
  changePage: (page: number) => void;
  changeRowsPerPage: (rows: RowsPerPageOption) => void;
}

const Footer = (props: Props): JSX.Element => {
  return (
    <TableFooter>
      <Row>
        <TablePagination
          rowsPerPageOptions={rowsPerPage.map((n) => n)}
          colSpan={props.numberOfColumns}
          count={props.numberOfRows}
          page={props.currentPage}
          rowsPerPage={props.rowsPerPage}
          onPageChange={(_e, page) => props.changePage(page)}
          onRowsPerPageChange={(e) =>
            props.changeRowsPerPage(+e.target.value as RowsPerPageOption)
          }
          labelRowsPerPage="Rows:"
          showFirstButton
          showLastButton
        />
      </Row>
    </TableFooter>
  );
};

export default Footer;
