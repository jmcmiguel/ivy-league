import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import ControlledSelect from "../components/ControlledSelect";
import ControlledTextField from "../components/ControlledTextField";
import { Grid } from "@material-ui/core";

const QuestionAdderDialog = ({ open, setOpen, handleAdd }) => {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = formData => {
    handleAdd(formData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">Add Questions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a set of questions please specify what type of questions
            you would like
          </DialogContentText>

          <Grid container spacing={2}>
            {/* Question Type */}
            <Grid item xs={12}>
              <ControlledSelect
                variant="standard"
                error={errors}
                control={control}
                name="type"
                label="Question Type"
                required={true}
                menu={[
                  { value: "multichoice", label: "Multiple Choice" },
                  { value: "trueorfalse", label: "True or False" },
                  { value: "identification", label: "Identification" },
                  { value: "essaytype", label: "Essay Type" },
                ]}
              />
            </Grid>

            {/* Number of items */}
            <Grid item xs={12}>
              <ControlledTextField
                variant="standard"
                name="noitems"
                label="Number of items"
                type="number"
                error={errors}
                control={control}
                required={true}
              />
            </Grid>

            {/* Points per items */}
            <Grid item xs={12}>
              <ControlledTextField
                variant="standard"
                name="points"
                label="Points per item"
                type="number"
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default QuestionAdderDialog;
