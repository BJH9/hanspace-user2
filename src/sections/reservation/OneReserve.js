import React, { useState, useEffect } from "react";
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

import OneData from "./OneData";
import { useDispatchasuseAppDispatch } from "react-redux";

export default function OneReserve({ siteUser, site }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState();
  const [del, setDel] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("onereserve not site");
    if (site) {
      console.log("onereserve site");
    }
  }, []);

  const confirmDelete = async () => {
    console.log("index: ", index);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/reserve/delete`,
        {
          params: {
            reservationId: `${index}`,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setDel(response.data);
      console.log("일회대여 삭제", del);
      window.location.reload();
      handleClose();
    } catch (err) {
      console.log("일회대여 삭제 에러");
    }
  };

  return (
    <>
      <Container sx={{ my: 10 }}>
        <Card>
          <CardHeader title="일회 대여 현황" sx={{ mb: 2 }} />
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mb: "1rem",
              mr: "2rem",
            }}
          >
            <Button
              variant={"contained"}
              color={"primary"}
              //   onClick={() => handleApprove()}
              sx={{ mr: "0.6rem" }}
            >
              선택 승인
            </Button>
            <Button
              variant={"contained"}
              color={"warning"}
              //   onClick={() => handleCancelApprove()}
            >
              선택 승인 취소
            </Button>
            <Button
              variant={"contained"}
              color={"error"}
              //   onClick={() => handleReject()}
              sx={{ ml: "0.6rem" }}
            >
              선택 거절
            </Button>
            <Box sx={{ marginLeft: "8px" }}>
              <Button
                variant={"contained"}
                color={"error"}
                // onClick={() => handleDelete()}
              >
                선택 삭제
              </Button>
            </Box>
          </Box> */}
          <Box sx={{ height: 720 }}>
            <OneData
              setOpen={setOpen}
              setIndex={setIndex}
              site={site}
              siteUser={siteUser}
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
