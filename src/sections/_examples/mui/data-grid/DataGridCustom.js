import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
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
  DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog
} from '@mui/material';
import { DataGrid, GridToolbar, getGridNumericOperators } from '@mui/x-data-grid';
// utils
import { fPercent } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import { CustomAvatar } from '../../../../components/custom-avatar';


// ----------------------------------------------------------------------





// ----------------------------------------------------------------------

DataGridCustom.propTypes = {
  data: PropTypes.array,
};

export default function DataGridCustom({ data, setDel, setOpen , setIndex}) {
  const [selectionModel, setSelectionModel] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [curIndex, setCurIndex] = useState(0);
  const [rw, setRw] = useState();

  // const [rejected , setRejected] = useState(false);

  const [reject, setReject] = useState(false);

  const [isOpenMaxHeight, setOpenMaxHeight] = useState(null);
  const Options = ["삭제", "개별 예약 보기"];
  const columns = [
    // OPTIONS
    // https://mui.com/x/api/data-grid/grid-col-def/#main-content
    // - hide: false (default)
    // - editable: false (default)
    // - filterable: true (default)
    // - sortable: true (default)
    // - disableColumnMenu: false (default)

    // FIELD TYPES
    // --------------------
    // 'string' (default)
    // 'number'
    // 'date'
    // 'dateTime'
    // 'boolean'
    // 'singleSelect'

    {
      field: 'id',
      hide: true,
    },
    {
      field: 'place',
      headerName: '장소',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
    },
    {
      field: 'useDate',
      type: 'dateTime',
      headerName: '사용 날짜',
      headerAlign: 'center',
      align: 'center',
      width: 100,
    },
    {
      field: 'applyDate',
      type: 'dateTime',
      headerName: '신청 날짜',
      headerAlign: 'center',
      align: 'center',
      width: 100,
    },
    {
      field: 'time',
      type: 'number',
      headerName: '사용 시간',
      headerAlign: 'center',
      align: 'center',
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: 'applicant',
      headerName: '신청인',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      editable: true,
    },
    {
      field: 'purpose',
      headerName: '목적',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      editable: true,
    },
    {
      field: 'status',
      type: 'singleSelect',
      headerName: '승인 여부',
      valueOptions: ['대기', '승인', '거절'],
      align: 'center',
      headerAlign: 'center',
      width: 120,
      renderCell: (params) => RenderStatus(params.row.status),
    },
    {
      field: 'temp',
      type: 'number',
      headerName: '관리',
      align: 'center',
      headerAlign: 'center',
      width: 160,
      renderCell: (params) => (
          <Stack spacing={1} direction="row" alignItems="center" sx={{ px: 1, width: 1, height: 1, justifyContent:"center" }}>
            {
             params.row.status === '거절' ? " " :
            <>
              { params.row.status === '대기' ?
                <><Button variant={"contained"} onClick={()=> handleApprove(params.row)}>승인</Button>
                  <Button variant={"contained"} color={"error"} onClick={()=> handleReject(params.row)}>거절</Button>
                </> :
                <Button variant={"contained"} color={"warning"} onClick={()=>handleCancel(params.row)}>승인취소</Button>
              }
            </>
            }
          </Stack>
      ),
    },
    {
      field: 'action',
      headerName: ' ',
      align: 'right',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
          <>
            <IconButton onClick={(event) => handleClick(event, params.row.id)} >
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
                    width: '20ch',
                  },
                }}
            >

              {Options.map((option) => (
                  <MenuItem key={option} onClick={() => {
                    if (option === '삭제') {
                      // console.log(params.row);
                      // const id = params.row.id; // get the id of the data associated with the current row
                      console.log(`Deleting data with id ${curIndex}...`);
                      setOpen(true);
                      // setDel(curIndex);
                      setIndex(curIndex);
                      handleMaxHeightClose(); // perform delete operation using the id
                    } else {
                      handleMaxHeightClose(); // close the menu if any other option is selected
                    }
                  }}>
                    {option}
                  </MenuItem>
              ))}
            </Menu>
          </>
      ),
    },
  ];
  const handleMaxHeightClose = (id) => {
    // console.log("아아아: " + id);
    setOpenMaxHeight(null);
  };
  const handleClick = (event, id) => {
    setOpenMaxHeight(event.currentTarget);
    // console.log("id:" + id);
    setCurIndex(id);
  };
  const currentIndex = (id) => {

  };
  const handleApprove = (row) => {
    row.status = '승인';
    console.log("승인");
    setRefresh(1);
  }
  const handleReject = (row) => {
    setRw(row);
    setReject(true);
    // row.status = temp;
    setRefresh(2);
  }



  const handleCancel = (row) => {
    row.status = '대기';
    console.log("대기");
    setRefresh(3);
  }

  const closeReject = () => {
    setReject(false);
  }

  const confirmReject = () => {
    let tm = rw;
    console.log(tm);
    tm.status = '거절';
    setReject(false);
    setRefresh(2);
  }
  useEffect(()=> {
    const selected = data.filter((row) => selectionModel.includes(row.id));
    setDel(selected);
    console.log('SELECTED', selected);
    },[selectionModel]);


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
        <DialogTitle style={{ textAlign: 'center' }}>거절하시겠습니까?</DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <DialogContentText id="alert-dialog-description">
            주의! 거절하시면 취소가 불가능합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={closeReject}>취소</Button>
          <Button color="error" onClick={confirmReject} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

function RenderStatus(getStatus) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <Label
      variant={isLight ? 'soft' : 'filled'}
      color={(getStatus === '거절' && 'error') || (getStatus === '대기' && 'warning') || 'success'}
      sx={{ mx: 'auto' }}
    >
      {getStatus}
    </Label>
  );
}

