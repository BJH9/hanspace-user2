import { forwardRef, useState } from 'react';
// @mui
import {
  Slide,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function TransitionsDialogs({ openDialog, handleDialogClose, logout }) {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const startLogout = () => {
    logout();
    handleDialogClose();
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">로그아웃 하시겠습니까?</DialogTitle>

        <DialogActions>
          <Button color="inherit" onClick={handleDialogClose}>
            취소
          </Button>

          <Button variant="contained" onClick={startLogout}>
            로그아웃
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
