import { Box } from "@mui/material";

interface Props {
  h?: number;
}

const defaultH = 25;

const Space = (props: Props): JSX.Element => {
  return (
    <Box
      width={"100%"}
      height={`${props.h ?? defaultH}px`}
      minHeight={`${props.h ?? defaultH}px`}
    />
  );
};

export default Space;
