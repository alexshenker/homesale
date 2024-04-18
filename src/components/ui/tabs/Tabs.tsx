import { Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface Props {}

const Tabs: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <Stack direction={"row"} gap={2} padding={1}>
      {props.children}
    </Stack>
  );
};

export default Tabs;
