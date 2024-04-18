import { TableRow } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface Props {}

const Row: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <TableRow>{children}</TableRow>;
};

export default Row;
