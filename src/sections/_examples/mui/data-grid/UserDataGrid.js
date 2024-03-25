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
import OneTimeReservation from "../../../../pages/components/mui/OneTimeReservation";
import DetailDataGrid from "./DetailDataGrid";
import DetailReservation from "../../../../pages/components/mui/DetailReservation";
import UserAuth from "./UserAuth";
import OurUserAuth from "src/pages/components/mui/OurUserAuth";
import { changeMultiUserStatus, changeUserStatus } from "src/api/reserve";
import { changeUserAuth } from "src/api/user";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

UserDataGrid.propTypes = {
  data: PropTypes.array,
};

export default function UserDataGrid({
  data,
  setDel,
  setOpen,
  setIndex,
  flag,
  flag2,
  flag3,
  del,
  site,
}) {
  const [selectionModel, setSelectionModel] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [curIndex, setCurIndex] = useState(0);
  const [rw, setRw] = useState();
  const [reject, setReject] = useState(false);
  const [isOpenMaxHeight, setOpenMaxHeight] = useState(null);
  const Options = ["삭제"];
  const [openMore, setOpenMore] = useState(false);
  const [detail, setDetail] = useState(false);
  const [detailContent, setDetailContent] = useState("");
  const [multiReject, setMultiReject] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [changeAuth, setChangeAuth] = useState(false);
  const [change, setChange] = useState(false);
  const [chosenId, setChosenId] = useState();
  const [chosenAuth, setChosenAuth] = useState();

  const columns = [
    {
      field: "id",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "userName",
      headerName: "사용자명",
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "authorization",
      headerName: "권한",
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params) => (
        <>
          <OurUserAuth
            params={params}
            id={params.row.id}
            auth={params.row.authorization}
            setChangeAuth={setChangeAuth}
            change={change}
            setChange={setChange}
            setChosenId={setChosenId}
            setChosenAuth={setChosenAuth}
          ></OurUserAuth>
        </>
      ),
    },
    {
      field: "email",
      flex: 1,
      headerName: "이메일",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "status",
      type: "singleSelect",
      headerName: "승인 여부",
      valueOptions: ["대기", "승인", "거절"],
      align: "center",
      headerAlign: "center",
      width: 120,
      renderCell: (params) => {
        if (params.row.authorization === "creator") {
          return RenderStatus("승인");
        } else if (params.row.authorization === "blacklist") {
          return RenderStatus("거절");
        } else {
          return RenderStatus(params.row.status);
        }
      },
    },
    {
      field: "temp",
      type: "number",
      headerName: "관리",
      align: "center",
      headerAlign: "center",
      width: 160,
      renderCell: (params) => (
        <>
          {params.row.authorization === "creator" ||
          params.row.authorization === "blacklist" ? (
            ""
          ) : (
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
          )}
        </>
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
          {params.row.authorization === "creator" ? (
            ""
          ) : (
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
                    width: "10ch",
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
          )}
        </>
      ),
    },
  ];

  const closeChangeAuth = () => {
    setChangeAuth(false);
  };
  useEffect(() => {
    console.log("chosenId");
    console.log(chosenId);
    console.log("chosenAuth");
    console.log(chosenAuth);
  }, [chosenId, chosenAuth]);

  const confirmAuth = () => {
    setChange(!change);
    console.log("들어옴");
    console.log(site.id);
    console.log(chosenId);
    console.log(chosenAuth);

    let info = JSON.stringify({
      siteId: site.id,
      userId: chosenId,
      auth: chosenAuth,
    });
    changeUserAuth(info);

    setRefresh(1);

    setChangeAuth(false);
    window.location.reload();
  };
  const handleMaxHeightClose = () => {
    setOpenMaxHeight(null);
  };
  const handleClick = (event, row) => {
    setOpenMaxHeight(event.currentTarget);

    setCurIndex(row.id);

    if (row.detail === undefined) {
      let temp = `신청날짜: ${row.applyDate}`;
      setDetailContent(temp);
    } else {
      let temp = row.detail;
      temp = temp + `\n신청날짜: ${row.applyDate}`;
      setDetailContent(temp);
    }
  };

  const handleApprove = (row) => {
    let info = JSON.stringify({
      siteId: site.id,
      statusId: 2,
      userId: row.id,
    });
    changeUserStatus(info);
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
      userList: newArr,
    });

    changeMultiUserStatus(info);
    setRefresh(1);
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
      userList: cancelIds,
    });

    changeMultiUserStatus(info);
    setRefresh(2);
  };

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
      userList: rejectedIds,
    });

    changeMultiUserStatus(info);
    setMultiReject(false);
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

  const closeDetail = () => {
    setDetail(false);
  };
  const handleCancel = (row) => {
    let info = JSON.stringify({
      siteId: site.id,
      statusId: 1,
      userId: row.id,
    });
    changeUserStatus(info);
    row.status = "대기";
    setRefresh(3);
  };

  const closeReject = () => {
    setReject(false);
  };

  const confirmReject = () => {
    let tm = rw;

    let info = JSON.stringify({
      siteId: site.id,
      statusId: 3,
      userId: tm.id,
    });
    changeUserStatus(info);
    tm.status = "거절";
    setReject(false);

    setRefresh(2);
  };

  const closeMore = () => {
    setOpenMore(false);
  };
  useEffect(() => {
    const selected = data.filter((row) => {
      if (row.authorization !== "creator") {
        return selectionModel.includes(row.id);
      }
      return false;
    });

    setDel(selected);
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

      <Dialog open={detail} onClose={closeDetail} fullWidth>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            <pre>{detailContent}</pre>
            <pre>{}</pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}></DialogActions>
      </Dialog>

      <Dialog open={changeAuth} onClose={closeChangeAuth} fullWidth>
        <DialogTitle style={{ textAlign: "center" }}>
          권한을 변경하시겠습니까?
        </DialogTitle>

        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={closeChangeAuth}>취소</Button>
          <Button color="error" onClick={confirmAuth} autoFocus>
            확인
          </Button>
        </DialogActions>
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
