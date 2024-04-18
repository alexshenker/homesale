import TextField, { Props as TextFieldProps } from "./TextField";

export type Props = TextFieldProps & {
  label?: string;
  error?: boolean;
  helperText?: string;
  minRows?: number;
};

const TextArea = (props: Props): JSX.Element => {
  //Do not remove maxRows, too many rows cause errors with MUI
  return <TextField multiline minRows={2} maxRows={15} {...props} />;
};

export default TextArea;
