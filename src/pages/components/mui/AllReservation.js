import { Helmet } from "react-helmet-async";
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
// routes
import { PATH_PAGE } from "../../../routes/paths";
// _mock_
import _mock, { randomInArray } from "../../../_mock";
// components
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
// sections
import DataGridBasic from "../../../sections/_examples/mui/data-grid/DataGridBasic";
import DataGridCustom from "../../../sections/_examples/mui/data-grid/DataGridCustom";
import { useEffect, useState } from "react";
import AllDataGrid from "../../../sections/_examples/mui/data-grid/AllDataGrid";
import {
  deleteMultiRecord,
  deleteOneRecord,
  getAllReserved,
} from "src/api/reserve";
import axios from "axios";

export const _dataGrid = [...Array(36)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  lastLogin: _mock.time(index),
  performance: _mock.number.percent(index),
  rating: _mock.number.rating(index),
  status: randomInArray(["대기", "수락", "거절"]),
  isAdmin: _mock.boolean(index),
  lastName: _mock.name.lastName(index),
  firstName: _mock.name.firstName(index),
  age: _mock.number.age(index),
}));

export default function AllReservation({ site }) {
  const [del, setDel] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState();
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [changelist, setChangelist] = useState([]);
  const [data, setData] = useState();
  const [refresh, setRefresh] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelApprove = () => {
    if (del.length != 0) {
      console.log(del);
      console.log("chnagelist: " + changelist);
      setFlag2(!flag2);
    }
  };

  const handleDelete = () => {
    if (del.length != 0) {
      console.log(del);
      setOpen(true);
    }
  };
  const handleApprove = () => {
    if (del.length != 0) {
      console.log(del);
      setFlag(!flag);
    }
  };
  const handleReject = () => {
    if (del.length != 0) {
      console.log(del);
      setFlag3(!flag3);
    }
  };

  const readReserve = async () => {
    await getAllReserved(site.id).then(function (info) {
      setData(info);
    });
  };

  useEffect(() => {
    readReserve();
  }, [refresh]);

  useEffect(() => {
    setRefresh(null);
  }, [data]);

  const confirmDelete = async () => {
    if (index != undefined) {
      console.log("개인 삭제 들어옴");
      await deleteOneRecord(site.id, index);
    } else {
      console.log("멀티 삭제 들어옴");
      const idList = del.map((list) => list.id);
      console.log("idList : " + idList);
      await deleteMultiRecord(site.id, idList);
    }
    setData(await getAllReserved(site.id));
    setDel([]);
    setOpen(false);
  };

  if (data != null) {
    return (
      <>
        <Container sx={{ my: 10 }}>
          <Card>
            <CardHeader title="전체 대여 현황" sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                mb: "1rem",
                mr: "2rem",
              }}
            >
              <Button
                variant={"outlined"}
                color={"primary"}
                onClick={() => handleApprove()}
                sx={{ mr: "0.6rem" }}
              >
                선택 승인
              </Button>
              <Button
                variant={"outlined"}
                color={"warning"}
                onClick={() => handleCancelApprove()}
              >
                선택 승인 취소
              </Button>
              <Button
                variant={"outlined"}
                color={"error"}
                onClick={() => handleReject()}
                sx={{ ml: "0.6rem" }}
              >
                선택 거절
              </Button>
              <Box sx={{ marginLeft: "8px" }}>
                <Button
                  variant={"outlined"}
                  color={"error"}
                  onClick={() => handleDelete()}
                >
                  선택 삭제
                </Button>
              </Box>
            </Box>
            <Box sx={{ height: 720 }}>
              <AllDataGrid
                data={data}
                setDel={setDel}
                setOpen={setOpen}
                setIndex={setIndex}
                flag={flag}
                flag2={flag2}
                flag3={flag3}
                del={del}
                setChangelist={setChangelist}
                changelist={changelist}
                site={site}
              />
            </Box>
          </Card>
        </Container>

        <Dialog
          open={(open && del.length !== 0) || (open && index.length !== 0)}
          onClose={handleClose}
          fullWidth
        >
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
}
