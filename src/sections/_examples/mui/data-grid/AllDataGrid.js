import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
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
import {
  DataGrid,
  GridToolbar,
  getGridNumericOperators,
} from "@mui/x-data-grid";
// utils
import { fPercent } from "../../../../utils/formatNumber";
// components
import Label from "../../../../components/label";
import Iconify from "../../../../components/iconify";
import { CustomAvatar } from "../../../../components/custom-avatar";
import DetailReservation from "src/pages/components/mui/DetailReservation";
import {
  approve,
  changeApprove,
  changeMultiStatus,
  changeStatus,
} from "src/api/reserve";
import { format } from "date-fns";
import koLocale from "date-fns/locale/ko";

AllDataGrid.propTypes = {
  data: PropTypes.array,
};

export default function AllDataGrid({
  data,
  setDel,
  setOpen,
  setIndex,
  flag,
  flag2,
  flag3,
  del,
  setChangelist,
  changelist,
  site,
}) {
  const [selectionModel, setSelectionModel] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [curIndex, setCurIndex] = useState(0);
  const [rw, setRw] = useState();

  const [openMore, setOpenMore] = useState(false);
  const [detail, setDetail] = useState(false);
  const [detailContent, setDetailContent] = useState("");
  const [multiReject, setMultiReject] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [rendered, setRendered] = useState(false);

  const [reject, setReject] = useState(false);

  const [isOpenMaxHeight, setOpenMaxHeight] = useState(null);
  const Options = ["삭제", "더보기"];
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "place",
      headerName: "장소",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "useDate",
      type: "dateTime",
      headerName: "사용 날짜",
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = format(date, "yyyy-MM-dd (EE)", {
          locale: koLocale,
        });
        return formattedDate;
      },
    },
    {
      field: "time",
      type: "number",
      headerName: "사용 시간",
      headerAlign: "center",
      align: "center",
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "userName",
      headerName: "유저 이름",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "applicant",
      headerName: "신청인",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "status",
      type: "singleSelect",
      headerName: "승인 여부",
      valueOptions: ["대기", "승인", "거절"],
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => RenderStatus(params.row.status),
    },
    {
      field: "temp",
      type: "number",
      headerName: "관리",
      align: "center",
      headerAlign: "center",
      width: 160,
      renderCell: (params) => (
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ px: 1, width: 1, height: 1, justifyContent: "center" }}
        >
          {params.row.status === "거절" ? (
            " "
          ) : (
            <>
              {params.row.status === "대기" ? (
                <>
                  <Button
                    variant={"outlined"}
                    onClick={() => handleApprove(params.row)}
                  >
                    승인
                  </Button>
                  <Button
                    variant={"outlined"}
                    color={"error"}
                    onClick={() => handleReject(params.row)}
                  >
                    거절
                  </Button>
                </>
              ) : (
                <Button
                  variant={"outlined"}
                  color={"warning"}
                  onClick={() => handleCancel(params.row)}
                >
                  승인취소
                </Button>
              )}
            </>
          )}
        </Stack>
      ),
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

                width: "15ch",
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                borderRadius: "20px",
              },
            }}
          >
            {Options.map((option) => (
              <MenuItem
                key={option}
                onClick={() => {
                  if (option === "삭제") {
                    setIndex(curIndex);
                    setOpen(true);

                    handleMaxHeightClose();
                  } else if (option === "더보기") {
                    setDetail(true);
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
  const handleMaxHeightClose = (id) => {
    setOpenMaxHeight(null);
  };
  const handleClick = (event, row) => {
    setOpenMaxHeight(event.currentTarget);
    setCurIndex(row.id);

    if (row.detail == undefined) {
      let temp = "";
      setDetailContent(temp);
    } else {
      let temp = row.detail;
      if (row.purpose) {
        temp += "\n목적: " + row.purpose;
      }
      if (row.applyDate) {
        temp += "\n신청 날짜: " + row.applyDate;
      }
      if (row.time) {
        temp += "\n사용 시간: " + row.time;
      }

      setDetailContent(temp);
    }
  };

  const handleApprove = (row) => {
    let info = JSON.stringify({
      siteId: site.id,
      statusId: 2,
      recordId: row.id,
    });
    changeStatus(info);
    row.status = "승인";

    setRefresh(1);
  };
  const handleReject = (row) => {
    setRw(row);
    setReject(true);

    setRefresh(2);
  };

  const closeMultiReject = () => {
    setMultiReject(false);
  };

  const handleMultiApprove = () => {
    const approvedIds = del
      .filter((row) => row.status === "대기")
      .map((row) => row.id);

    del.map((row) => {
      if (row.status != "거절") {
        row.status = "승인";
      }
    });

    const newArr = [...approvedIds];

    let info = JSON.stringify({
      siteId: site.id,
      statusId: 2,
      recordList: newArr,
    });

    changeMultiStatus(info);
    setRefresh(1);
  };

  useEffect(() => {
    console.log("changelist: " + changelist);
  }, [changelist]);

  const handleMultiReject = () => {
    setMultiReject(true);
    setConfirmed(false);
    setRefresh(4);
  };

  const confirmMultiReject = () => {
    const rejectedIds = del.map((row) => row.id);
    del.map((row) => {
      row.status = "거절";
    });

    let info = JSON.stringify({
      siteId: site.id,
      statusId: 3,
      recordList: rejectedIds,
    });

    changeMultiStatus(info);
    setMultiReject(false);
  };

  const handleMultiCancel = () => {
    const cancelIds = del
      .filter((row) => row.status === "승인")
      .map((row) => row.id);

    del.map((row) => {
      if (row.status === "승인") {
        row.status = "대기";
      }
    });
    let info = JSON.stringify({
      siteId: site.id,
      statusId: 1,
      recordList: cancelIds,
    });

    changeMultiStatus(info);

    setRefresh(2);
  };

  useEffect(() => {
    handleMultiApprove();
  }, [flag]);

  useEffect(() => {
    handleMultiCancel();
  }, [flag2]);

  useEffect(() => {
    if (rendered) handleMultiReject();
    setRendered(true);
  }, [flag3]);

  const handleCancel = (row) => {
    let info = JSON.stringify({
      siteId: site.id,
      statusId: 1,
      recordId: row.id,
    });
    changeStatus(info);
    row.status = "대기";
    console.log("대기");
    setRefresh(3);
  };

  const closeDetail = () => {
    setDetail(false);
  };

  const closeReject = () => {
    setReject(false);
  };

  const confirmReject = () => {
    let tm = rw;
    console.log(tm);

    let info = JSON.stringify({
      siteId: site.id,
      statusId: 3,
      recordId: tm.id,
    });
    changeStatus(info);
    tm.status = "거절";
    setReject(false);
    setRefresh(2);
  };
  const closeMore = () => {
    setOpenMore(false);
  };
  useEffect(() => {
    const selected = data.filter((row) => selectionModel.includes(row.id));
    setDel(selected);
    console.log("SELECTED", selected);
  }, [selectionModel]);

  return (
    <>
      <DataGrid
        checkboxSelection
        disableSelectionOnClick
        rows={data}
        columns={columns}
        pagination
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
      <Dialog open={reject} onClose={closeReject} fullWidth>
        <DialogTitle style={{ textAlign: "center" }}>
          거절하시겠습니까?
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            주의! 거절하시면 취소가 불가능합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={closeReject}>취소</Button>
          <Button color="error" onClick={confirmReject} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={multiReject} onClose={closeMultiReject} fullWidth>
        <DialogTitle style={{ textAlign: "center" }}>
          거절하시겠습니까?
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            주의! 거절하시면 취소가 불가능합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={closeMultiReject}>취소</Button>
          <Button color="error" onClick={confirmMultiReject} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openMore} onClose={closeMore} maxWidth={false} fullWidth>
        <DetailReservation></DetailReservation>
      </Dialog>

      <Dialog
        open={detail}
        onClose={closeDetail}
        PaperProps={{
          style: {
            minWidth: 300,
          },
        }}
      >
        <DialogContent style={{ textAlign: "center", padding: "3rem" }}>
          <pre>{detailContent}</pre>
        </DialogContent>
      </Dialog>
    </>
  );
}

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
