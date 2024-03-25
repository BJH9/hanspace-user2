import { Helmet } from 'react-helmet-async';
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
    DialogContent, DialogContentText, DialogActions
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock_
import _mock, { randomInArray } from '../../../_mock';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import DataGridBasic from '../../../sections/_examples/mui/data-grid/DataGridBasic';
import DataGridCustom from '../../../sections/_examples/mui/data-grid/DataGridCustom';
import {useEffect, useState} from "react";

// ----------------------------------------------------------------------

export const _dataGrid = [...Array(36)].map((_, index) => ({
    id: _mock.id(index),
    name: _mock.name.fullName(index),
    email: _mock.email(index),
    lastLogin: _mock.time(index),
    performance: _mock.number.percent(index),
    rating: _mock.number.rating(index),
    status: randomInArray(['대기', '수락', '거절']),
    isAdmin: _mock.boolean(index),
    lastName: _mock.name.lastName(index),
    firstName: _mock.name.firstName(index),
    age: _mock.number.age(index),
}));

const data = [
    {
        "id" : 1,
        "place" : "NTH220",
        //사용날짜
        "useDate" : "2023-03-22",
        //신청날짜
        "applyDate" : "2023-03-11",
        //사용시간
        "time" : "07:30 ~ 10:30",
        //신청인
        "applicant" : "이인혁",
        // 목적
        "purpose": "캡스톤 미팅",
        //승인여부
        "status" : "대기",
    },
    {
        "id" : 2,
        "place" : "NTH219",
        //사용날짜
        "useDate" : "2023-03-23",
        //신청날짜
        "applyDate" : "2023-03-12",
        //사용시간
        "time" : "08:00 ~ 10:00",
        //신청인
        "applicant" : "방제형",
        // 목적
        "purpose": "미팅",
        //승인여부
        "status" : "허가",
    },
    {
        "id" : 3,
        "place" : "NTH218",
        //사용날짜
        "useDate" : "2023-03-24",
        //신청날짜
        "applyDate" : "2023-03-08",
        //사용시간
        "time" : "11:00 ~ 13:00",
        //신청인
        "applicant" : "홍성헌",
        // 목적
        "purpose": "미팅",
        //승인여부
        "status" : "거절",
    },
]
// ----------------------------------------------------------------------

export default function OurMUIDataGridPage() {
    const [del, setDel] = useState([]);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState();

    const [confirmed, setConfirmed] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if(del.length != 0) {
            setOpen(true);
        }
        // console.log(del);
    }
    const confirmDelete = () => {
        // console.log("삭제 인덱스: " + index);
        console.log("삭제될 인덱스: " + index);
        console.log("삭제될 리스트: "+ del);
        setDel([]);
        setOpen(false);
    }


    // useEffect(()=>{setConfirmed(true)},[confirmed]);
    return (
        <>
            <Container sx={{ my: 10}}>
                    <Card>
                        <CardHeader title="승인 대기 현황" sx={{ mb: 2}} />
                        <Box sx={{display:"flex", justifyContent:"end", mb:"1rem", mr:"2rem"}}>
                            <Button variant={"contained"} color={"error"} onClick={()=> handleDelete()}>선택 삭제</Button>
                        </Box>
                        <Box sx={{ height: 720}}>
                            <DataGridCustom data={data} setDel={setDel} setOpen={setOpen} setIndex={setIndex} />
                        </Box>
                    </Card>
            </Container>





                <Dialog open={open && del.length != 0 || open && index.length != 0} onClose={handleClose} fullWidth>
                    <DialogTitle style={{ textAlign: 'center' }}>삭제하시겠습니까?</DialogTitle>
                    <DialogContent style={{ textAlign: 'center' }}>
                        <DialogContentText id="alert-dialog-description">
                            주의! 삭제하시면 기록이 완전히 삭제됩니다.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button onClick={handleClose}>취소</Button>
                        <Button color="error" onClick={confirmDelete} autoFocus>
                            삭제
                        </Button>
                    </DialogActions>
                </Dialog>




        </>
    );
}
