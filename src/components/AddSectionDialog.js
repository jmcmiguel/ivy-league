import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddSectionDialog = ({ open, setOpen }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create new section</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new section, please enter the subject, section and amount
          of students
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="subject"
          label="Subject"
          type="text"
          placeholder="ITNW-1X3X"
          fullWidth
        />
        <TextField
          margin="dense"
          id="section"
          label="Section"
          type="text"
          placeholder="NW3G"
          fullWidth
        />
        <TextField
          margin="dense"
          id="studentCount"
          label="Number of Students"
          type="number"
          fullWidth
        />
        <TextField
          margin="dense"
          id="notes"
          label="Notes"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSectionDialog;
