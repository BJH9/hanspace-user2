import React, { useState, useEffect } from "react";
import axios from "axios";

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

export default function BanRoom({ roomId, name, available, setDel, del }) {
  const [checked, setChecked] = useState(available ? true : false);
  const [checkedData, setCheckedData] = useState();
  const inItData = { roomId: roomId, available: available };

  const [banData, setBanData] = useState(inItData);

  const handleChange = (e) => {
    setChecked(!checked);
    setCheckedData(!checked);
    if (del.length === 0) {
      setDel({ roomId: 1, available: true });
    } else {
      setDel([...del, { roomId: roomId, available: !checked }]);
    }
  };

  //   console.log("setDel", del);

  //   useEffect(() => {
  //     first++;
  //     const updateBan = async () => {
  //       console.log("banData", banData);
  //       const response = await axios
  //         .post(
  //           `${process.env.REACT_APP_SERVER_URL}/api/room/update-avail`,
  //           JSON.stringify(updateBan),
  //           {
  //             method: "POST",
  //             headers: {
  //               // Accept: "application/json",
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         )
  //         .then((res) => console.log(res));
  //     };
  //     if (first !== 0) {
  //       updateBan();
  //     }
  //   }, [banData]);

  return (
    <>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <Typography style={{ marginTop: "6px" }}>{name}</Typography>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              // onChange={() =>
              //   setRooms((prevRooms) =>
              //     prevRooms.map((prevRoom, j) =>
              //       j === i
              //         ? {
              //             ...prevRoom,
              //             available: !prevRoom.available,
              //           }
              //         : prevRoom
              //     )
              //   )
              // }
              onChange={handleChange}
            />
          }
          name={name}
        />
      </Grid>
    </>
  );
}
