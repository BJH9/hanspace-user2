import React, { useState, useEffect } from "react";
import roomImg from "../../assets/img/뉴턴220호.jpg";
// @mui
import { Box, Grid } from "@mui/material";
import Room from "./Room";
import axios from "axios";

export default function RoomList({ room, tags }) {
  // useEffect(() => {
  //   const fetchGetRooms = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_SERVER_URL}/api/room/find-rooms`,
  //         {
  //           params: {
  //             siteId: 1,
  //             // `${siteId}`
  //           },
  //         }
  //       );
  //       setRoom(response.data);
  //       console.log("공간 전체 리스트 불러오기", room);
  //     } catch (err) {
  //       console.log("공간 전체 리스트 불러오기 에러");
  //     }
  //   };
  //   fetchGetRooms();
  // }, []);

  // const [room, setRoom] = useState([
  // {
  //   img: { roomImg },
  //   name: "NTH313",
  //   capacity: 20,
  //   startTime: "08:00",
  //   endTime: "22:00",
  //   description: "프로젝터, 화이트보드 보유 / 깨끗하게 사용 요망",
  //   available: false,
  //   reserveCnt: 3,
  //   tag: [{ tagName: "스터디" }],
  // },
  // {
  //   img: { roomImg },
  //   name: "NTH209",
  //   capacity: 80,
  //   startTime: "08:00",
  //   endTime: "22:00",
  //   description: "대형 강의실",
  //   available: true,
  //   reserveCnt: 2,
  //   tag: [{ tagName: "스터디" }, { tagName: "MT" }],
  // },
  // {
  //   img: { roomImg },
  //   name: "NTH212",
  //   capacity: 20,
  //   startTime: "08:00",
  //   endTime: "22:00",
  //   description: "다용도 강의실",
  //   available: true,
  //   reserveCnt: 42,
  //   tag: [
  //     { tagName: "MT" },
  //     { tagName: "대형 강의실" },
  //     { tagName: "노래" },
  //     { tagName: "춤" },
  //   ],
  // },
  // {
  //   img: { roomImg },
  //   name: "NTH201",
  //   capacity: 5,
  //   startTime: "08:00",
  //   endTime: "22:00",
  //   description: "소그룹 스터디에 용이한 강의실",
  //   available: false,
  //   reserveCnt: 57,
  //   tag: [{ tagName: "노래" }, { tagName: "춤" }],
  // },
  // {
  //   img: { roomImg },
  //   name: "NTH107",
  //   capacity: 40,
  //   startTime: "12:00",
  //   endTime: "21:00",
  //   description: "중형 강의실",
  //   available: false,
  //   reserveCnt: 31,
  //   tag: [{ tagName: "스터디" }, { tagName: "MT" }, { tagName: "춤" }],
  // },
  // {
  //   img: { roomImg },
  //   name: "NTH314",
  //   capacity: 20,
  //   startTime: "08:00",
  //   endTime: "22:00",
  //   description: "중형 강의실",
  //   available: true,
  //   reserveCnt: 71,
  //   tag: [],
  // },
  // {
  //   img: { roomImg },
  //   name: "NTH405",
  //   capacity: 20,
  //   startTime: "08:00",
  //   endTime: "22:00",
  //   description: "다용도 공간",
  //   available: true,
  //   reserveCnt: 42,
  //   tag: [],
  // },
  // ]);

  return (
    <>
      <Box>
        <Box
          gap={3}
          display="grid"
          // gridTemplateColumns={{
          //   xs: "repeat(1, 1fr)",
          //   sm: "repeat(2, 1fr)",
          //   md: "repeat(3, 1fr)",
          //   lg: "repeat(4, 1fr)",
          // }}
        >
          <Grid container spacing={10}>
            {room
              ? room.map((r, i) => {
                  const startHour = r.startTime / 60;
                  const startMin = r.startTime % 60;
                  const start = startHour + "시 " + startMin + "분";

                  const endHour = r.endTime / 60;
                  const endMin = r.endTime % 60;
                  const end = endHour + "시 " + endMin + "분";

                  return (
                    <Grid item xs={12} sm={6} lg={4}>
                      <Room
                        roomId={r.roomId}
                        img={r.image}
                        name={r.roomName}
                        capacity={r.capacity}
                        startTime={r.startTime}
                        endTime={r.endTime}
                        start={start}
                        end={end}
                        tags={tags}
                        description={r.description}
                        available={r.available}
                        reserveCnt={r.reserveCnt}
                      />
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
