import React from "react";
import {
  Grid,
  Container,
  styled,
  Box,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import NoticeCard from "./NoticeCard";
import OurReactHookForm from "../_examples/extra/form/OurReactHookForm";
import RoomCard from "./NoticeCard";
const Section = styled(Container)({
  marginTop: 0,
  padding: 0,
  borderRadius: 8,
});

function CardGrid({
  setSelectedRoom,
  reserveOne,
  roomList,
  time,
  login,
  people,
  hours,
  reserveStartDate,
  reserveEndDate,
  daysOfWeek,
  openForm,
  setOpenForm,
  setReserveTime,
  scrollToRef,
  info,
  site,
  nameFilter,
  tagFilter,
  reservable,
  setReservable,
  siteUser,
}) {
  const days =
    Math.ceil(
      Math.abs(reserveStartDate.getTime() - reserveEndDate.getTime()) /
        (1000 * 3600 * 24)
    ) + 1;

  function retRoom(room, targetDate, s, e) {
    var unavailable = 0;
    const availableCnt = e - s;
    var temp;
    var reservedTimeList = [];
    console.log(room.reservedList);
    room.reservedList.forEach(function (ele) {
      temp = new Date(ele.startDate);
      if (
        temp.getFullYear() == targetDate.getFullYear() &&
        temp.getMonth() == targetDate.getMonth() &&
        temp.getDate() == targetDate.getDate()
      ) {
        if (ele.startTime < e && ele.startTime >= s) {
          var rep = parseInt((ele.endTime - ele.startTime) / site.timeUnit);
          if ((ele.endTime - ele.startTime) % site.timeUnit !== 0) {
            for (var k = 0; k < rep + 1; k++) {
              console.log(ele.startTime);
              console.log(" + ");
              console.log(k);
              console.log(" * ");
              console.log(site.timeUnit);
              reservedTimeList.push(ele.startTime + k * site.timeUnit);
            }
          } else {
            for (var k = 0; k < rep; k++) {
              console.log(ele.startTime);
              console.log(" + ");
              console.log(k);
              console.log(" * ");
              console.log(site.timeUnit);
              reservedTimeList.push(ele.startTime + k * site.timeUnit);
            }
          }
        }
      }
    });
    console.log(room.roomName + " is available " + availableCnt);
    if (
      availableCnt - site.timeUnit * reservedTimeList.length >= hours &&
      (nameFilter.includes(room.roomName) || room.roomName.includes(nameFilter))
    ) {
      return (
        <RoomCard
          reserveOne={reserveOne}
          setSelectedRoom={setSelectedRoom}
          room={room}
          time={time}
          site={site}
          s={s}
          e={e}
          availCnt={availableCnt - site.timeUnit * reservedTimeList.length}
          availableCnt={availableCnt}
          login={login}
          reservedTimeList={reservedTimeList}
          reserveStartDate={targetDate}
          reserveEndDate={reserveEndDate}
          setOpenForm={setOpenForm}
          setReserveTime={setReserveTime}
          scrollToRef={scrollToRef}
          info={info}
          reservable={reservable}
          setReservable={setReservable}
          siteUser={siteUser}
        ></RoomCard>
      );
    } else return false;
  }
  function retRoomMulti(room, s, e) {
    const availableCnt = e - s;
    var temp;
    var reservedTimeList = [];
    var start = new Date(reserveStartDate);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    const end = new Date(reserveEndDate);
    room.reservedList.forEach(function (ele) {
      temp = new Date(ele.startDate);
      if (start <= temp && temp <= end) {
        if (daysOfWeek[temp.getDay()]) {
          if (ele.startTime < e && ele.startTime >= s) {
            var rep = parseInt((ele.endTime - ele.startTime) / site.timeUnit);
            if ((ele.endTime - ele.startTime) % site.timeUnit !== 0) {
              for (var k = 0; k < rep + 1; k++) {
                var num = ele.startTime + k * site.timeUnit;
                if (reservedTimeList.indexOf(num) === -1)
                  reservedTimeList.push(ele.startTime + k * site.timeUnit);
              }
            } else {
              for (var k = 0; k < rep; k++) {
                var num = ele.startTime + k * site.timeUnit;
                if (reservedTimeList.indexOf(num) === -1)
                  reservedTimeList.push(ele.startTime + k * site.timeUnit);
              }
            }
          }
        }
      }
    });
    console.log("cardGird에서의 예약시간 :" + reservedTimeList);
    if (
      availableCnt - reservedTimeList.length * site.timeUnit >= hours &&
      (nameFilter.includes(room.roomName) || room.roomName.includes(nameFilter))
    ) {
      console.log("multi " + room.roomName + " pass");
      return (
        <RoomCard
          reserveOne={reserveOne}
          setSelectedRoom={setSelectedRoom}
          room={room}
          time={time}
          site={site}
          s={s}
          e={e}
          availCnt={availableCnt - site.timeUnit * reservedTimeList.length}
          availableCnt={availableCnt}
          login={login}
          reservedTimeList={reservedTimeList}
          reserveStartDate={start}
          reserveEndDate={reserveEndDate}
          setOpenForm={setOpenForm}
          setReserveTime={setReserveTime}
          scrollToRef={scrollToRef}
          info={info}
          weekdays={daysOfWeek}
          reservable={reservable}
          setReservable={setReservable}
          siteUser={siteUser}
        ></RoomCard>
      );
    } else {
      console.log("multi " + room.roomName + " failed");
      return false;
    }
  }

  function checkAvaiable(room) {
    if (room.capacity < people) return <></>;
    else if (room.availableEnd <= time[0]) return <></>;
    else if (room.availableStart >= time[1]) return <></>;
    var s = Math.max(time[0], room.availableStart);
    var e = Math.min(time[1], room.availableEnd);
    console.log("room.startDate : " + room.reservedList.startDate);
    return retRoom(room, reserveStartDate, s, e);
  }

  const checkAvaiableMulti = (room) => {
    if (room.capacity < people) return <></>;
    else if (room.availableEnd <= time[0]) return <></>;
    else if (room.availableStart >= time[1]) return <></>;
    var s = Math.max(time[0], room.availableStart);
    var e = Math.min(time[1], room.availableEnd);
    return retRoomMulti(room, s, e);
  };

  return (
    <>
      <Container maxWidth={"lg"}>
        {reserveOne ? (
          <Box
            gap={5}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            }}
            style={{ height: "auto" }}
          >
            {roomList.map((room) => checkAvaiable(room))}
          </Box>
        ) : (
          <Box
            gap={5}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            }}
            style={{ height: "auto" }}
          >
            {roomList.map((room) => checkAvaiableMulti(room))}
          </Box>
        )}
      </Container>
    </>
  );
}
export default CardGrid;
