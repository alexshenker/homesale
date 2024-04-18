import { TableBody } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface Props {}

const Body: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <TableBody>{children}</TableBody>;
};

export default Body;
