import { CircularProgress } from "@mui/material";

const Loading = (): JSX.Element => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30 min-w-min z-50`}
    >
      <CircularProgress className={`w-10 h-10`} />
    </div>
  );
};

export default Loading;
