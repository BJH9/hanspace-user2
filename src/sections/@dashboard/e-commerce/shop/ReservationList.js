import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ReservationList(props) {
  const now = new Date();
  const [product, setProduct] = useState([
    {
      // img: { room },
      name: "NTH313",
      application: "3월 28일",
      reservation: "7월 3일",
      reservation2: "2023-03-28",
      time: "7시~9시",
      waiting: "대기",
    },
    {
      // img: { room },
      name: "NTH217",
      application: "3월 29일",
      reservation: "7월 3일",
      reservation2: "2023-03-29",
      time: "7시~9시",
      waiting: "대기",
    },
    {
      // img: { room },
      name: "NTH404",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-01",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH109",
      application: "7월 1일",
      reservation: "7월 3일",
      reservation2: "2023-07-01",
      time: "7시~9시",
      waiting: "대기",
    },
    {
      // img: { room },
      name: "NTH219",
      application: "5월 17일",
      reservation: "7월 3일",
      reservation2: "2023-05-17",
      time: "7시~9시",
      waiting: "거절",
    },
    {
      // img: { room },
      name: "NTH404",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-01",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH107",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-01",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH106",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-03-12",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH306",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-03-05",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH102",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-02-29",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-02-28",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-09-28",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-05-01",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-09",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      // img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-07",
      time: "7시~9시",
      waiting: "승인",
    },
  ]);
  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: "30px", maxHeight: "400px", overflowY: "auto" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell align="right">신청 날짜</TableCell>
            <TableCell align="right">예약 날짜&nbsp;</TableCell>
            <TableCell align="right">예약 시간&nbsp;</TableCell>
            <TableCell align="right">상태&nbsp;</TableCell>
            <TableCell align="right">마감&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((p) => {
            let date1 = new Date(p.reservation2);
            return (
              <TableRow
                key={p.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {p.name}
                </TableCell>
                <TableCell align="right">{p.application}</TableCell>
                <TableCell align="right">{p.reservation}</TableCell>
                <TableCell align="right">{p.time}</TableCell>
                <TableCell align="right">{p.waiting}</TableCell>
                {now > date1 ? (
                  <TableCell align="right">마감전</TableCell>
                ) : (
                  <TableCell align="right">마감후</TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
