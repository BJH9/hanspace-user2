import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import roomImg from "../../assets/img/뉴턴220호.jpg";

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
  Typography,
  TextField,
  FormGroup,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import cafeImg from "../../assets/img/cafe10.jpeg";
import axios from "axios";
import UpdateImg from "src/components/FileUpload/UpdateImg";

export default function Room(props) {
  const {
    roomId,
    img,
    name,
    capacity,
    startTime,
    endTime,
    start,
    end,
    description,
    available,
    reserveCnt,
    tags,
  } = props;

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

  // useEffect(() => {}, [updateData]);

  const [tag, setTag] = useState([]);

  useEffect(() => {
    const fetchGetRoomTags = async () => {
      // const siteId = site.siteId;
      try {
        // console.log("siteId", { siteId });

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/tag/room-tags`,
          {
            params: {
              roomId: props.roomId,
              // site.Id,
              // { siteId },
              // `${siteId}`
            },
          }
        );
        setTag(response.data);
        console.log("방 태그 리스트 불러오기", response.data);
      } catch (err) {
        console.log("방 태그 리스트 불러오기 에러");
      }
    };
    fetchGetRoomTags();
  }, []);

  const inItUpdateData = {
    roomId: props.roomId,
    roomName: props.name,
    capacity: props.capacity,
    description: props.description,
    startTime: props.startTime,
    endTime: props.endTime,
    available: props.available,
    img: "a",
    tag1: tag[0],
    tag2: tag[1],
    tag3: tag[2],
    // tag: props.tag,
    // tag: props.tag,
  };

  const [updateData, setUpdateData] = useState(inItUpdateData);
  //   console.log(updateData);

  const [isUpdateOpen, setIsUpdateOpen] = useState();

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index === selectedButtonIndex ? -1 : index);
  };

  const handleSubmit = async () => {
    console.log("updateData", updateData);
    const response = await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/room/update-room`,
        JSON.stringify(updateData),
        {
          method: "POST",
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res));
    handleUpdateClose();
    window.location.reload();
  };

  const [tagList, setTagList] = useState([
    { tagName: "스터디", isSelected: true },
    { tagName: "MT", isSelected: false },
    { tagName: "대형 강의실", isSelected: true },
  ]);

  // 태그 체크 상태 관리
  const [buttonDetailStates, setButtonDetailStates] = useState({});

  const [clickPic, setClickPic] = useState(0);

  const handlePic = () => {
    setClickPic(1);
  };

  // const handleTagDetailClick = (id) => {
  //   setButtonDetailStates((prevStates) => ({
  //     ...prevStates,
  //     [id]: !prevStates[id],
  //   }));

  //   const tagName = tagList[id];
  //   setUpdateData((prevData) => ({
  //     ...prevData,
  //     tag: [...prevData.tag, { tagName }],
  //   }));
  // };

  useEffect(() => {
    console.log(tag);
  }, [tag]);

  const handleTagDetailClick = (id) => {
    setButtonDetailStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));

    const tagName = tagList[id];
    if (buttonDetailStates[id]) {
      setUpdateData((prevData) => {
        const isDuplicate = prevData.tag.some((tag) => tag.tagName === tagName);

        if (isDuplicate) {
          return prevData;
        }

        return {
          ...prevData,
          tag: [...prevData.tag, { tagName }],
        };
      });
    }
  };

  const [updateAvail, setUpdateAvail] = useState(props.available);
  const [updateSTime, setUpdateSTime] = useState(props.startTime);
  const [updateETime, setUpdateETime] = useState(props.endTime);
  const [sstartTime, setSstartTime] = useState(updateData.startTime);

  const [image, setImage] = useState(null);

  const handleTagClick = (index) => {
    const updatedTagList = [...tagList];
    updatedTagList[index].isSelected = !updatedTagList[index].isSelected;
    setTagList(updatedTagList);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setUpdateData({
      ...updateData,
      [e.target.name]: selectedImage,
    });
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    // 여기에 이미지 업로드 로직.
    console.log(image);
  };

  const handleAvailChange = (event) => {
    setUpdateAvail(event.target.checked);
    setUpdateData({
      ...updateData,
      available: event.target.checked,
    });
  };

  const handleStartTimeChange = (event) => {
    setUpdateSTime(event.target.value);
    setSstartTime(event.target.value);
    setUpdateData({
      ...updateData,
      startTime: event.target.value,
    });
  };

  const handleEndTimeChange = (event) => {
    setUpdateETime(event.target.value);
    setUpdateData({
      ...updateData,
      endTime: event.target.value,
    });
  };

  const openUpdateModal = () => {
    setIsUpdateOpen(!isUpdateOpen);
    // console.log("update startTime", startTime);
  };

  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
    // console.log(createData);
  };

  // const handleSubmit = () => {
  //   handleUpdateClose();
  //   console.log(updateData);
  // };

  const [ava, setAva] = useState(available);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [checkedOk, setCheckedOk] = useState(available ? true : false);
  const [checkedNo, setCheckedNo] = useState(available ? false : true);

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/room/delete-room`,
        {
          params: {
            roomId: `${roomId}`,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("공간 삭제", roomId);
      window.location.reload();
      handleClose();
    } catch (err) {
      console.log("공간 삭제 에러");
    }
  };

  const handleChangeOk = () => {
    setCheckedNo(false);
    setCheckedOk(true);
    setUpdateData({
      ...updateData,
      available: true,
    });
  };

  const handleChangeNo = () => {
    setCheckedOk(false);
    setCheckedNo(true);
    setUpdateData({
      ...updateData,
      available: false,
    });
  };

  const [updateOpen, setUpdateOpen] = React.useState(false);
  const handleUpdateOpen = () => setUpdateOpen(true);
  const handleUpdateClose = () => setUpdateOpen(false);

  const [imageUrl, setImageUrl] = useState(null);

  const [file, setFile] = useState(null);

  const [tagOne, setTagOne] = useState(0);
  const [tagTwo, setTagTwo] = useState(0);
  const [tagThree, setTagThree] = useState(0);

  const [errorOne, setErrorOne] = useState(false);
  const [errorTwo, setErrorTwo] = useState(false);
  const [errorThree, setErrorThree] = useState(false);

  const handleTagOneChange = (event) => {
    setTagOne(event.target.value);
    setUpdateData({
      ...updateData,
      tag1: event.target.value,
    });
    setErrorOne(
      (tagTwo !== 0 && event.target.value === tagTwo) ||
        (tagThree !== 0 && event.target.value === tagThree)
    );
  };

  const handleTagTwoChange = (event) => {
    setTagTwo(event.target.value);
    setUpdateData({
      ...updateData,
      tag2: event.target.value,
    });
    setErrorTwo(
      (tagOne !== 0 && event.target.value === tagOne) ||
        (tagThree !== 0 && event.target.value === tagThree)
    );
  };

  const handleTagThreeChange = (event) => {
    setTagThree(event.target.value);
    setUpdateData({
      ...updateData,
      tag3: event.target.value,
    });
    setErrorThree(
      (tagOne !== 0 && event.target.value === tagOne) ||
        (tagTwo !== 0 && event.target.value === tagTwo)
    );
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, height: 400 }} onClick={handleUpdateOpen}>
        <CardMedia sx={{ height: 140 }} image={img} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {"대여횟수: " + reserveCnt}
          </Typography>
          {available ? (
            <Typography variant="body2" color="green">
              {"이용 가능"}
            </Typography>
          ) : (
            <Typography variant="body2" color="red">
              {"이용 불가능"}
            </Typography>
          )}
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "15px" }}
          >
            <Typography
              variant="h8"
              sx={{ flex: "1 1 auto" }}
              color="text.secondary"
            >
              수용인원
            </Typography>
            <Typography variant="h7" sx={{ flex: "0 0 auto" }}>
              {capacity}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "15px" }}
          >
            <Typography
              variant="h8"
              sx={{ flex: "1 1 auto" }}
              color="text.secondary"
            >
              이용가능 시간
            </Typography>
            <Typography variant="h7" sx={{ flex: "0 0 auto" }}>
              {start + " ~ " + end}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={updateOpen}
        onClose={handleUpdateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{ maxHeight: "680px", overflowY: "auto", marginTop: "30px" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            공간 수정
          </Typography>
          <Box style={{ marginTop: "20px" }}>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="공간명"
                variant="outlined"
                name="roomName"
                style={{ width: "100%" }}
                value={updateData.roomName}
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
                value={updateData.capacity}
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
                value={updateData.description}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ display: "flex" }}>
              <Box style={{ marginRight: "10px" }}>
                <FormControl>
                  <InputLabel
                    id="demo-simple-select-label"
                    // value={updateData.startTime}
                  >
                    start time
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={updateData.startTime}
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
                    value={updateData.endTime}
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

              {clickPic === 0 ? (
                <>
                  <Button
                    sx={{ marginTop: "5px", marginBottom: "5px" }}
                    variant="contained"
                    color="success"
                    onClick={handlePic}
                  >
                    사진 수정
                  </Button>
                  <img src={img} />
                </>
              ) : (
                <UpdateImg
                  file={file}
                  setFile={setFile}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  // createData={createData}
                  setUpdateData={setUpdateData}
                />
              )}
            </Box>
            <Box style={{ marginTop: "30px" }}>
              {/* <Typography>태그</Typography>
              {tagList
                ? tagList.map((t, i) => {
                    return (
                      <>
                        <ToggleButton
                          key={i}
                          value={t.tagName}
                          style={{ margin: "2px" }}
                          selected={t.isSelected}
                          onChange={() => handleTagClick(i)}
                        >
                          {t.tagName}
                        </ToggleButton>
                      </>
                    );
                  })
                : null} */}
              <FormControl>
                <InputLabel id="demo-simple-select-label">tag1</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updateData.tag1}
                  label="tag1"
                  name="tag1"
                  onChange={handleTagOneChange}
                  style={{ width: "100px" }}
                >
                  <MenuItem value={0}>0</MenuItem>
                  {tags
                    ? tags.map((t, i) => {
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
                  value={updateData.tag2}
                  label="tag2"
                  name="tag2"
                  onChange={handleTagTwoChange}
                  style={{ width: "100px" }}
                >
                  <MenuItem value={0}>0</MenuItem>
                  {tags
                    ? tags.map((t, i) => {
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
                  value={updateData.tag3}
                  label="tag3"
                  name="tag3"
                  onChange={handleTagThreeChange}
                  style={{ width: "100px" }}
                >
                  <MenuItem value={0}>0</MenuItem>
                  {tags
                    ? tags.map((t, i) => {
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
                  handleUpdateClose();
                }}
              >
                취소
              </Button>
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
            </Box>
            <Box
              style={{
                marginTop: "30px",
                textAlign: "center",
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(true)}
              >
                공간 삭제
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {/* 공간 삭제 */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle style={{ textAlign: "center" }}>
          삭제하시겠습니까?
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            주의! 삭제하시면 기록이 완전히 삭제됩니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleClose}>취소</Button>
          <Button color="error" onClick={confirmDelete} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
