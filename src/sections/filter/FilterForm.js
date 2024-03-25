import { m } from "framer-motion";
// @mui
import {
  Button,
  Fab,
  Typography,
  TextField,
  Stack,
  Divider,
  Chip,
  Dialog,
  Paper,
  Box,
  Slider,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Container,
  Card,
  CardHeader,
  CardContent,
  useMediaQuery,
  Modal,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
// components
import {
  FabButtonAnimate,
  MotionViewport,
  varFade,
} from "../../components/animate";
import FilterDateRange from "../_examples/mui/pickers/FilterDateRange";
import FilterDate from "../_examples/mui/pickers/FilterDate";
import { useFilterDateRangePicker } from "../../components/date-range-picker";
import Iconify from "../../components/iconify";
import { fDateTime, fTimestamp } from "../../utils/formatTime";
import { useEffect, useRef, useState } from "react";
import { Block } from "../_examples/Block";
import FilterEcommerceShopPage from "src/pages/dashboard/FilterEcommerceShopPage";
import CardGrid from "./CardGrid";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { set } from "nprogress";
import OurReactHookForm from "../_examples/extra/form/OurReactHookForm";
import OurVerticalLinearStepper from "../_examples/mui/stepper/OurVerticalLinearStepper";
import OurHorizontalStepper from "../_examples/mui/stepper/OurHorizontalStepper";

import SecondFilter from "./SecondFilter";
// import HisSpaceCalendar from 'src/pages/dashboard/HisSpaceCalendar';
import { ReservationCalendar } from "./ReservationCalendar";
import { ReservationCal2 } from "./ReservationCal2";
import { getRooms } from "src/api/room";
import { getReservedListCal } from "src/api/reserve";
import BtnUpload from "src/components/FileUpload/BtnUpload";

// import FilterDateRange from '../_examples/mui/pickers/FilterDateRange';

// ----------------------------------------------------------------------

const radioStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  "& > *": { mx: 1 },
};

const floatButtonStyle = {
  margin: 0,
  top: "auto",
  right: 100,
  bottom: -65,
  left: "auto",
  position: "fixed",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CardArticle = styled(Box)({
  height: "auto",
  paddingBottom: 24,
});

const StepperWrapper = styled(Box)({
  // position: 'fixed',
  // top: "40%",
  // right: "10%",
});

const dayofweek = ["월", "화", "수", "목", "금", "토", "일"];

export default function FilterForm({
  user,
  login,
  site,
  link,
  siteUser,
  setSiteUser,
  setUser,
  setLogin,
  setReservable,
  reservable,
}) {
  const [people, setPeople] = useState(10);
  const [search, setSearch] = useState(false);
  const [tempStart, setTempStart] = useState(new Date());
  const [tempEnd, setTempEnd] = useState(new Date());
  const [reserveStartDate, setReserveStartDate] = useState(new Date());
  const [reserveEndDate, setReserveEndDate] = useState(new Date());
  const [openForm, setOpenForm] = useState(false);
  const [reserveOne, setReserveOne] = useState(true);
  const [time, setTime] = useState([0, 1440]);
  const [hours, setHours] = useState(30);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [reserveToday, setReserveToday] = useState(false);

  const [calendarOpen, setCalenderOpen] = useState(false);

  function valueTime(value) {
    if (value <= 0) return "";
    else {
    }
    return value > 0 ? `${value}0:00` : `${value}`;
  }
  function valueLabelFormatTime(value) {
    if (value % 60 !== 0) {
      return value > 0
        ? `${parseInt(value / 60)}:${parseInt(value % 60)}`
        : `${value}`;
    } else return value > 0 ? `${value / 60}:00` : `${value}0:00`;
  }

  const timestamps = [
    { value: 0, label: "00:00 AM" },
    { value: 180, label: "03:00 AM" },
    { value: 360, label: "06:00 AM" },
    { value: 540, label: "09:00 AM" },
    { value: 720, label: "12:00 PM" },
    { value: 900, label: "15:00 PM" },
    { value: 1080, label: "18:00 PM" },
    { value: 1260, label: "21:00 PM" },
    { value: 1440, label: "24:00 PM" },
  ];

  // 2차 필터 room name
  const [rooms, setRooms] = useState([
    { name: "NTH 219" },
    {
      name: "NTH 221",
    },
    {
      name: "NTH 222",
    },
    {
      name: "NTH 223",
    },
    {
      name: "NTH 220",
    },
  ]);

  // 2차 필터 tag name
  const [tags, setTags] = useState([
    {
      name: "스터디",
    },
    {
      name: "mt",
    },
    {
      name: "게임",
    },
    {
      name: "춤",
    },
  ]);

  // 2차 필터
  const [openSecondFilter, setOpenSecondFilter] = useState(false);

  // 2차 필터 open
  const handleOpenFilter = () => {
    setOpenSecondFilter(true);
  };

  // 2차 필터 close
  const handleCloseFilter = () => {
    setOpenSecondFilter(false);
  };

  // 2차 필터 name filter
  const [nameFilter, setNameFilter] = useState([]);

  // 2차 필터 tag filter
  const [tagFilter, setTagFilter] = useState([]);

  const [checked, setChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const stepTwo = useRef(null);
  const stepThree = useRef(null);
  const [reserveTime, setReserveTime] = useState([]);
  // const [steps, setSteps] = useState("stepOne");
  const [saveDate, setSaveDate] = useState(false);
  const scrollToRef = (position) => {
    // let position ={steps};

    // position.current.scrollIntoView({ behavior: 'smooth', block: 'end', });
    position.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleChangeTime = (event, newValue) => {
    if (reserveToday) {
      var currentTime =
        parseInt(
          (reserveStartDate.getHours() * 60 + reserveStartDate.getMinutes()) /
            site.timeUnit
        ) + 1;
      if (newValue[0] <= currentTime * site.timeUnit) {
        newValue[0] = currentTime * site.timeUnit;
      }
    }
    setTime(newValue);
  };
  const handleCheckValidFilter = () => {
    var days = Math.ceil(
      (reserveEndDate.getTime() - reserveStartDate.getTime()) / (1000 * 3600 * 24),
    );
    // console.log(days);
    for (var i = 0; i <= days; i++) {
      var temp = new Date(reserveStartDate);
      temp.setDate(reserveStartDate.getDate() + i);
      // console.log(temp);
      if (checked[temp.getDay()]) {
        // console.log(temp);
        // console.log('is ' + temp.getDay())
        return true;
      }
    }
    return false;
  };

  const searchResults = async () => {
    if (!reserveOne) {
      var cnt = 7;
      for (var i = 0; i < checked.length; i++) {
        if (checked[i]) cnt--;
      }
      if (reserveStartDate > reserveEndDate) {
        alert("종료날짜는 시작날짜 이후로 선택해주세요!");
        return;
      } else if (cnt === 7) {
        alert("요일을 선택하세요");
        return;
      }
      if (!handleCheckValidFilter()) {
        alert('선택기간에는 해당요일이 없습니다');
        return;
      }
    }
    setSearch(true);
    scrollToRef(stepTwo);
  };
  // const test = (d) => {
  //   setSteps();
  // }
  const useStyles = makeStyles((theme) => ({
    stepper: {
      position: "fixed",
      top: "40%",
      right: "10%",
      zIndex: "1",
    },
    mobileStepper: {
      position: "fixed",
      bottom: "10%",
      left: "25%",
      width: "50%",
      zIndex: "1",
    },
  }));
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleCalenderOpen = () => {
    setCalenderOpen(!calendarOpen);
  };

  const [checks, setChecks] = useState({});
  const [reservationData, setReservationData] = useState();
  // var Calrooms = [];
  // var buttons = {};
  // var filteredEvents = [];

  const [r, setR] = useState([]);
  const [init, setInit] = useState(false);

  const resetInit = async () => {
    setInit(false);
  };
  const loadRoom = async (sid) => {
    await resetInit();
    getRooms(sid).then(function (data) {
      setR(data);
      setInit(true);
      console.log(data);
    });
  };

  useEffect(() => {
    if (link === site.link) {
      loadRoom(site.id);
      setHours(site.timeUnit);
      // setUser();
      setSiteUser();
      // sessionStorage.removeItem('user');
      sessionStorage.removeItem("usersavedinfo");
      // setLogin(false);
    }
  }, [site]);

  const handleToday = () => {
    var today = new Date();
    var target = reserveStartDate;
    if (
      today.getFullYear() === target.getFullYear() &&
      today.getDate() === target.getDate() &&
      today.getDay() === target.getDay()
    ) {
      // console.log(reserveStartDate.getHours());
      setReserveToday(true);
    } else setReserveToday(false);
  };

  useEffect(() => {
    if (reserveOne) {
      handleToday();
    }
  }, [reserveStartDate]);
  useEffect(() => {
    if (reserveOne) {
      handleToday();
    }
  }, [reserveEndDate]);

  useEffect(() => {
    if (reserveToday) {
      var currentTime =
        parseInt(
          (reserveStartDate.getHours() * 60 + reserveStartDate.getMinutes()) /
            site.timeUnit
        ) + 1;
      var newValue = time;
      newValue[0] = currentTime * site.timeUnit;
      setTime(newValue);
    } else {
      setTime([0, 1440]);
    }
  }, [reserveToday]);

  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  return (
    <>
      {/* <BtnUpload file={file} setFile={setFile} imageUrl={imageUrl} setImageUrl={setImageUrl} /> */}
      {init && site ? (
        <>
          <Grid component={MotionViewport} container spacing={2}>
            <Grid xs={12}>
              {init && r ? (
                <>
                  <Fab
                    sx={{
                      position: "fixed",
                      right: 80,
                      left: "auto",
                      top: "auto",
                      bottom: 19,
                      backgroundColor: "#232f3e",
                    }}
                    onClick={handleCalenderOpen}
                  >
                    캘린더
                  </Fab>

                  <Dialog open={calendarOpen} fullWidth maxWidth={"lg"}>
                    <ReservationCal2
                      reservationData={reservationData}
                      setReservationData={setReservationData}
                      checks={checks}
                      handleCalenderOpen={handleCalenderOpen}
                      roomList={r}
                      site={site}
                    ></ReservationCal2>
                  </Dialog>
                </>
              ) : (
                <></>
              )}
            </Grid>

            <Grid xs={12}>
              <Item>
                <m.div variants={varFade().inUp}>
                  <Typography variant="h1">{site.name}</Typography>
                  <Typography variant="p">{site.description}</Typography>
                </m.div>
              </Item>
              <Divider sx={{ mt: 5, mb: 10 }}>
                <Chip
                  size="large"
                  label="Step 1"
                  variant="outlined"
                  color="secondary"
                />
                <Typography variant="p"> 대여종류</Typography>
              </Divider>

              <Item>
                <FormControl component="fieldset">
                  <RadioGroup row defaultValue="top">
                    <FormControlLabel
                      onChange={(event) => {
                        setReserveOne(event.target.checked);
                        setSearch(false);
                        handleToday();
                      }}
                      color="secondary"
                      checked={reserveOne}
                      label={"일회대여"}
                      control={<Radio />}
                      sx={{ textTransform: "capitalize" }}
                    />
                    <FormControlLabel
                      onChange={(event) => {
                        setReserveOne(!event.target.checked);
                        if (event.target.checked) {
                          setTime([0, 1440]);
                          setReserveToday(false);
                        }
                        setSearch(false);
                      }}
                      color="secondary"
                      checked={!reserveOne}
                      label={"정기대여"}
                      control={<Radio />}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </RadioGroup>
                </FormControl>
              </Item>
              <Box
                container
                sx={{ textAlign: { xs: "center", md: "center" }, mb: 5 }}
              >
                {reserveOne ? (
                  <>
                    <Typography variant="p">
                      {" "}
                      대여날짜, 사용시간, 사용인원을 입력하세요
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="p">
                      {" "}
                      대여기간, 사용시간, 요일, 사용인원을 입력하세요
                    </Typography>
                  </>
                )}
              </Box>
            </Grid>

            <Grid
              xs={12}
              sx={{ typography: "body2", mt: 1, alignItems: "center" }}
            >
              <Item>
                <FilterDate
                  reserveOne={reserveOne}
                  setReserveOne={setReserveOne}
                  reserveStartDate={reserveStartDate}
                  setReserveStartDate={setReserveStartDate}
                  reserveEndDate={reserveEndDate}
                  setReserveEndDate={setReserveEndDate}
                  people={people}
                  search={search}
                  setSearch={setSearch}
                  site={site}
                  setPeople={setPeople}
                  checked={checked}
                  setChecked={setChecked}
                  hour={hours}
                  setHour={setHours}
                />
              </Item>
            </Grid>
            <Grid xs={12}>
              <Box sx={{ width: "100%", pl: 5, pr: 7 }}>
                <Slider
                  scale={(x) => x}
                  color="secondary"
                  step={site.timeUnit}
                  min={0}
                  max={1440}
                  marks={timestamps}
                  value={time}
                  onChange={handleChangeTime}
                  valueLabelDisplay="on"
                  getAriaValueText={valueTime}
                  valueLabelFormat={valueLabelFormatTime}
                />
              </Box>
            </Grid>
            <div ref={stepTwo}></div>
            <Grid xs={12}>
              {search ? (
                <></>
              ) : (
                <>
                  {reserveOne ? (
                    <>
                      <Item>
                        <Button
                          size="large"
                          color="secondary"
                          variant="contained"
                          onClick={() => {
                            searchResults();
                            scrollToRef(stepTwo);
                          }}
                        >
                          조회하기
                        </Button>
                      </Item>
                    </>
                  ) : (
                    <>
                      <Item>
                        <Button
                          size="large"
                          variant="contained"
                          onClick={() => {
                            searchResults();
                          }}
                        >
                          조회하기
                        </Button>
                      </Item>
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          <Grid xs={12}>
            <br />
            <br />
            <br />

            {search ? (
              <>
                <Divider sx={{ mb: 7 }}>
                  <Chip
                    size="large"
                    label="Step 3"
                    variant="outlined"
                    color="secondary"
                  />
                  <Typography variant="p"> 장소와 시간을 선택하세요</Typography>
                </Divider>
                <CardArticle>
                  {search ? (
                    <>
                      <CardGrid
                        setSelectedRoom={setSelectedRoom}
                        roomList={r}
                        time={time}
                        login={login}
                        people={people}
                        reserveOne={reserveOne}
                        hours={hours}
                        site={site}
                        reserveStartDate={reserveStartDate}
                        reserveEndDate={reserveEndDate}
                        daysOfWeek={checked}
                        nameFilter={nameFilter}
                        tagFilter={tagFilter}
                        setOpenForm={setOpenForm}
                        setReserveTime={setReserveTime}
                        scrollToRef={scrollToRef}
                        info={stepThree}
                        reservable={reservable}
                        setReservable={setReservable}
                        siteUser={siteUser}
                      ></CardGrid>
                    </>
                  ) : (
                    <></>
                  )}
                  <div ref={stepThree}></div>
                  <br />
                  <br /> <br />
                </CardArticle>
              </>
            ) : (
              <></>
            )}
          </Grid>
          <br />
          <br />
          <br />
          <Grid xs={12}>
            {openForm ? (
              <>
                <Divider>
                  <Chip
                    size="large"
                    label="Step 4"
                    variant="outlined"
                    color="secondary"
                  />
                  <Typography variant="p"> 예약 정보를 입력하세요.</Typography>
                </Divider>
                <Container sx={{ my: 10 }}>
                  <Card>
                    <CardHeader title="예약자 정보 입력" />
                    <CardContent>
                      <OurReactHookForm
                        site={site}
                        selectedRoom={selectedRoom}
                        weekdays={checked}
                        reserveOne={reserveOne}
                        reserveStartDate={reserveStartDate}
                        reserveEndDate={reserveEndDate}
                        reserveTime={reserveTime}
                        scrollToRef={scrollToRef}
                        stepTwo={stepTwo}
                        link={link}
                        siteUser={siteUser}
                      />
                    </CardContent>
                  </Card>
                </Container>
              </>
            ) : (
              <></>
            )}
          </Grid>
          <Block sx={floatButtonStyle}>
            {search ? (
              <SecondFilter
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                open={openSecondFilter}
                rooms={r}
                tags={tags}
                setNameFilter={setNameFilter}
                nameFilter={nameFilter}
                setTagFilter={setTagFilter}
                tagFilter={tagFilter}
              />
            ) : (
              <></>
            )}
          </Block>
          <Box sx={{ height: "500px" }}></Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
