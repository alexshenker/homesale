import { PropsWithChildren } from "react";
import Text from "./Text";

const PageTitle = ({ children }: PropsWithChildren): JSX.Element => {
  return <Text fontSize={"20px"}>{children}</Text>;
};

export default PageTitle;
