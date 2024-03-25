import * as Yup from "yup";
import { useRef, useEffect, useState } from "react";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import roomImage from "../../../../assets/img/뉴턴220호.jpg";
// @mui
import {
  Stack,
  Grid,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  FormControlLabel,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
// utils
import { fTimestamp } from "../../../../utils/formatTime";
import { fData } from "../../../../utils/formatNumber";
// components
import Iconify from "../../../../components/iconify";
import FormProvider, {
  RHFEditor,
  RHFCheckbox,
  RHFTextField,
} from "../../../../components/hook-form";
import { useNavigate } from "react-router-dom";
import { reserve, reserveRegular } from "src/api/reserve";
import { makeStyles } from "@mui/styles";

// ----------------------------------------------------------------------

export const defaultValues = {
  email: "21700559@handong.ac.kr",
  siteId: 1,
  groupName: null,
  groupPurpose: null,
  name: null,
  number: null,
  answer1: null,
  answer2: null,
  reserveStartDate: "",
  reserveTime: "",
  roomName: "",
};

// export const FormSchema = Yup.object().shape({
//   roomName: Yup.string(),
//   groupName: Yup.string().required("모임명을 적어주셔야 합니다."),
//   groupPurpose: Yup.string().required("모임 목적을 적어주셔야 합니다."),
//   name: Yup.string().required("이름을 적어주셔야 합니다."),
//   number: Yup.string().required("연락처를 적어주셔야 합니다."),

//   answer1: Yup.string().required("질문에 답해주셔야 합니다."),
//   // answer2: Yup.string().required("질문에 답해주셔야 합니다."),
// });

export default function OurReactHookForm({
  site,
  selectedRoom,
  weekdays,
  reserveOne,
  reserveTime,
  reserveStartDate,
  reserveEndDate,
  scrollToRef,
  stepTwo,
  link,
  siteUser,
}) {
  const fileInputRef = useRef(null);
  const FormSchema = Yup.lazy((values) => {
    let schema = Yup.object().shape({
      roomName: Yup.string(),
      groupName: Yup.string().required("모임명을 적어주셔야 합니다."),
      groupPurpose: Yup.string().required("모임 목적을 적어주셔야 합니다."),
      name: Yup.string().required("이름을 적어주셔야 합니다."),
      number: Yup.string().required("연락처를 적어주셔야 합니다."),
    });

    if (site.question1) {
      schema = schema.shape({
        answer1: Yup.string().required("질문에 답해주셔야 합니다."),
      });
    }

    if (site.question2) {
      schema = schema.shape({
        answer2: Yup.string().required("질문에 답해주셔야 합니다."),
      });
    }

    return schema;
  });
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [rendered, setRendered] = useState(false);

  const [group, setGroup] = useState("");
  const [purpose, setPurpose] = useState("");
  const [reservation, setReservation] = useState("");
  const [number, setNumber] = useState("");
  const [dayNames, setDayNames] = useState([]);
  const [username, setUsername] = useState("");

  const [sendData, setSendData] = useState();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    register,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleClickAttachPhoto = () => {
    fileInputRef.current?.click();
  };

  const saveReserve = async (info) => {
    await reserve(info).then(function (inf) {
      console.log("저장 완료!");
    });
  };

  const saveRegularReserve = async (info) => {
    await reserveRegular(info).then(function (inf) {
      console.log("저장 완료!");
    });
  };
  const submitData = async (data) => {
    console.log("하이");
    let sendInfo = JSON.stringify({
      ...data,
      roomName: selectedRoom,
    });
    console.log(sendInfo);

    setSendData(sendInfo);

    if (!Object.keys(errors).length) {
      setOpen(true);
    }
    // reset();
  };

  // const onSubmit = async (data) => {
  //   console.log("하이");
  //   let sendInfo = JSON.stringify({
  //     ...data,
  //     roomName: selectedRoom,
  //   });
  //   console.log(sendInfo);

  //   setSendData(sendInfo);

  //   if (!Object.keys(errors).length) {
  //     setOpen(true);
  //   }
  //   // reset();
  // };

  const handleClickOpen = () => {
    if (!Object.keys(errors).length) {
      setOpen(true);
    }
  };
  const movePage = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const moveBefore = () => {
    scrollToRef(stepTwo);
  };
  const handleApply = () => {
    if (reserveOne === true) saveReserve(sendData);
    else saveRegularReserve(sendData);
    setOpen(false);
    alert("예약 완료되었습니다.");
    // movePage(``);
    window.location.reload();
  };
  const handleChange = () => {
    setChecked(!checked);
  };

  const callSavedInfo = () => {
    setGroup(siteUser.groupName);
    setPurpose(siteUser.purpose);
    setReservation(siteUser.reservation);
    setNumber(siteUser.contact);
  };

  useEffect(() => {
    console.log(rendered);
    if (rendered) {
      callSavedInfo();
    } else {
      setRendered(true);
    }
  }, [checked]);

  useEffect(() => {
    let names = [];
    for (let i = 0; i < weekdays.length; i++) {
      if (weekdays[i] === true) {
        switch (i) {
          case 0:
            names.push("일");
            break;
          case 1:
            names.push("월");
            break;
          case 2:
            names.push("화");
            break;
          case 3:
            names.push("수");
            break;
          case 4:
            names.push("목");
            break;
          case 5:
            names.push("금");
            break;
          case 6:
            names.push("토");
            break;
        }
      }
    }

    setDayNames(names);
  }, [weekdays]);

  return (
    <>
      {reserveOne ? (
        <>
          <FormControlLabel
            control={<Checkbox onChange={handleChange} />}
            label="내 정보 불러오기"
            style={{ marginBottom: "10px" }}
          />

          <FormProvider methods={methods} onSubmit={handleSubmit(submitData)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Stack spacing={3}>
                  {checked && siteUser ? (
                    <>
                      <InputLabel>공간명</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedRoom}
                        // label="공간명"
                        // ph={selectedRoom}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <InputLabel>모임명</InputLabel>
                      <RHFTextField
                        // className={classes.textField}
                        name="groupName"
                        ph={group}
                        // label="모임명"
                      />
                      <InputLabel>대여목적</InputLabel>
                      <RHFTextField
                        name="groupPurpose"
                        ph={purpose}
                        // label="대여목적"
                      />
                      <InputLabel>신청인 이름</InputLabel>
                      <RHFTextField
                        name="name"
                        ph={reservation}
                        // label="신청인 이름"
                      />
                      <InputLabel>신청인 번호</InputLabel>
                      <RHFTextField
                        name="number"
                        ph={number}
                        // label="신청인 번호"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const numberValue = parseInt(enteredValue);
                          if (!isNaN(numberValue)) {
                            setValue("number", numberValue);
                          }
                        }}
                      />

                      {site.question1 && (
                        <>
                          <InputLabel>{site.question1}</InputLabel>
                          <RHFTextField
                            name="answer1"
                            ph={""}
                            // label={site.question1}
                          />
                        </>
                      )}

                      {site.question2 && (
                        <>
                          <InputLabel>{site.question2}</InputLabel>
                          <RHFTextField
                            name="answer2"
                            ph={""}
                            // label={site.question1}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <InputLabel>공간명</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedRoom}
                        // label="공간명"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <InputLabel>모임명</InputLabel>
                      <RHFTextField name="groupName" ph={""} />
                      <InputLabel>대여목적</InputLabel>
                      <RHFTextField
                        name="groupPurpose"
                        ph={""}
                        // label="대여목적"
                      />
                      <InputLabel>신청인 이름</InputLabel>
                      <RHFTextField
                        name="name"
                        ph={username}
                        // label="신청인 이름"
                      />
                      <InputLabel>신청인 번호</InputLabel>
                      <RHFTextField
                        name="number"
                        ph={"01034533939"}
                        // label="신청인 번호"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const numberValue = parseInt(enteredValue);
                          if (!isNaN(numberValue)) {
                            setValue("number", numberValue);
                          }
                        }}
                      />
                      {site.question1 && (
                        <>
                          <InputLabel>{site.question1}</InputLabel>
                          <RHFTextField
                            name="answer1"
                            ph={""}
                            // label={site.question1}
                          />
                        </>
                      )}

                      {site.question2 && (
                        <>
                          <InputLabel>{site.question2}</InputLabel>
                          <RHFTextField
                            name="answer2"
                            ph={""}
                            // label={site.question1}
                          />
                        </>
                      )}
                    </>
                  )}

                  <Stack
                    spacing={{ xs: 2, sm: 3 }}
                    direction={{ xs: "column", sm: "row" }}
                  >
                    <RHFTextField
                      name="reserveStartDate"
                      fullWidth
                      ph={`${reserveStartDate.getFullYear()}/${
                        reserveStartDate.getMonth() + 1
                      }/${reserveStartDate.getDate()}`}
                      readOnly
                      label={"예약 날짜"}
                    />
                    <RHFTextField
                      fullWidth
                      name="reserveTime"
                      ph={reserveTime}
                      value={reserveTime}
                      label={"예약 시간"}
                      readOnly
                    />
                  </Stack>

                  <Box sx={{ display: "flex" }}>
                    <Button
                      sx={{ width: "50%", margin: "4px" }}
                      color="secondary"
                      variant={"contained"}
                      size={"large"}
                      onClick={moveBefore}
                    >
                      뒤로가기
                    </Button>

                    <LoadingButton
                      sx={{ width: "50%", margin: "4px" }}
                      color="info"
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      예약하기
                    </LoadingButton>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    minWidth: 300,
                  },
                }}
              >
                <DialogTitle style={{ textAlign: "center" }}>
                  예약하시겠습니까?
                </DialogTitle>

                <DialogContent style={{ textAlign: "center" }}>
                  <Typography style={{ color: "red" }}>
                    {" "}
                    공간 : {selectedRoom}
                  </Typography>
                  <Typography style={{ color: "blue" }}>
                    {" "}
                    날짜 :{" "}
                    {`${reserveStartDate.getFullYear()}/${
                      reserveStartDate.getMonth() + 1
                    }/${reserveStartDate.getDate()}\n`}
                    {"~ "}
                    {`${reserveEndDate.getFullYear()}/${
                      reserveEndDate.getMonth() + 1
                    }/${reserveEndDate.getDate()}\n`}
                  </Typography>
                  <Typography style={{ color: "green" }}>
                    예약 시간 : {reserveTime.join(", ")}
                  </Typography>
                </DialogContent>

                <DialogActions style={{ justifyContent: "center" }}>
                  <Button color="error" onClick={handleClose} autoFocus>
                    취소
                  </Button>
                  <Button onClick={handleApply}>예약</Button>
                </DialogActions>
              </Dialog>
            </div>
          </FormProvider>
        </>
      ) : (
        <>
          <FormControlLabel
            control={<Checkbox onChange={handleChange} />}
            label="내 정보 불러오기"
            style={{ marginBottom: "10px" }}
          />
          <FormProvider methods={methods} onSubmit={handleSubmit(submitData)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Stack spacing={3}>
                  {checked && siteUser ? (
                    <>
                      <InputLabel>공간명</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedRoom}
                        // label="공간a"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <InputLabel>모임명</InputLabel>
                      <RHFTextField
                        name="groupName"
                        ph={group}
                        // label="모임명"
                      />
                      <InputLabel>대여목적</InputLabel>
                      <RHFTextField
                        name="groupPurpose"
                        ph={purpose}
                        // label="대여목적"
                      />
                      <InputLabel>신청인 이름</InputLabel>
                      <RHFTextField
                        name="name"
                        ph={reservation}
                        // label="신청인 이름"
                      />
                      <InputLabel>신청인 번호</InputLabel>
                      <RHFTextField
                        name="number"
                        ph={number}
                        // label="신청인 번호"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const numberValue = parseInt(enteredValue);
                          if (!isNaN(numberValue)) {
                            setValue("number", numberValue);
                          }
                        }}
                      />
                      {site.question1 && (
                        <>
                          <InputLabel>{site.question1}</InputLabel>
                          <RHFTextField
                            name="answer1"
                            ph={""}
                            // label={site.question1}
                          />
                        </>
                      )}
                      {site.question2 && (
                        <>
                          <InputLabel>{site.question2}</InputLabel>
                          <RHFTextField
                            name="answer2"
                            ph={""}
                            // label={site.question1}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <InputLabel>공간명</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedRoom}
                        // label="공간 이름"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <InputLabel>모임명</InputLabel>
                      <RHFTextField name="groupName" ph={""} />
                      <InputLabel>대여목적</InputLabel>
                      <RHFTextField
                        name="groupPurpose"
                        ph={""}
                        // label="대여목적"
                      />
                      <InputLabel>신청인 이름</InputLabel>
                      <RHFTextField
                        name="name"
                        ph={username}
                        // label="신청인 이름"
                      />
                      <InputLabel>신청인 번호</InputLabel>
                      <RHFTextField
                        name="number"
                        ph={"01034533939"}
                        // label="신청인 번호"
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          const numberValue = parseInt(enteredValue);
                          if (!isNaN(numberValue)) {
                            setValue("number", numberValue);
                          }
                        }}
                      />
                      {site.question1 && (
                        <>
                          <InputLabel>{site.question1}</InputLabel>
                          <RHFTextField
                            name="answer1"
                            ph={""}
                            // label={site.question1}
                          />
                        </>
                      )}

                      {site.question2 && (
                        <>
                          <InputLabel>{site.question2}</InputLabel>
                          <RHFTextField
                            name="answer2"
                            ph={""}
                            // label={site.question1}
                          />
                        </>
                      )}
                    </>
                  )}

                  <Stack
                    spacing={{ xs: 2, sm: 3 }}
                    direction={{ xs: "column", sm: "row" }}
                  >
                    <RHFTextField
                      name="reserveStartDate"
                      fullWidth
                      ph={
                        `${reserveStartDate.getFullYear()}/${
                          reserveStartDate.getMonth() + 1
                        }/${reserveStartDate.getDate()}` +
                        " ~ " +
                        `${reserveEndDate.getFullYear()}/${
                          reserveEndDate.getMonth() + 1
                        }/${reserveEndDate.getDate()}` +
                        " (" +
                        `${dayNames}` +
                        ")"
                      }
                      readOnly
                      label={"예약 날짜"}
                    />
                    <RHFTextField
                      fullWidth
                      name="reserveTime"
                      ph={reserveTime}
                      value={reserveTime}
                      label={"예약 시간"}
                      readOnly
                    />
                  </Stack>

                  <Box sx={{ display: "flex" }}>
                    <Button
                      sx={{ width: "50%", margin: "4px" }}
                      color="secondary"
                      variant={"contained"}
                      size={"large"}
                      onClick={moveBefore}
                    >
                      뒤로가기
                    </Button>
                    <LoadingButton
                      sx={{ width: "50%", margin: "4px" }}
                      color="info"
                      size="large"
                      type="submit"
                      variant="contained"
                      // onClick={methods.handleSubmit(submitData)}
                    >
                      예약하기
                    </LoadingButton>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    minWidth: 300,
                  },
                }}
              >
                <DialogTitle style={{ textAlign: "center" }}>
                  예약하시겠습니까?
                </DialogTitle>

                <DialogContent style={{ textAlign: "center" }}>
                  <Typography style={{ color: "red" }}>
                    {" "}
                    공간 : {selectedRoom}
                  </Typography>
                  <Typography style={{ color: "blue" }}>
                    {" "}
                    날짜 :{" "}
                    {`${reserveStartDate.getFullYear()}/${
                      reserveStartDate.getMonth() + 1
                    }/${reserveStartDate.getDate()}\n`}
                    {"~ "}
                    {`${reserveEndDate.getFullYear()}/${
                      reserveEndDate.getMonth() + 1
                    }/${reserveEndDate.getDate()}\n`}
                  </Typography>
                  <Typography style={{ color: "green" }}>
                    예약 시간 : {reserveTime.join(", ")}
                  </Typography>
                </DialogContent>

                <DialogActions style={{ justifyContent: "center" }}>
                  <Button color="error" onClick={handleClose} autoFocus>
                    취소
                  </Button>
                  <Button onClick={handleApply}>예약</Button>
                </DialogActions>
              </Dialog>
            </div>
          </FormProvider>
        </>
      )}
    </>
  );
}

// import * as Yup from "yup";
// import { useRef, useEffect, useState } from "react";
// // form
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm, Controller } from "react-hook-form";
// import roomImage from "../../../../assets/img/뉴턴220호.jpg";
// // @mui
// import {
//   Stack,
//   Grid,
//   Button,
//   TextField,
//   Typography,
//   IconButton,
//   InputAdornment,
//   FormHelperText,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import { DatePicker } from "@mui/x-date-pickers";
// // utils
// import { fTimestamp } from "../../../../utils/formatTime";
// import { fData } from "../../../../utils/formatNumber";
// // components
// import Iconify from "../../../../components/iconify";
// import FormProvider, {
//   RHFEditor,
//   RHFCheckbox,
//   RHFTextField,
// } from "../../../../components/hook-form";
// import { useNavigate } from "react-router-dom";
// import { reserve, reserveRegular } from "src/api/reserve";

// // ----------------------------------------------------------------------

// const dummy_data = [{ type: 1 }, { type: 2 }, { type: 3 }];

// const MAX_FILE_SIZE = 2 * 1000 * 1000; // 2 Mb

// const FILE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

// export const defaultValues = {
//   email: "21700559@handong.ac.kr",
//   siteId: 1,
//   groupName: null,
//   groupPurpose: null,
//   name: null,
//   number: null,
//   answer1: null,
//   answer2: null,
//   reserveStartDate: "",
//   reserveTime: "",
//   roomName: "",
// };

// export const FormSchema = Yup.object().shape({
//   groupName: Yup.string().required("모임명을 적어주셔야 합니다."),
//   groupPurpose: Yup.string().required("모임 목적을 적어주셔야 합니다."),
//   name: Yup.string().required("이름을 적어주셔야 합니다."),
//   number: Yup.string().required("연락처를 적어주셔야 합니다."),
//   // email: Yup.string().required('Email is required').email('That is not an email'),
//   // startDate: Yup.date().nullable().required("시작시간을 적어주셔야 합니다."),
//   // endDate: Yup.date()
//   //   .required("끝시간을 적어주셔야 합니다.")
//   //   .nullable()
//   // .min(Yup.ref("startDate"), "끝시간이 시작시간보다 더 늦어야 합니다."),
//   answer1: Yup.string().required("관련 교수 성함을 적어주셔야 합니다."),
//   // editor: Yup.string().required('Editor is required'),
//   // terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
//   // photo: Yup.mixed()
//   //     .required('Photo is is required')
//   //     .test('fileSize', 'The file is too large', (file) => file && file.size <= MAX_FILE_SIZE)
//   //     .test('fileFormat', 'Unsupported Format', (file) => file && FILE_FORMATS.includes(file.type)),
// });

// export default function OurReactHookForm({
//   selectedRoom,
//   weekdays,
//   reserveOne,
//   reserveTime,
//   reserveStartDate,
//   reserveEndDate,
//   scrollToRef,
//   stepTwo,
//   link,
//   siteUser,
// }) {
//   const fileInputRef = useRef(null);

//   // const [showPassword, setShowPassword] = useState(false);

//   const [open, setOpen] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [rendered, setRendered] = useState(false);

//   const [group, setGroup] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [reservation, setReservation] = useState("");
//   const [number, setNumber] = useState("");
//   const [dayNames, setDayNames] = useState([]);
//   const [username, setUsername] = useState("");
//   const [saved, setSaved] = useState();
//   const [sendData, setSendData] = useState();
//   const methods = useForm({
//     // mode: 'onTouched',
//     mode: "onChange",
//     resolver: yupResolver(FormSchema),
//     defaultValues,
//   });

//   const {
//     watch,
//     reset,
//     control,
//     register,
//     setValue,
//     resetField,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = methods;

//   const handleClickAttachPhoto = () => {
//     fileInputRef.current?.click();
//   };

//   const saveReserve = async (info) => {
//     await reserve(info).then(function (inf) {
//       console.log("저장 완료!");
//     });
//   };

//   const saveRegularReserve = async (info) => {
//     await reserveRegular(info).then(function (inf) {
//       console.log("저장 완료!");
//     });
//   };
//   const onSubmit = async (data) => {
//     // console.log("들어옴");
//     let sendInfo = JSON.stringify({
//       // email: "21700559@handong.ac.kr",
//       // siteId: 1,
//       ...data,
//       roomName: selectedRoom,
//     });
//     console.log(sendInfo);
//     // saveReserve(sendInfo);

//     setSendData(sendInfo);
//     // await new Promise((resolve) => setTimeout(resolve, 300));
//     alert(
//       JSON.stringify(
//         {
//           ...data,

//           roomName: selectedRoom,
//         },
//         null,
//         2
//       )
//     );

//     if (!Object.keys(errors).length) {
//       setOpen(true);
//     }
//     // reset();
//   };

//   const handleClickOpen = () => {
//     if (!Object.keys(errors).length) {
//       setOpen(true);
//     }
//   };
//   const movePage = useNavigate();
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const moveBefore = () => {
//     // setOpen(false);
//     // movePage("/first-filter");
//     scrollToRef(stepTwo);
//   };
//   const handleApply = () => {
//     console.log("sendData: " + sendData);
//     console.log("reserveOne :" + reserveOne);
//     if (reserveOne === true) saveReserve(sendData);
//     else saveRegularReserve(sendData);
//     setOpen(false);
//     alert("예약 완료되었습니다.");
//     movePage(`/${link}`);
//     window.location.reload();
//   };
//   const handleChange = () => {
//     setChecked(!checked);
//   };

//   const callSavedInfo = () => {
//     setGroup(siteUser.groupName);
//     setPurpose(siteUser.purpose);
//     setReservation(siteUser.reservation);
//     setNumber(siteUser.contact);
//   };

//   useEffect(() => {
//     console.log(rendered);
//     if (rendered) {
//       callSavedInfo();
//     } else {
//       setRendered(true);
//     }
//   }, [checked]);

//   useEffect(() => {
//     console.log("weekdays : " + weekdays);
//     let names = [];
//     for (let i = 0; i < weekdays.length; i++) {
//       if (weekdays[i] === true) {
//         switch (i) {
//           case 0:
//             names.push("일");
//             break;
//           case 1:
//             names.push("월");
//             break;
//           case 2:
//             names.push("화");
//             break;
//           case 3:
//             names.push("수");
//             break;
//           case 4:
//             names.push("목");
//             break;
//           case 5:
//             names.push("금");
//             break;
//           case 6:
//             names.push("토");
//             break;
//         }
//       }
//     }
//     console.log("names: " + names);
//     setDayNames(names);
//     console.log("selectedRoom" + selectedRoom);
//   }, [weekdays]);

//   useEffect(() => {
//     console.log(sessionStorage.getItem("user"));
//     // const userData = JSON.parse(sessionStorage.getItem("user"));
//     // const userSavedData = JSON.parse(sessionStorage.getItem("usersavedinfo"));
//     // setSaved(userSavedData);
//     // setUsername(userData.name);
//     console.log(dayNames);
//   }, [dayNames]);
//   return (
//     <>
//       {reserveOne ? (
//         <>
//           <FormControlLabel
//             control={<Checkbox onChange={handleChange} />}
//             label="내 정보 불러오기"
//           />
//           <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={12}>
//                 <Stack spacing={3}>
//                   {checked && siteUser ? (
//                     <>
//                       <RHFTextField
//                         name="groupName"
//                         ph={group}
//                         label="모임명"
//                       />
//                       <RHFTextField
//                         name="groupPurpose"
//                         ph={purpose}
//                         label="대여목적"
//                       />
//                       <RHFTextField
//                         name="name"
//                         ph={reservation}
//                         label="신청인 이름"
//                       />
//                       <RHFTextField
//                         name="number"
//                         ph={number}
//                         label="신청인 번호"
//                       />
//                       <RHFTextField
//                         name="answer1"
//                         ph={"김광, 장소연"}
//                         label="관련 교수"
//                       />
//                     </>
//                   ) : (
//                     <>
//                       <RHFTextField name="groupName" ph={""} label="모임명" />
//                       <RHFTextField
//                         name="groupPurpose"
//                         ph={""}
//                         label="대여목적"
//                       />
//                       <RHFTextField
//                         name="name"
//                         ph={username}
//                         label="신청인 이름"
//                       />
//                       <RHFTextField
//                         name="number"
//                         ph={"01034533939"}
//                         label="신청인 번호"
//                       />
//                       <RHFTextField name="answer1" ph={""} label="관련 교수" />
//                     </>
//                   )}

//                   <Stack
//                     spacing={{ xs: 2, sm: 3 }}
//                     direction={{ xs: "column", sm: "row" }}
//                   >
//                     <RHFTextField
//                       name="reserveStartDate"
//                       fullWidth
//                       ph={`${reserveStartDate.getFullYear()}/${
//                         reserveStartDate.getMonth() + 1
//                       }/${reserveStartDate.getDate()}`}
//                       // value={`${reserveStartDate.getFullYear()}/${
//                       //     reserveStartDate.getMonth() + 1
//                       // }/${reserveStartDate.getDate()}`}
//                       label={"예약 날짜"}
//                     />
//                     <RHFTextField
//                       fullWidth
//                       name="reserveTime"
//                       ph={reserveTime}
//                       value={reserveTime}
//                       label={"예약 시간"}
//                     />
//                   </Stack>

//                   <Box sx={{ display: "flex" }}>
//                     <Button
//                       sx={{ width: "50%", margin: "4px" }}
//                       color="secondary"
//                       variant={"contained"}
//                       size={"large"}
//                       onClick={moveBefore}
//                     >
//                       뒤로가기
//                     </Button>
//                     {/*<LoadingButton sx={{width:"50%", margin:"4px"}} color="info" size="large" type="submit" variant="contained" loading={isSubmitting}>*/}
//                     {/*    예약하기*/}
//                     {/*</LoadingButton>*/}
//                     <LoadingButton
//                       sx={{ width: "50%", margin: "4px" }}
//                       color="info"
//                       size="large"
//                       type="submit"
//                       variant="contained"
//                       // onClick={methods.handleSubmit(onSubmit)}
//                     >
//                       예약하기
//                     </LoadingButton>
//                   </Box>
//                 </Stack>
//               </Grid>
//             </Grid>
//             <div>
//               <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>예약하시겠습니까?</DialogTitle>
//                 {/*
//                 <DialogContent>
//                   <DialogContentText id="alert-dialog-description">
//                     {selectedRoom}
//                     {"  ("}
//                     {`${reserveStartDate.getFullYear()}/${
//                       reserveStartDate.getMonth() + 1
//                     }/${reserveStartDate.getDate()}`}
//                     {","}
//                     {reserveTime}
//                     {")  "}
//                   </DialogContentText>
//                 </DialogContent> */}
//                 <DialogContent>
//                   <Typography style={{ color: "red" }}>
//                     {selectedRoom}
//                   </Typography>
//                   <Typography style={{ color: "blue" }}>
//                     {`${reserveStartDate.getFullYear()}/${
//                       reserveStartDate.getMonth() + 1
//                     }/${reserveStartDate.getDate()}`}
//                   </Typography>
//                   <Typography style={{ color: "green" }}>
//                     {reserveTime.join(", ")}
//                   </Typography>
//                 </DialogContent>

//                 <DialogActions>
//                   <Button color="error" onClick={handleClose} autoFocus>
//                     취소
//                   </Button>
//                   <Button onClick={handleApply}>예약</Button>
//                 </DialogActions>
//               </Dialog>
//             </div>
//           </FormProvider>
//         </>
//       ) : (
//         <>
//           <FormControlLabel
//             control={<Checkbox onChange={handleChange} />}
//             label="내 정보 불러오기"
//           />
//           <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={12}>
//                 <Stack spacing={3}>
//                   {checked && siteUser ? (
//                     <>
//                       <RHFTextField
//                         name="groupName"
//                         ph={group}
//                         label="모임명"
//                       />
//                       <RHFTextField
//                         name="groupPurpose"
//                         ph={purpose}
//                         label="대여목적"
//                       />
//                       <RHFTextField
//                         name="name"
//                         ph={reservation}
//                         label="신청인 이름"
//                       />
//                       <RHFTextField
//                         name="number"
//                         ph={number}
//                         label="신청인 번호"
//                       />
//                       <RHFTextField
//                         name="answer1"
//                         ph={"김광, 장소연"}
//                         label="관련 교수"
//                       />
//                     </>
//                   ) : (
//                     <>
//                       <RHFTextField name="groupName" ph={""} label="모임명" />
//                       <RHFTextField
//                         name="groupPurpose"
//                         ph={""}
//                         label="대여목적"
//                       />
//                       <RHFTextField
//                         name="name"
//                         ph={username}
//                         label="신청인 이름"
//                       />
//                       <RHFTextField
//                         name="number"
//                         ph={"010-3453-3939"}
//                         label="신청인 번호"
//                       />
//                       <RHFTextField name="answer1" ph={""} label="관련 교수" />
//                     </>
//                   )}

//                   <Stack
//                     spacing={{ xs: 2, sm: 3 }}
//                     direction={{ xs: "column", sm: "row" }}
//                   >
//                     <RHFTextField
//                       name="reserveStartDate"
//                       fullWidth
//                       ph={
//                         `${reserveStartDate.getFullYear()}/${
//                           reserveStartDate.getMonth() + 1
//                         }/${reserveStartDate.getDate()}` +
//                         " ~ " +
//                         `${reserveEndDate.getFullYear()}/${
//                           reserveEndDate.getMonth() + 1
//                         }/${reserveEndDate.getDate()}` +
//                         " (" +
//                         `${dayNames}` +
//                         ")"
//                       }
//                       // value={`${reserveStartDate.getFullYear()}/${
//                       //     reserveStartDate.getMonth() + 1
//                       // }/${reserveStartDate.getDate()}`}
//                       label={"예약 날짜"}
//                     />
//                     <RHFTextField
//                       fullWidth
//                       name="reserveTime"
//                       ph={reserveTime}
//                       value={reserveTime}
//                       label={"예약 시간"}
//                     />
//                   </Stack>

//                   <Box sx={{ display: "flex" }}>
//                     <Button
//                       sx={{ width: "50%", margin: "4px" }}
//                       color="secondary"
//                       variant={"contained"}
//                       size={"large"}
//                       onClick={moveBefore}
//                     >
//                       뒤로가기
//                     </Button>
//                     <LoadingButton
//                       sx={{ width: "50%", margin: "4px" }}
//                       color="info"
//                       size="large"
//                       type="submit"
//                       variant="contained"
//                     >
//                       예약하기
//                     </LoadingButton>
//                   </Box>
//                 </Stack>
//               </Grid>
//             </Grid>
//             <div>
//               <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>예약하시겠습니까?</DialogTitle>

//                 <DialogContent>
//                   <Typography style={{ color: "red" }}>
//                     {selectedRoom}
//                   </Typography>
//                   <Typography style={{ color: "blue" }}>
//                     {`${reserveStartDate.getFullYear()}/${
//                       reserveStartDate.getMonth() + 1
//                     }/${reserveStartDate.getDate()}\n`}
//                     {"~ "}
//                     {`${reserveEndDate.getFullYear()}/${
//                       reserveEndDate.getMonth() + 1
//                     }/${reserveEndDate.getDate()}\n`}
//                   </Typography>
//                   <Typography style={{ color: "green" }}>
//                     {reserveTime.join(", ")}
//                   </Typography>
//                 </DialogContent>

//                 <DialogActions>
//                   <Button color="error" onClick={handleClose} autoFocus>
//                     취소
//                   </Button>
//                   <Button onClick={handleApply}>예약</Button>
//                 </DialogActions>
//               </Dialog>
//             </div>
//           </FormProvider>
//         </>
//       )}
//     </>
//   );
// }
