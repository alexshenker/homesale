import { TableHead } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface Props {}

const Head: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <TableHead>{children}</TableHead>;
};

export default Head;
