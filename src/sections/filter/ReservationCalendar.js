import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';

// import 'bootstrap/dist/css/bootstrap.css';
// import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import styled from '@emotion/styled';
// import './Buttoncss.css';
import { Box, Typography, Button } from '@mui/material';

// export const StyleWrapper = styled.div`
//   .fc-button.fc-prev-button,
//   .fc-button.fc-next-button,
//   .fc-button.fc-button-primary {
//     background: red;
//     background-image: none;
//   }
// `;

// export const StyleWrapper = styled.div`
//   .fc-button {
//     background: blue;
//     background-image: none;
//   }
// `;

const colors = ['#fff3aa', '#ffd0a8', '#ffb1b1', '#d9d1ff', '#b7efff'];
// const reservationData = [];
const events = [
  {
    id: 1,
    roomId: 1,
    userId: 1,
    groupName: '홍방이캡스톤',
    purpose: '캡스톤 회의',
    start: '2023-04-10',
    reservationName: '홍성헌',
    contact: '010-7507-2099',
    status: 2,
    content: '지도교수: 김광/장소연',
    regular: true,
    regularId: '1234',
    timeRecord: [
      {
        startDate: '2023-04-10',
        time: 10,
      },
      {
        startDate: '2023-04-10',
        time: 11,
      },
    ],
  },
  {
    id: 2,
    roomId: 2,
    userId: 3,
    groupName: '배정송캡스톤',
    start: '2023-04-10',
    purpose: '와랩 QR 캡스톤 회의',
    reservationName: '배주영',
    contact: '010-1111-1111',
    status: 2,
    content: '지도교수: 김광/장소연',
    regular: true,
    regularId: 'f222',
    timeRecord: [
      {
        startDate: '2023-04-10',
        time: 8,
      },
      {
        startDate: '2023-04-10',
        time: 9,
      },
      {
        startDate: '2023-04-10',
        time: 10,
      },
    ],
  },
  {
    id: 3,
    roomId: 1,
    userId: 1,
    groupName: '홍방이캡스톤',
    start: '2023-04-13',
    purpose: '캡스톤 회의',
    reservationName: '홍성헌',
    contact: '010-7507-2099',
    status: 2,
    content: '지도교수: 김광/장소연',
    regular: true,
    regularId: '1234',
    timeRecord: [
      {
        startDate: '2023-04-13',
        time: 10,
      },
      {
        startDate: '2023-04-13',
        time: 11,
      },
    ],
  },
  {
    id: 4,
    roomId: 3,
    userId: 1,
    groupName: '와랩 공프기',
    start: '2023-04-12',
    purpose: '캡스톤 회의',
    reservationName: '홍성헌',
    contact: '010-7507-2099',
    status: 2,
    content: '지도교수: 김광/장소연',
    regular: true,
    regularId: '9234',
    timeRecord: [
      {
        startDate: '2023-04-12',
        time: 10,
      },
      {
        startDate: '2023-04-12',
        time: 11,
      },
    ],
  },
  {
    id: 5,
    roomId: 3,
    userId: 1,
    groupName: '김광교수님 미팅',
    start: '2023-04-14',
    purpose: '캡스톤 회의',
    reservationName: '홍성헌',
    contact: '010-7507-2099',
    status: 2,
    content: '지도교수: 김광/장소연',
    regular: true,
    regularId: 'a234',
    timeRecord: [
      {
        startDate: '2023-04-14',
        time: 10,
      },
      {
        startDate: '2023-04-14',
        time: 11,
      },
    ],
  },
  {
    id: 6,
    roomId: 4,
    userId: 1,
    groupName: '장소연교수님 미팅',
    start: '2023-04-15',
    purpose: '캡스톤 회의',
    reservationName: '홍성헌',
    contact: '010-7507-2099',
    status: 2,
    content: '지도교수: 김광/장소연',
    regular: true,
    regularId: 'c234',
    timeRecord: [
      {
        startDate: '2023-04-15',
        time: 10,
      },
      {
        startDate: '2023-04-15',
        time: 11,
      },
    ],
  },
  {
    id: 7,
    roomId: 4,
    userId: 1,
    groupName: '장소연교수님 미팅',
    start: '2023-04-20',
    purpose: '캡스톤 회의',
    reservationName: '홍성헌',
    contact: '010-7507-2099',
    status: 2,
    content: '지도교수: 김광/장소연',
    regular: true,
    regularId: 'c234',
    timeRecord: [
      {
        startDate: '2023-04-20',
        time: 10,
      },
      {
        startDate: '2023-04-20',
        time: 11,
      },
    ],
  },
  {
    id: 8,
    roomId: 5,
    userId: 1,
    groupName: '총장님 미팅',
    start: '2023-04-18',
    purpose: '캡스톤 회의',
    reservationName: '홍성헌',
    contact: '010-7507-2099',
    status: 2,
    content: '지도교수: 김광/장소연',
    regular: false,
    regularId: '3234',
    timeRecord: [
      {
        startDate: '2023-04-18',
        time: 10,
      },
      {
        startDate: '2023-04-18',
        time: 11,
      },
    ],
  },
];

// const events = [
//   // { groupName: 'Captone 1', start: new Date() },
//   { groupName: 'Captone 1', date: '2023-04-09' },
//   { groupName: 'Captone 1', date: '2023-04-09' },
// ];

var rooms = [];
var buttons = {};
// var reservationData = [];

export function ReservationCalendar({ roomList, handleCalenderOpen }) {
  const [load, setLoad] = useState(false);
  // const [rooms, setRooms] = useState([]);
  const [checks, setChecks] = useState({});
  const [update, setUpdate] = useState(false);
  const [reservationData, setReservationData] = useState();
  // const [buttons, setButttons] = useState({});

  const addRooms = (room) => {
    // var temp = rooms;
    rooms.push(room.id);
    console.log(rooms);
    // setRooms(temp);
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
        // updateCalendarData();
        updateData();
      },
    };
    buttons[key] = obj;
  };
  const updateData = () => {
    var tempReservationData = [];
    for (var i = 0; i < events.length; i++) {
      if (checks[events[i].roomId]) {
        console.log(events[i]);
        tempReservationData.push(events[i]);
      }
    }
    // reservationData = tempReservationData;
    setReservationData(tempReservationData);
  };

  const settingStates = async () => {
    for (var i = 0; i < roomList.length; i++) {
      addRooms(roomList[i]);
      addChecks(roomList[i]);
      addButton(roomList[i]);
      console.log(checks);
    }
    updateData();
    buttons['All'] = {
      text: 'All',
      click: function () {
        const settingValue = !checks[rooms[0]];
        for (var i = 0; i < rooms.length; i++) {
          checks[rooms[i]] = settingValue;
        }
        console.log(checks);
        updateData();
      },
    };
  };

  const initCalendarData = async () => {
    await settingStates();
    setLoad(true);
  };

  useEffect(() => {
    initCalendarData();
  }, []);

  const resetRooms = async () => {
    rooms = [];
  };

  // const updateCalendarData = async () => {
  //   await resetRooms();
  //   for (var i = 0; i < roomList.length; i++) {
  //     if (checks[roomList[i].id]) {
  //       addRooms(roomList[i]);
  //     }
  //   }
  //   ssss();
  // };

  // useEffect(() => {
  //   updateCalendarData();
  // }, []);

  // const ssss = () => {
  //   console.log(rooms);
  //   console.log(rooms.join(' '));
  //   console.log(checks);
  //   console.log(buttons);
  //   console.log(reservationData);
  // };

  // useEffect(() => {
  //   updateButtons;
  // }, [rooms]);

  const handleDateClick = (arg) => {
    console.log(arg);
  };

  // function retReservationTime(times) {
  //   var ret = '';
  //   // for (var i = 0; i < times.length; i++) {
  //   //   if (i === times.length - 1) {
  //   //     ret = ret + times[i].time + '시';
  //   //   } else {
  //   //     ret = ret + times[i].time + '시, ';
  //   //   }
  //   // }
  //   console.log();
  //   return ret;
  // }

  // a custom render function
  function renderReservationContent(reservationInfo) {
    reservationInfo.textColor = 'black';
    reservationInfo.borderColor = 'black';
    if (reservationInfo.event.extendedProps.regular) {
      reservationInfo.backgroundColor =
        colors[parseInt(reservationInfo.event.extendedProps.regularId[0], 16) % 5];
    } else {
      reservationInfo.backgroundColor = colors[reservationInfo.event.extendedProps.id % 5];
    }
    // reservationInfo.backgroundColor = colors[reservationInfo.event.extendedProps.roomId % 5];

    return (
      <>
        {/* <b>{reservationInfo.timeText}</b> */}
        <i>{reservationInfo.event.extendedProps.groupName}</i>
      </>
    );
  }
  const handleStyle = (info) => {
    document.querySelectorAll('.fc-button').forEach((button) => {
      button.classList.add('custom-color');
    });
  };

  return (
    <Box container fullWidth sx={{ p: 2 }}>
      <Box container display="flex" justifyContent={'center'} fullWidth>
        <Typography variant="h1"> Schedule </Typography>
      </Box>
      {load ? (
        <>
          {/* <StyleWrapper> */}
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              end: 'prev today next',
              center: 'All ' + `${rooms.join(' ')}`,
              start: 'dayGridMonth dayGridWeek dayGridDay',
            }}
            height="auto"
            stickyHeaderDates
            customButtons={buttons}
            initialView="dayGridMonth"
            weekends={true}
            events={reservationData}
            dateClick={handleDateClick}
            eventContent={renderReservationContent}
          />
          {/* </StyleWrapper> */}
        </>
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              start: 'today prev next',
              center: 'myCustomButton',
              end: 'dayGridMonth dayGridWeek dayGridDay',
            }}
            customButtons={{
              myCustomButton: {
                text: 'Custom Button!',
                click: function () {
                  alert('clicked the custom button!');
                },
              },
            }}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            dateClick={handleDateClick}
            eventContent={renderReservationContent}
          />
        </>
      )}
    </Box>
  );
}
