import { m } from "framer-motion";
// @mui
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
// components
import Image from "../../components/image";
import { MotionViewport, varFade } from "../../components/animate";
import { Block } from "../_examples/Block";
import Iconify from "../../components/iconify";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import OurReactHookForm from "../_examples/extra/form/OurReactHookForm";
import { getRemainRegularTime, getRemainTime } from "src/api/reserve";

// ----------------------------------------------------------------------
const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  "& > *": { m: "8px !important" },
};
const style2 = {
  // display: 'flex',
  alignItems: "center",
  justifyContent: "center",
  // flexWrap: 'wrap',
  "& > *": { m: "8px !important" },
  "& svg": { width: 24, height: 24 },
  overflowX: "auto",
  // marginLeft: "30px",
};
const COLORS = [
  "default",
  "inherit",
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
];

export default function RoomAvailableTime({
  reserveOne,
  site,
  setSelectedRoom,
  handleClose,
  room,
  login,
  reserveStartDate,
  reserveEndDate,
  setOpenForm,
  setOpen,
  setReserveTime,
  setNext,
  s,
  e,
  reservedTimeList,
  availableCnt,
  dayNames,
  // reservable,
  // setReservable,
  siteUser,
}) {
  const [formats, setFormats] = useState([]);
  const [newFormatContent, setNewFormatContent] = useState();
  const [reservable, setReservable] = useState();

  const content = [];

  const makeTimelist = () => {
    let timeformat = [];
    let i = 0;
    while (i < reserveTime.length) {
      let hr = parseInt(reserveTime[i] / 60);
      let nextHr = parseInt(reserveTime[i + 1] / 60);

      let min = reserveTime[i] % 60;
      let nextMin = reserveTime[i + 1] % 60;
      if (min == 0) {
        min = min + "0";
      }
      if (nextMin == 0) {
        nextMin = nextMin + "0";
      }

      let text = `${hr}:${min} ~ ${nextHr}:${nextMin} `;

      i = i + 2;
      timeformat.push(text);
    }

    setReserveTime(timeformat);
  };
  const makeTime = () => {
    const iter = (e - s) / site.timeUnit;

    let count;
    for (count = 0; count < iter; count++) {
      const times = s + count * site.timeUnit;
      content.push(times);

      console.log("content : " + content);
    }

    makeTimetable();
  };
  const makeTimetable = () => {
    console.log("reservedTimeList");
    console.log(reservedTimeList);
    setNewFormatContent(
      content.map((pTime) => {
        let flag = 0;

        reservedTimeList.map((reserved) => {
          const startDate = new Date(reserveStartDate);
          const endDate = new Date(reserveEndDate);
          const savedDate = room.reservedList.map((res) => res.startDate);

          const dateArray = [];
          console.log("startDate");
          console.log(startDate);
          console.log("endDate");
          console.log(endDate);
          if (!reserveOne) {
            for (
              let date = startDate;
              date <= endDate;
              date.setDate(date.getDate() + 1)
            ) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const dateString = `${year}-${month}-${day}`;
              console.log("dateString");
              dateArray.push(dateString);
            }

            const isExist = savedDate.some((dateString) =>
              dateArray.includes(dateString)
            );

            if (isExist) {
              if (reserved == pTime) {
                flag = 1;
              }
            }
          } else {
            let date = startDate;
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const dateString = `${year}-${month}-${day}`;
            dateArray.push(dateString);

            const isExist = savedDate.some((dateString) =>
              dateArray.includes(dateString)
            );

            if (isExist) {
              if (reserved == pTime) {
                flag = 1;
              }
            }
          }
        });

        let h = parseInt(pTime / 60);
        let m = pTime % 60;
        let nextH = parseInt((pTime + site.timeUnit) / 60);
        let nextM = (pTime + site.timeUnit) % 60;
        if (m == 0) {
          m = m + "0";
        }
        if (nextM == 0) {
          nextM = nextM + "0";
        }
        if (flag == 1) {
          return (
            <ToggleButton disabled key={pTime} value={pTime}>
              {`${h}:${m} ~ ${nextH}:${nextM}`}
            </ToggleButton>
          );
        } else {
          return (
            <ToggleButton key={pTime} value={pTime}>
              {`${h}:${m} ~ ${nextH}:${nextM}`}
            </ToggleButton>
          );
        }
      })
    );
  };

  const handleFormat = (event, newFormats) => {
    if (siteUser.authority === 3) {
      if (newFormats.length > site.maxTime / site.timeUnit) {
        alert("최대 예약 시간을 사용하셨습니다.");
        return;
      }
    }
    setFormats(newFormats);
  };

  const checkReservable = async () => {
    if (reserveOne) {
      console.log("들옴");
      console.log("site.id");
      console.log(site.id);
      console.log(siteUser.id);
      console.log(reserveStartDate);
      await getRemainTime(site.id, siteUser.id, reserveStartDate).then(
        function (info) {
          console.log("info");
          console.log(info);
          setReservable(info);
        }
      );
    } else {
      console.log("정규 들옴");
      await getRemainRegularTime(
        site.id,
        siteUser.id,
        reserveStartDate,
        reserveEndDate
      ).then(function (info) {
        console.log("info");
        console.log(info);
        setReservable(info);
      });
    }
  };

  useEffect(() => {
    makeTime();
    checkReservable();
  }, []);

  let reserveTime = [];
  const orderDate = () => {
    formats.sort(function (a, b) {
      return a - b;
    });

    let start = formats[0];
    // let end = formats[0] + 1;
    let end = formats[0] + site.timeUnit;
    let i = 0;
    let count = 0;

    while (i != formats.length) {
      if (start + count + site.timeUnit == formats[i + 1]) {
        end = formats[i + 1] + site.timeUnit;
        count = count + site.timeUnit;
        i++;
      } else {
        reserveTime.push(start);
        reserveTime.push(end);
        start = formats[i + 1];
        end = formats[i + 1] + site.timeUnit;
        i++;
        count = 0;
      }
    }
  };

  const moveToNext = () => {
    if (login) {
      if (site.restriction === 1) {
        if (sessionStorage.getItem("usersavedinfo") !== null) {
          if (
            JSON.parse(sessionStorage.getItem("usersavedinfo")).status === 1
          ) {
            alert("승인된 유저만 사용할 수 있습니다");
            return;
          } else {
            if (!reservable) {
              alert("하루 최대 예약시간을 다 사용하셨습니다.");
              return;
            }
            if (formats.length === 0) {
              alert("시간을 선택하셔야 합니다.");
            } else {
              orderDate();
              makeTimelist();

              setNext(true);
              setOpenForm(true);
              setOpen(false);
              setSelectedRoom(room.roomName);
            }
          }
        } else {
          alert("로그인이 필요한 서비스입니다.");
          return;
        }
      } else {
        if (formats.length === 0) {
          alert("시간을 선택하셔야 합니다.");
        } else {
          orderDate();
          makeTimelist();

          setNext(true);
          setOpenForm(true);
          setOpen(false);
          setSelectedRoom(room.roomName);
        }
      }
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  return (
    <Container component={MotionViewport} sx={{ mt: 2 }}>
      <Box
        sx={{
          mb: 2,
          borderRadius: 2,
          position: "relative",
        }}
      >
        <Block title="예약 시간" sx={style2}>
          <ToggleButtonGroup
            sx={{ display: "block !important" }}
            color={"primary"}
            value={formats}
            onChange={handleFormat}
          >
            {newFormatContent}
          </ToggleButtonGroup>
        </Block>
        <Box sx={{ mt: "10px", display: "flex" }}>
          <Button
            sx={{ width: "50%", margin: "4px" }}
            color="secondary"
            variant={"contained"}
            size={"large"}
            onClick={handleClose}
          >
            뒤로가기
          </Button>

          <LoadingButton
            sx={{ width: "50%", margin: "4px" }}
            color="info"
            size="large"
            type="submit"
            variant="contained"
            onClick={moveToNext}
          >
            예약하기
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
