import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function ReusableDialog({
  isOpen,
  handleClose,
  title,
  children,
  onSubmit,
  button,
}) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          {title}
        </DialogTitle>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          onSubmit={onSubmit}
        >
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Hủy
            </Button>
            {button}
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default ReusableDialog;
