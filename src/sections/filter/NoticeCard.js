import React, { useEffect, useState } from "react";
// import parse from 'html-react-parser';
import {
  Box,
  Card,
  Chip,
  Divider,
  Typography,
  Grid,
  Modal,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fDate, fDateTime, fTimestamp } from "../../utils/formatTime";
import { LoadingButton, Masonry } from "@mui/lab";
import RoomAvailableTime from "../about/RoomAvailableTime";

// color
const colors = ["#fff3aa", "#ffd0a8", "#ffb1b1", "#d9d1ff", "#b7efff"];

function NoticeCard({
  reserveOne,
  setSelectedRoom,
  room,
  login,
  site,
  reservedTimeList,
  reserveStartDate,
  reserveEndDate,
  setOpenForm,
  setReserveTime,
  scrollToRef,
  info,
  availCnt,
  s,
  e,
  availableCnt,
  weekdays,
  reservable,
  setReservable,
  siteUser,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(true);
  const [rendered, setRendered] = useState(false);
  const [next, setNext] = useState(false);
  const [dayNames, setDayNames] = useState([]);

  useEffect(() => {
    let names = [];
    if (weekdays != null) {
      for (let i = 0; i < weekdays.length; i++) {
        if (weekdays[i] === true) {
          switch (i) {
            case 0:
              names.push("일");
              break;
            case 1:
              names.push("월");
              break;
            case 2:
              names.push("화");
              break;
            case 3:
              names.push("수");
              break;
            case 4:
              names.push("목");
              break;
            case 5:
              names.push("금");
              break;
            case 6:
              names.push("토");
              break;
          }
        }
      }

      setDayNames(names);
    }
  }, [weekdays]);

  useEffect(() => {
    if (rendered && next) {
      setNext(false);
      scrollToRef(info);
    } else {
      setRendered(true);
    }
  }, [open]);
  console.log(reservedTimeList);

  const showDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ textAlign: "center" }}>
        <Box
          sx={{
            position: "relative",
            width: "auto",
            height: "15%",
            backgroundColor: "#232f3e",
          }}
        >
          <Typography sx={{ pt: 2, fontWeight: "bold", color: "white" }}>
            {room.roomName}
          </Typography>
        </Box>
        <Box
          sx={{
            height: 150,
            overflow: "hidden",
            boxShadow:
              "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          }}
          display="grid"
          gridTemplateColumns="repeat(1, 1fr)"
        >
          {openDetail ? (
            <>
              <Box
                component="img"
                sx={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  boxShadow:
                    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                }}
                alt="강의실 사진"
                src={room.img}
                onClick={showDetail}
              />
            </>
          ) : (
            <Box
              variant="subtitle1"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                mt: 4,
                mb: 0.5,
                color: "black",
                minHeight: 150,
              }}
              onClick={showDetail}
            >
              {room.detail}
              <br />
              <br />
              누적 {room.reservedList.length}건의 예약
            </Box>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          sx={{ pt: 2, pb: 2 }}
        >
          <div>
            <Typography
              variant="caption"
              component="div"
              sx={{ mb: 0.75, color: "text.disabled" }}
            >
              예약가능
            </Typography>

            <Typography variant="caption" component="div" sx={{ mb: 0.75 }}>
              {parseInt(availCnt / site.timeUnit) / 2}시간{" "}
              {availCnt % site.timeUnit !== 0 ? `${site.timeUnit}분` : ""}
            </Typography>
          </div>
          <div>
            <Typography
              variant="caption"
              component="div"
              sx={{ mb: 0.75, color: "text.disabled" }}
            >
              최대인원
            </Typography>

            <Typography variant="caption" component="div" sx={{ mb: 0.75 }}>
              {room.capacity}
            </Typography>
          </div>
          <div>
            <Typography
              variant="caption"
              component="div"
              sx={{ mb: 0.75, color: "text.disabled" }}
            >
              시간선택
            </Typography>
            {parseInt(availCnt / site.timeUnit) / 2 <= 3 ? (
              <>
                {" "}
                <Chip
                  variant="outlined"
                  size="small"
                  label="시간선택"
                  color="error"
                  onClick={() => {
                    setOpen(true);
                  }}
                ></Chip>
              </>
            ) : (
              <>
                <Chip
                  variant="outlined"
                  size="small"
                  label="시간선택"
                  color="info"
                  onClick={() => {
                    setOpen(true);
                  }}
                ></Chip>
              </>
            )}
          </div>
        </Box>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>시간 선택</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <RoomAvailableTime
              reserveOne={reserveOne}
              site={site}
              setSelectedRoom={setSelectedRoom}
              handleClose={handleClose}
              room={room}
              login={login}
              reserveStartDate={reserveStartDate}
              reserveEndDate={reserveEndDate}
              setNext={setNext}
              setOpenForm={setOpenForm}
              setOpen={setOpen}
              setReserveTime={setReserveTime}
              reservedTimeList={reservedTimeList}
              availableCnt={availableCnt}
              s={s}
              e={e}
              dayNames={dayNames}
              reservable={reservable}
              setReservable={setReservable}
              siteUser={siteUser}
            ></RoomAvailableTime>
          </DialogContentText>
        </DialogContent>

        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
export default NoticeCard;
