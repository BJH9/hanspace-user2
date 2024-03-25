import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const OurLoginForm = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    console.log("이름:", name);
    console.log("이메일:", email);

    onClose();
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

export default FormDialog;
