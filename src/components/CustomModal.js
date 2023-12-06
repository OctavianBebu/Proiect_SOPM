import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Form from "./Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomModal({ title, children, onClose }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = () => {
    // Închide modalul la submit
    handleClose();

    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add a new task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {React.cloneElement(children, { onSubmit: handleFormSubmit })}
        </Box>
      </Modal>
    </div>
  );
}

export default CustomModal;
