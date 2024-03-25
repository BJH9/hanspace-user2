import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";

// @mui
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
  ToggleButton,
  TextField,
  Typography,
  FormGroup,
} from "@mui/material";
import axios from "axios";

import UploadImg from "src/components/FileUpload/UploadImg";

export default function CreateRoomModal({ site, tag }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: 600,
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setCreateData({
      ...createData,
      [e.target.name]: selectedImage,
    });
  };

  const handleImgChange = (e) => {
    setCreateData({
      ...createData,
      [image]: imageUrl,
    });
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    // 여기에 이미지 업로드 로직을 작성합니다.
    console.log(image);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checkedOk, setCheckedOk] = useState(true);
  const [checkedNo, setCheckedNo] = useState(false);

  const handleChangeOk = () => {
    setCheckedNo(false);
    setCheckedOk(true);
    setCreateData({
      ...createData,
      available: true,
    });
  };

  const handleChangeNo = (event) => {
    setCheckedOk(false);
    setCheckedNo(true);
    setCreateData({
      ...createData,
      available: false,
    });
  };

  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const [tagList, setTagList] = useState([
    { tagName: "스터디", isSelected: false },
    { tagName: "MT", isSelected: false },
    { tagName: "대형 강의실", isSelected: false },
  ]);

  const inItCreateData = {
    siteId: "",
    roomName: "",
    capacity: "",
    description: "",
    startTime: 1,
    endTime: 1,
    available: true,
    img: "",
    tag1: 0,
    tag2: 0,
    tag3: 0,
  };

  // 태그 체크 상태 관리
  const [buttonStates, setButtonStates] = useState({});

  // const handleTagClick = (id) => {
  //   setButtonStates((prevStates) => ({
  //     ...prevStates,
  //     [id]: !prevStates[id],
  //   }));

  //   const tagName = tagList[id];
  //   if (buttonStates[id]) {
  //     setCreateData((prevData) => {
  //       const isDuplicate = prevData.tag.some((tag) => tag.tagName === tagName);

  //       if (isDuplicate) {
  //         return prevData;
  //       }

  //       return {
  //         ...prevData,
  //         tag: [...prevData.tag, { tagName }],
  //       };
  //     });
  //   }
  // };

  const handleTagClick = (index) => {
    const updatedTagList = [...tagList];
    updatedTagList[index].isSelected = !updatedTagList[index].isSelected;
    setTagList(updatedTagList);
  };

  // const handleSubmit = () => {
  //   handleClose();
  //   console.log(createData);
  // };

  const handleSubmit = async () => {
    if (site) {
      const updatedCreateData = {
        ...createData, // createData 객체를 복사
        siteId: site.id, // site.id를 추가
      };
      setCreateData(updatedCreateData); // 업데이트된 객체를 setCreateData 함수에 전달
      console.log("createData", updatedCreateData);
      const response = await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/room/create`,
          JSON.stringify(updatedCreateData),
          {
            method: "POST",
            headers: {
              // Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));
      handleClose();
      window.location.reload();
    }
  };

  // const handleTagClick = (id) => {
  //   setCreateData((prevData) => {
  //     const tagName = tagList[id];
  //     const isDuplicate = prevData.tag.some((tag) => tag.tagName === tagName);
  //     const isSelected = !prevData.buttonStates[id];

  //     if (!isSelected || isDuplicate) {
  //       return prevData;
  //     }

  //     const updatedButtonStates = {
  //       ...prevData.buttonStates,
  //       [id]: isSelected,
  //     };
  //     const updatedTagList = [...prevData.tag, { tagName }];
  //     return {
  //       ...prevData,
  //       buttonStates: updatedButtonStates,
  //       tag: updatedTagList,
  //     };
  //   });
  // };

  // if (buttonStates[id]) {
  //   const tagName = tagList[id];
  //   setCreateData((prevData) => ({
  //     ...prevData,
  //     tag: [...prevData.tag, { tagName }],
  //   }));
  // }

  // setCreateData((prevData) => {
  //   const isDuplicate = prevData.tag.some((tag) => tag.tagName === tagName);

  //   if (isDuplicate) {
  //     return prevData;
  //   }

  //   return {
  //     ...prevData,
  //     tag: [...prevData.tag, { tagName }],
  //   };
  // });

  const handleStartTimeChange = (event) => {
    setSTime(event.target.value);
    setCreateData({
      ...createData,
      startTime: event.target.value,
    });
  };

  const handleEndTimeChange = (event) => {
    setETime(event.target.value);
    setCreateData({
      ...createData,
      endTime: event.target.value,
    });
  };

  const handleTagOneChange = (event) => {
    setTagOne(event.target.value);
    setCreateData({
      ...createData,
      tag1: event.target.value,
    });
    setErrorOne(
      (tagTwo !== 0 && event.target.value === tagTwo) ||
        (tagThree !== 0 && event.target.value === tagThree)
    );
  };

  const handleTagTwoChange = (event) => {
    setTagTwo(event.target.value);
    setCreateData({
      ...createData,
      tag2: event.target.value,
    });
    setErrorTwo(
      (tagOne !== 0 && event.target.value === tagOne) ||
        (tagThree !== 0 && event.target.value === tagThree)
    );
  };

  const handleTagThreeChange = (event) => {
    setTagThree(event.target.value);
    setCreateData({
      ...createData,
      tag3: event.target.value,
    });
    setErrorThree(
      (tagOne !== 0 && event.target.value === tagOne) ||
        (tagTwo !== 0 && event.target.value === tagTwo)
    );
  };

  const [createData, setCreateData] = useState(inItCreateData);
  const [sTime, setSTime] = useState("00:00");
  const [eTime, setETime] = useState("00:00");

  const [tagOne, setTagOne] = useState(0);
  const [tagTwo, setTagTwo] = useState(0);
  const [tagThree, setTagThree] = useState(0);

  const [errorOne, setErrorOne] = useState(false);
  const [errorTwo, setErrorTwo] = useState(false);
  const [errorThree, setErrorThree] = useState(false);

  const [avail, setAvail] = useState(true);

  const handleChange = (e) => {
    setCreateData({
      ...createData,
      [e.target.name]: e.target.value,
    });
    // console.log(createData);
  };

  const handleAvailChange = (event) => {
    setAvail(event.target.checked);
    setCreateData({
      ...createData,
      available: event.target.checked,
    });
  };

  const [imageUrl, setImageUrl] = useState(null);

  const [file, setFile] = useState(null);

  return (
    <>
      <Box style={{ textAlign: "right" }}>
        <Button variant="outlined" onClick={handleOpen}>
          공간 추가하기
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            공간 추가하기
          </Typography>
          <Box style={{ marginTop: "20px" }}>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="장소명"
                variant="outlined"
                name="roomName"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="수용인원"
                variant="outlined"
                name="capacity"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="추가 설명"
                variant="outlined"
                name="description"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                />
              </MuiPickersUtilsProvider> */}
            </Box>
            <Box style={{ display: "flex" }}>
              <Box style={{ marginRight: "10px" }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    start time
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sTime}
                    label="startTime"
                    name="startTime"
                    onChange={handleStartTimeChange}
                  >
                    <MenuItem value={0}>00:00</MenuItem>
                    <MenuItem value={60}>01:00</MenuItem>
                    <MenuItem value={120}>02:00</MenuItem>
                    <MenuItem value={180}>03:00</MenuItem>
                    <MenuItem value={240}>04:00</MenuItem>
                    <MenuItem value={300}>05:00</MenuItem>
                    <MenuItem value={360}>06:00</MenuItem>
                    <MenuItem value={420}>07:00</MenuItem>
                    <MenuItem value={480}>08:00</MenuItem>
                    <MenuItem value={540}>09:00</MenuItem>
                    <MenuItem value={600}>10:00</MenuItem>
                    <MenuItem value={660}>11:00</MenuItem>
                    <MenuItem value={720}>12:00</MenuItem>
                    <MenuItem value={780}>13:00</MenuItem>
                    <MenuItem value={840}>14:00</MenuItem>
                    <MenuItem value={900}>15:00</MenuItem>
                    <MenuItem value={960}>16:00</MenuItem>
                    <MenuItem value={1020}>17:00</MenuItem>
                    <MenuItem value={1080}>18:00</MenuItem>
                    <MenuItem value={1140}>19:00</MenuItem>
                    <MenuItem value={1200}>20:00</MenuItem>
                    <MenuItem value={1260}>21:00</MenuItem>
                    <MenuItem value={1320}>22:00</MenuItem>
                    <MenuItem value={1380}>23:00</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    end time
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={eTime}
                    label="endTime"
                    name="endTime"
                    onChange={handleEndTimeChange}
                  >
                    <MenuItem value={0}>00:00</MenuItem>
                    <MenuItem value={60}>01:00</MenuItem>
                    <MenuItem value={120}>02:00</MenuItem>
                    <MenuItem value={180}>03:00</MenuItem>
                    <MenuItem value={240}>04:00</MenuItem>
                    <MenuItem value={300}>05:00</MenuItem>
                    <MenuItem value={360}>06:00</MenuItem>
                    <MenuItem value={420}>07:00</MenuItem>
                    <MenuItem value={480}>08:00</MenuItem>
                    <MenuItem value={540}>09:00</MenuItem>
                    <MenuItem value={600}>10:00</MenuItem>
                    <MenuItem value={660}>11:00</MenuItem>
                    <MenuItem value={720}>12:00</MenuItem>
                    <MenuItem value={780}>13:00</MenuItem>
                    <MenuItem value={840}>14:00</MenuItem>
                    <MenuItem value={900}>15:00</MenuItem>
                    <MenuItem value={960}>16:00</MenuItem>
                    <MenuItem value={1020}>17:00</MenuItem>
                    <MenuItem value={1080}>18:00</MenuItem>
                    <MenuItem value={1140}>19:00</MenuItem>
                    <MenuItem value={1200}>20:00</MenuItem>
                    <MenuItem value={1260}>21:00</MenuItem>
                    <MenuItem value={1320}>22:00</MenuItem>
                    <MenuItem value={1380}>23:00</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Typography>사용가능 여부</Typography>
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
                      label="사용 허가"
                      name="available"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedNo}
                          onChange={handleChangeNo}
                        />
                      }
                      label="사용 금지"
                      name="available"
                    />
                  </Box>
                </FormGroup>
              </FormControl>
            </Box>
            <Box>
              {/* <form onSubmit={handleImageSubmit}>
                <input
                  type="file"
                  accept="image/*"
                  // onChange={handleImageChange}
                  name="img"
                />
              </form> */}
              <UploadImg
                file={file}
                setFile={setFile}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                // createData={createData}
                setCreateData={setCreateData}
              />
            </Box>
            <Box style={{ marginTop: "30px" }}>
              {/* <Typography>태그</Typography> */}

              <FormControl>
                <InputLabel id="demo-simple-select-label">tag1</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tagOne}
                  label="tag1"
                  name="tag1"
                  onChange={handleTagOneChange}
                  style={{ width: "100px" }}
                >
                  <MenuItem value={0}>0</MenuItem>
                  {tag
                    ? tag.map((t, i) => {
                        return <MenuItem value={t.tagId}>{t.tagName}</MenuItem>;
                      })
                    : null}
                </Select>
              </FormControl>
              {errorOne && <p style={{ color: "red" }}>중복된 태그입니다.</p>}
            </Box>
            <Box style={{ marginTop: "15px" }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">tag2</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tagTwo}
                  label="tag2"
                  name="tag2"
                  onChange={handleTagTwoChange}
                  style={{ width: "100px" }}
                >
                  <MenuItem value={0}>0</MenuItem>
                  {tag
                    ? tag.map((t, i) => {
                        return <MenuItem value={t.tagId}>{t.tagName}</MenuItem>;
                      })
                    : null}
                </Select>
              </FormControl>
              {errorTwo && <p style={{ color: "red" }}>중복된 태그입니다.</p>}
            </Box>
            <Box style={{ marginTop: "15px" }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">tag3</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tagThree}
                  label="tag3"
                  name="tag3"
                  onChange={handleTagThreeChange}
                  style={{ width: "100px" }}
                >
                  <MenuItem value={0}>0</MenuItem>
                  {tag
                    ? tag.map((t, i) => {
                        return <MenuItem value={t.tagId}>{t.tagName}</MenuItem>;
                      })
                    : null}
                </Select>
              </FormControl>
              {errorThree && <p style={{ color: "red" }}>중복된 태그입니다.</p>}
            </Box>

            <Box style={{ textAlign: "center", marginTop: "15px" }}>
              <Button
                type="submit"
                className="canclebtn"
                variant="outlined"
                color="error"
                onClick={() => {
                  handleClose();
                }}
              >
                취소
              </Button>
              {errorOne || errorTwo || errorThree ? null : (
                <Button
                  className="createbtn"
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  저장
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
