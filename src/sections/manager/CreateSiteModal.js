import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import CreateSiteImg from "src/components/FileUpload/CreateSIteUpload";

// import {
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
// } from "@material-ui/core";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

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

export default function CreateSiteModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checkedOk, setCheckedOk] = useState(false);
  const [checkedNo, setCheckedNo] = useState(true);

  const [imageUrl, setImageUrl] = useState(null);

  const [file, setFile] = useState(null);

  const inItCreateData = {
    siteName: "",
    description: "",
    logo: "",
    link: "",
    company: "",
    maxDate: "",
    maxTime: "",
    timeUnit: "",
    question1: "",
    question2: "",
    restriction: false,
    userId: "",
  };

  const handleChangeOk = (event) => {
    setCheckedOk(event.target.checked);
    if (event.target.checked) {
      setCheckedNo(false);
      setCreateData({
        ...createData,
        [event.target.name]: true,
      });
    }
  };

  const handleChangeNo = (event) => {
    setCheckedNo(event.target.checked);
    if (event.target.checked) {
      setCheckedOk(false);
      setCreateData({
        ...createData,
        [event.target.name]: false,
      });
    }
  };

  const [createData, setCreateData] = useState(inItCreateData);

  const handleChange = (e) => {
    setCreateData({
      ...createData,
      [e.target.name]: e.target.value,
    });
    // console.log(createData);
  };

  const handleSubmit = () => {
    handleClose();
    console.log(createData);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        사이트 만들기
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            사이트 생성하기
          </Typography>
          <Box style={{ marginTop: "20px" }}>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              사이트 이름
            </Typography> */}
              {/* <input
              type="text"
              id="capacity"
              name="capacity"
              placeholder="수용인원을 입력하세요"
              //   onChange={handleChange}
              required
            /> */}
              <TextField
                id="outlined-basic"
                label="사이트 이름"
                variant="outlined"
                name="siteName"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="사이트 설명"
                variant="outlined"
                name="description"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <CreateSiteImg
                file={file}
                setFile={setFile}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                // createData={createData}
                setCreateData={createData}
              />
            </Box>
            <Box>
              <TextField
                id="outlined-basic"
                label="링크"
                variant="outlined"
                name="link"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>

            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="예약 가능 날짜"
                variant="outlined"
                name="maxDate"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              {/* <TextField
                id="outlined-basic"
                label="제약 여부"
                variant="outlined"
                name="restriction"
                style={{ width: "100%" }}
                onChange={handleChange}
              /> */}
              <Typography>제약 여부</Typography>
              <FormControl component="fieldset">
                <FormGroup>
                  <Box style={{ display: "flex" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedOk}
                          onChange={handleChangeOk}
                        />
                      }
                      label="제약 사용"
                      name="restriction"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedNo}
                          onChange={handleChangeNo}
                        />
                      }
                      label="제약 미사용"
                      name="restriction"
                    />
                  </Box>
                </FormGroup>
              </FormControl>
            </Box>
            <Box style={{ textAlign: "center", marginTop: "15px" }}>
              <Button
                type="submit"
                className="canclebtn"
                style={{ height: "2px", color: "red" }}
                onClick={() => {
                  handleClose();
                }}
              >
                취소
              </Button>
              <Button
                className="createbtn"
                type="button"
                style={{ height: "10px", alignContent: "center" }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                저장
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
