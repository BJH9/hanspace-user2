import React, { useState } from "react";
import axios from "axios";
// @mui
import {
  Box,
  Container,
  Stack,
  Card,
  CardHeader,
  Typography,
  Link,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import RegularData from "./RegularData";

export default function RegularReserve({ siteUser, site }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState();
  const [del, setDel] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = async () => {
    console.log("index: ", index);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/reserve/delete/regular`,
        {
          params: {
            regularId: `${index}`,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setDel(response.data);
      console.log("정기대여 삭제", del);
      window.location.reload();
      handleClose();
    } catch (err) {
      console.log("정기대여 삭제 에러");
    }
  };

  return (
    <>
      <Container sx={{ my: 10 }}>
        <Card>
          <CardHeader title="정기 대여 현황" sx={{ mb: 2 }} />

          <Box sx={{ height: 720 }}>
            <RegularData
              //   data={data}
              //   setDel={setDel}
              //   setOpen={setOpen}
              //   setIndex={setIndex}
              //   flag={flag}
              //   flag2={flag2}
              //   flag3={flag3}
              //   del={del}
              setOpen={setOpen}
              setIndex={setIndex}
              siteUser={siteUser}
              site={site}
            />
          </Box>
        </Card>
      </Container>
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
