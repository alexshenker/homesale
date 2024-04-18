import colors from "@/utils/public/colors";
import { Modal as MUIModal, ModalProps, Paper } from "@mui/material";
interface Props extends ModalProps {}

const Modal = (props: Props): JSX.Element => {
  return (
    <MUIModal {...props}>
      <Paper
        className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 p-5"
        style={{
          backgroundColor: colors.surface,
          border: colors.border,
        }}
      >
        {props.children}
      </Paper>
    </MUIModal>
  );
};

export default Modal;
