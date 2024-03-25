import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CalendarCSS.css';
import styled from '@emotion/styled';
import { Box, Button, Grid } from '@mui/material';
import { getReservedListCal } from 'src/api/reserve';

const CalButtonStyle = styled.button`
  border-color: ${(props) => props.color};
  min-width: 70px;
  font-weight: bold;
  background: ${(props) => {
    if (props.clicked) {
      return `${props.color}`;
    }
    return '#ffffff';
  }};
  border-radius: 2;
  margin-right: 1em;
`;

const colors = ['#fff3aa', '#ffd0a8', '#ffb1b1', '#d9d1ff', '#b7efff'];
var rooms = [];
var buttons = {};
var filteredEvents = [];
export function ReservationCal2({ checks, roomList, site, handleCalenderOpen }) {
  const [reservationData, setReservationData] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [initFinsh, setInitFinish] = useState(false);

  useEffect(() => {
    getReservedListCal(site.id).then(function (data) {
      setEventList(data);
    });
  }, []);
  useEffect(() => {
    initCalendarData();
  }, [eventList]);

  const initCalendarData = async () => {
    await settingStates();
    setInitFinish(true);
    updateData();
  };

  const settingStates = async () => {
    for (var i = 0; i < roomList.length; i++) {
      addRooms(roomList[i]);
      addChecks(roomList[i]);
      addButton(roomList[i]);
    }
    filterEventsTime();
    buttons['All'] = {
      text: 'All',
      click: function () {
        const settingValue = !checks[rooms[0]];
        for (var i = 0; i < rooms.length; i++) {
          checks[rooms[i]] = settingValue;
        }
        updateData();
      },
    };
  };

  const filterEventsTime = () => {
    filteredEvents = [];
    for (var i = 0; i < eventList.length; i++) {
      var temp = {
        id: eventList[i].id,
        roomId: eventList[i].roomId,
        roomName: eventList[i].roomName,
        userId: eventList[i].userId,
        groupName: eventList[i].groupName,
        purpose: eventList[i].purpose,
        reservationName: eventList[i].reservationName,
        contact: eventList[i].contact,
        status: eventList[i].status,
        content: eventList[i].content,
        regular: eventList[i].regular,
        regularId: eventList[i].regularId,
      };
      for (var j = 0; j < eventList[i].timeRecord.length; j++) {
        var temp2 = Object.assign({}, temp);
        var s = new Date(eventList[i].start);
        s.setHours(0);
        s.setMilliseconds(0);
        s.setSeconds(0);
        s.setMinutes(0);
        var e = new Date(eventList[i].start);
        e.setHours(0);
        e.setMilliseconds(0);
        e.setSeconds(0);
        e.setMinutes(0);

        s.setMinutes(eventList[i].timeRecord[j].startTime);
        e.setMinutes(eventList[i].timeRecord[j].endTime);
        temp2['start'] = s;
        temp2['end'] = e;
        console.log(temp2);
        filteredEvents.push(temp2);
      }
    }
  };
  const updateData = () => {
    var tempReservationData = [];
    for (var i = 0; i < filteredEvents.length; i++) {
      if (checks[filteredEvents[i].roomId]) {
        tempReservationData.push(filteredEvents[i]);
      }
    }
    setReservationData(tempReservationData);
  };

  const addRooms = (room) => {
    rooms.push(room.id);
  };

  const addChecks = (room) => {
    var key = `${room.id}`;
    checks[key] = true;
  };

  const addButton = (room) => {
    var key = `${room.id}`;
    var obj = {
      text: `${room.roomName}`,
      click: function () {
        checks[key] = !checks[key];
        updateData();
      },
    };
    buttons[key] = obj;
  };

  // a custom render function
  function renderReservationContent(reservationInfo) {
    reservationInfo.borderColor = 'white';
    reservationInfo.backgroundColor = colors[reservationInfo.event.extendedProps.roomId % 5];
    return (
      <>
        <Box
          sx={{
            backgroundColor: `${colors[reservationInfo.event.extendedProps.roomId % 5]}`,
            color: 'black',
            fontSize: '2px',
            fontStyle: 'normal',
            fontWeight: 'bold',
          }}
        >
          <i>{reservationInfo.event.extendedProps.roomName}</i>
        </Box>
      </>
    );
  }

  const makeButton = (room) => {
    return (
      <CalButtonStyle
        clicked={checks[room.id]}
        color={colors[room.id % 5]}
        onClick={() => {
          checks[room.id] = !checks[room.id];
          updateData();
        }}
      >
        {room.roomName}
      </CalButtonStyle>
    );
  };

  const ControlButtons = () => {
    var ret = [];
    for (var i = 0; i < roomList.length; i++) {
      var tempBut = makeButton(roomList[i]);
      ret.push(tempBut);
    }
    return ret;
  };
  function leftPad(value) {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  }
  function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
  }
  function toStringByFormattingTime(start, end, delimiter = '~') {
    const startHour = start.getHours();
    const startMinutes = leftPad(start.getMinutes());
    const endHour = end.getHours();
    const endMinutes = leftPad(end.getMinutes());

    return [[startHour, startMinutes].join(':'), [endHour, endMinutes].join(':')].join(delimiter);
  }
  return (
    <>
      {initFinsh ? (
        <>
          <Box container sx={{ p: 1 }}>
            <Grid container justifyContent={'right'}>
              <Button onClick={handleCalenderOpen} sx={{ color: 'black', fontWeight: 'bold' }}>
                닫기
              </Button>
            </Grid>
            <Grid container spacing={1} justifyContent={'center'}>
              <CalButtonStyle
                color={'#000000'}
                onClick={() => {
                  const settingValue = !checks[rooms[0]];
                  for (var i = 0; i < rooms.length; i++) {
                    checks[rooms[i]] = settingValue;
                  }
                  updateData();
                }}
              >
                All
              </CalButtonStyle>
              <ControlButtons />
            </Grid>

            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                end: 'prev today next',
                center: 'title',
                start: 'dayGridMonth timeGridWeek',
              }}
              height={'80vh'}
              customButtons={buttons}
              initialView="dayGridMonth"
              weekends={true}
              events={reservationData}
              dayMaxEventRows={2}
              moreLinkClick="popover"
              eventContent={renderReservationContent}
              slotMinTime={'08:00:00'}
              slotMaxTime={'23:00:00'}
              eventDidMount={(info) => {
                return new bootstrap.Popover(info.el, {
                  title: info.event.extendedProps.groupName,
                  placement: 'auto',
                  trigger: 'hover',
                  customClass: 'popoverStyle',
                  content: `
            <p>
            ${toStringByFormatting(info.event.start)}
            <br />
            ${toStringByFormattingTime(info.event.start, info.event.end)}
            </p>
            <p>
            장소명: ${info.event.extendedProps.roomName}
            </p>
            <p>
            담당교수: ${info.event.extendedProps.content}
            </p>
            `,
                  html: true,
                });
              }}
            />
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
