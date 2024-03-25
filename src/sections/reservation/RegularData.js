import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
// mui
import {
  Stack,
  Typography,
  Box,
  Rating,
  LinearProgress,
  IconButton,
  Button,
  MenuItem,
  Menu,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";

// mui
import {
  DataGrid,
  GridToolbar,
  getGridNumericOperators,
} from "@mui/x-data-grid";

import DetailReserve from "./DetailReserve";

// components
import Label from "../../components/label";
import Iconify from "../../components/iconify";

export default function RegularData({ setOpen, setIndex, siteUser, site }) {
  const [isOpenMaxHeight, setOpenMaxHeight] = useState(null);

  const handleMaxHeightClose = (id) => {
    // console.log("아아아: " + id);
    setOpenMaxHeight(null);
  };

  const Options = ["삭제", "더보기", "개별 예약 보기"];

  const [detail, setDetail] = useState(false);

  const [curIndex, setCurIndex] = useState(0);

  const [detailContent, setDetailContent] = useState("");

  const [openMore, setOpenMore] = useState(false);

  const handleClick = (event, row) => {
    setOpenMaxHeight(event.currentTarget);
    setCurIndex(row.id);
    console.log("id:" + row.id);

    // setCurIndex(row.id);
    // if (row.detail == undefined) {
    //   let temp = `신청날짜: ${row.applyDate}`;
    //   setDetailContent(temp);
    // } else {
    //   let temp = row.detail;
    //   temp = temp + `\n신청날짜: ${row.applyDate}`;
    //   setDetailContent(temp);
    // }
  };

  const [regulardata, setRegularData] = useState([]);

  useEffect(() => {
    if (site) {
      const fetchGetRegularReservations = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/reserve/regular-reservations`,
            { params: { savedUserInfoId: siteUser.id } }
          );
          setRegularData(response.data);
          console.log("정기대여 불러오기", regulardata);
        } catch (err) {
          console.log("정기대여 불러오기 에러");
        }
      };
      fetchGetRegularReservations();
    }
  }, []);

  const [detailData, setDetailData] = useState({});

  const fetchGetRegularDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/reserve/regular-detail`,
        { params: { regularId: `${curIndex}` } }
      );
      setDetailData(response.data);
      console.log("정기대여 더보기 불러오기", detailData);
    } catch (err) {
      console.log("정기대여 더보기 불러오기 에러");
    }
  };

  // const data = [
  //   {
  //     id: 1,
  //     place: "NTH220",
  //     //사용날짜
  //     useDate: "2023-05-22",
  //     //신청날짜
  //     applyDate: "2023-03-11",
  //     weekdays: "월, 목",
  //     //사용시간
  //     time: "07:30 ~ 10:30",
  //     //신청인
  //     applicant: "이인혁",
  //     // 목적
  //     purpose: "캡스톤 미팅",
  //     //승인여부
  //     status: "대기",
  //     // 마감여부
  //     deadline: "마감됨",
  //   },
  //   {
  //     id: 2,
  //     place: "NTH219",
  //     //사용날짜
  //     useDate: "2023-03-23",
  //     //신청날짜
  //     applyDate: "2023-03-12",
  //     weekdays: "월, 목",
  //     //사용시간
  //     time: "08:00 ~ 10:00",
  //     //신청인
  //     applicant: "방제형",
  //     // 목적
  //     purpose: "미팅",
  //     //승인여부
  //     status: "허가",
  //     // 마감여부
  //     deadline: "마감되지 않음",
  //   },
  //   {
  //     id: 3,
  //     place: "NTH218",
  //     //사용날짜
  //     useDate: "2023-03-24",
  //     //신청날짜
  //     applyDate: "2023-03-08",
  //     weekdays: "월, 목",
  //     //사용시간
  //     time: "11:00 ~ 13:00",
  //     //신청인
  //     applicant: "홍성헌",
  //     // 목적
  //     purpose: "미팅",
  //     //승인여부
  //     status: "거절",
  //     // 마감여부
  //     deadline: "마감됨",
  //   },
  // ];

  const closeDetail = () => {
    setDetail(false);
  };

  const columns = [
    {
      field: "id",
      hide: true,
    },

    {
      field: "roomName",
      headerName: "장소",
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "startDate",
      type: "dateTime",
      headerName: "시작 날짜",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "endDate",
      type: "dateTime",
      headerName: "끝 날짜",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "weekdays",
      // type: '',
      headerName: "신청 요일",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "reserveTime",
      headerName: "사용 시간",
      headerAlign: "center",
      align: "center",
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: "userName",
      headerName: "신청인",
      headerAlign: "center",
      align: "center",
      flex: 1,
      editable: true,
    },
    {
      field: "user",
      headerName: "유저 이름",
      headerAlign: "center",
      align: "center",
      flex: 1,
      editable: true,
    },
    {
      field: "status",
      type: "singleSelect",
      headerName: "승인 여부",
      valueOptions: ["대기", "승인", "거절"],
      align: "center",
      headerAlign: "center",
      width: 120,
      renderCell: (params) => RenderStatus(params.row.status),
    },
    {
      field: "deadline",
      type: "singleSelect",
      headerName: "만료 여부",
      valueOptions: ["만료됨", "만료되지 않음"],
      align: "center",
      headerAlign: "center",
      width: 120,
      renderCell: (params) => RenderDeadline(params.row.deadline),
    },
    {
      field: "action",
      headerName: " ",
      align: "right",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleClick(event, params.row)}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          <Menu
            keepMounted
            id="long-menu"
            anchorEl={isOpenMaxHeight}
            onClose={handleMaxHeightClose}
            open={Boolean(isOpenMaxHeight)}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            {Options.map((option) => (
              <MenuItem
                key={option}
                onClick={() => {
                  if (option === "삭제") {
                    console.log(`Deleting data with id ${curIndex}...`);
                    setOpen(true);
                    setIndex(curIndex);
                    handleMaxHeightClose();
                  } else if (option === "더보기") {
                    setDetail(true);
                    fetchGetRegularDetail();
                  } else if (option === "개별 예약 보기") {
                    setOpenMore(true);
                  } else {
                    handleMaxHeightClose();
                  }
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      ),
    },
  ];

  const closeMore = () => {
    setOpenMore(false);
  };

  return (
    <>
      <DataGrid
        // checkboxSelection
        disableSelectionOnClick
        rows={regulardata}
        columns={columns}
        pagination
        // onSelectionModelChange={(newSelectionModel) => {
        //   setSelectionModel(newSelectionModel);
        // }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
      {/* 더보기 */}
      <Dialog open={detail} onClose={closeDetail} fullWidth>
        {/*<DialogTitle style={{ textAlign: 'center' }}>거절하시겠습니까?</DialogTitle>*/}
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ marginTop: "30px" }}>
              <Typography sx={{ margin: "10px" }}>
                {"신청일: " + detailData.regDate}
              </Typography>
              <Typography sx={{ margin: "10px" }}>
                {"그룹명: " + detailData.groupName}
              </Typography>
              <Typography sx={{ margin: "10px" }}>
                {"목적: " + detailData.purpose}
              </Typography>
              <Typography sx={{ margin: "10px" }}>
                {"번호: " + detailData.contact}
              </Typography>
              <Typography sx={{ margin: "10px" }}>
                {"답변1: " + detailData.answer1}
              </Typography>
              <Typography sx={{ margin: "10px" }}>
                {"답변2: " + detailData.answer2}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          {/*<Button onClick={closeMore}>취소</Button>*/}
          {/*<Button color="error" onClick={confirmReject} autoFocus>*/}
          {/*    확인*/}
          {/*</Button>*/}
        </DialogActions>
      </Dialog>
      {/* 개별 예약 보기 */}
      <Dialog open={openMore} onClose={closeMore} maxWidth={false} fullWidth>
        <DetailReserve siteUser={siteUser} site={site} regularId={curIndex} />
      </Dialog>
    </>
  );
}

// function
function RenderStatus(getStatus) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  return (
    <Label
      variant={isLight ? "soft" : "filled"}
      color={
        (getStatus === "거절" && "error") ||
        (getStatus === "대기" && "warning") ||
        "success"
      }
      sx={{ mx: "auto" }}
    >
      {getStatus}
    </Label>
  );
}

function RenderDeadline(getUseDate) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  return (
    <>
      <Label
        variant={isLight ? "soft" : "filled"}
        color={(getUseDate === "만료됨" && "error") || "success"}
        sx={{ mx: "auto" }}
      >
        {getUseDate}
      </Label>
    </>
  );
}
