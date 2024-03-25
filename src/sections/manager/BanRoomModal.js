import React, { useState, useEffect } from "react";
import axios from "axios";
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { AirlineSeatLegroomNormalSharp } from "@mui/icons-material";

import BanRoom from "./Banroom";

export default function BanRoomModal({ room }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: 400,
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [room, setRoom] = useState([
  //   { name: "NTH313", restriction: false },
  //   { name: "NTH312", restriction: true },
  //   { name: "NTH311", restriction: false },
  //   { name: "NTH203", restriction: true },
  //   { name: "NTH205", restriction: false },
  //   { name: "NTH306", restriction: false },
  //   { name: "NTH201", restriction: true },
  //   { name: "NTH202", restriction: false },
  //   { name: "NTH104", restriction: true },
  //   { name: "NTH106", restriction: false },
  //   { name: "NTH209", restriction: false },
  //   { name: "NTH210", restriction: true },
  // ]);

  const [rooms, setRooms] = useState(room);

  const [checked, setChecked] = React.useState([1]);
  const [checkedOk, setCheckedOk] = useState(true);

  const [idList, setIdList] = useState([]);

  const [del, setDel] = useState([{}]);

  let first = 0;

  // useEffect(() => {
  //   first++;
  //   const addItem = () => {
  // setIdList((prevState) => ({
  //   roomId: [...prevState.roomId, del.roomId],
  //   checked: [...prevState.checked, del.checked],
  // }));
  //   };

  //   if (first != 0) {
  //     addItem();
  //   }

  //   console.log("idList", idList);
  // }, [del]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChangeOk = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = async () => {
    console.log("del", del);
    const response = await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/room/update-avails`,
        JSON.stringify(del),
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
  };

  return (
    <>
      <Box style={{ textAlign: "right" }}>
        <Button variant="outlined" onClick={handleOpen}>
          이용금지 관리
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ marginBottom: "25px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            이용금지 관리
          </Typography>
          <Box>
            <FormControl component="fieldset" style={{ width: "100%" }}>
              <FormGroup>
                <Grid container spacing={1} style={{ marginBottom: "15px" }}>
                  <Grid item xs={6} style={{ textAlign: "center" }}>
                    이름
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: "center" }}>
                    이용가능
                  </Grid>
                </Grid>
                {room
                  ? room.map((r, i) => {
                      return (
                        <>
                          <Grid
                            container
                            spacing={1}
                            style={{
                              borderBottom: "0.1px solid gray",
                              marginBottom: "15px",
                            }}
                          >
                            <BanRoom
                              roomId={r.roomId}
                              name={r.roomName}
                              available={r.available}
                              setDel={setDel}
                              del={del}
                            />
                          </Grid>
                        </>
                      );
                    })
                  : null}
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <Button onClick={handleSubmit}>완료</Button>
            <Button>취소</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
