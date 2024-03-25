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

import DetailData from "./DetailData";

// const data = [
//   {
//     id: 1,
//     place: "NTH220",
//     //사용날짜
//     useDate: "2023-03-22",
//     //신청날짜
//     applyDate: "2023-03-11",
//     //사용시간
//     time: "07:30 ~ 10:30",
//     //신청인
//     applicant: "이인혁",
//     // 목적
//     purpose: "캡스톤 미팅",
//     //승인여부
//     status: "대기",
//   },
//   {
//     id: 2,
//     place: "NTH219",
//     //사용날짜
//     useDate: "2023-03-23",
//     //신청날짜
//     applyDate: "2023-03-12",
//     //사용시간
//     time: "08:00 ~ 10:00",
//     //신청인
//     applicant: "방제형",
//     // 목적
//     purpose: "미팅",
//     //승인여부
//     status: "허가",
//   },
//   {
//     id: 3,
//     place: "NTH218",
//     //사용날짜
//     useDate: "2023-03-24",
//     //신청날짜
//     applyDate: "2023-03-08",
//     //사용시간
//     time: "11:00 ~ 13:00",
//     //신청인
//     applicant: "홍성헌",
//     // 목적
//     purpose: "미팅",
//     //승인여부
//     status: "거절",
//   },
// ];

export default function DetailReserve({ regularId }) {
  const [del, setDel] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState();
  const [flag, setFlag] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (del.length != 0) {
      setOpen(true);
    }
    // console.log(del);
  };
  //   const handleApprove = () => {
  //     if (del.length != 0) setFlag(!flag);
  //   };

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
      console.log("개별 대여 삭제", del);
      window.location.reload();
      handleClose();
    } catch (err) {
      console.log("개별 대여 삭제 에러");
    }
  };

  return (
    <>
      <Container sx={{ my: 10 }}>
        <Card>
          <CardHeader title="정기 대여 개별내역 현황" sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mb: "1rem",
              mr: "2rem",
            }}
          >
            <Box sx={{ marginLeft: "8px" }}>
              <Button
                variant={"contained"}
                color={"error"}
                onClick={() => handleDelete()}
              >
                선택 취소
              </Button>
            </Box>
          </Box>
          <Box sx={{ height: 720 }}>
            <DetailData
              //   data={data}
              setDel={setDel}
              setOpen={setOpen}
              setIndex={setIndex}
              flag={flag}
              del={del}
              regularId={regularId}
            />
          </Box>
        </Card>
      </Container>

      {/* 선택 삭제 */}
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
