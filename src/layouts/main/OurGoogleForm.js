import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import { getUserByEmail } from 'src/api/GoogleUser';

const OurGoogleForm = ({
  open,
  setOpen,
  email,
  setEmail,
  name,
  setName,
  site,
  user,
  setUser,
  setSiteUser,
  setLogin,
  login,
}) => {
  const request = {
    email: email,
    name: name,
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    // console.log('이름:', name);
    // console.log('이메일:', email);
    await getUserByEmail(request).then(function (data) {
      setUser(data);
      setLogin(true);
      sessionStorage.setItem('user', JSON.stringify(data));
    });

    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>이름과 이메일 입력하기</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="이름"
          type="text"
          value={name}
          onChange={handleNameChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="이메일"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={handleSubmit} color="primary">
          제출
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OurGoogleForm;
