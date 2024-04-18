import { UseFormProps } from "react-hook-form";

export const formProps: Pick<UseFormProps, "mode" | "reValidateMode"> = {
  mode: "all",
  reValidateMode: "onChange",
};
