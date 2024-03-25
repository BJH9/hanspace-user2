import axios from "axios";

export const getReservedListCal = async (siteId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/calendarList/${siteId}`
  );
  return response.data;
};

export const reserve = async (info) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/reserveRoom`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const reserveRegular = async (info) => {
  console.log("infO~" + info);
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/reserveRegularRoom`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const getAllReserved = async (siteId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/allReservedList/${siteId}`
  );
  return response.data;
};

// export const getOneReserved = async (siteId) => {
//   const response = await axios.get(
//     `http://localhost:8080/api/reserve/allReservedList/${siteId}`
//   );
//   return response.data;
// };

export const getRegularReserved = async (siteId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/getAllReservedRecord`,
    {
      params: {
        siteId: siteId,
      },
    }
  );
  return response.data;
};

export const getOneReserved = async (siteId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/oneReservedList/${siteId}`
  );
  return response.data;
};

// export const approve = async (siteId) => {
//   const response = await axios.get(
//     `http://localhost:8080/api/reserve/oneReservedList/${siteId}`
//   );
//   return response.data;
// };

export const changeStatus = async (info) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/changeStatus`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const changeRegularStatus = async (info) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/changeRegularStatus`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const deleteMultiRecord = async (siteId, recordList) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/deleteMultiReserve`,
    {
      data: {
        siteId: siteId,
        recordList: recordList,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const deleteOneRecord = async (siteId, recordId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/deleteReserve`,
    {
      data: {
        siteId: siteId,
        recordId: recordId,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const changeMultiStatus = async (info) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/changeMultiStatus`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const getUserList = async (siteId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/saved//readUserList/${siteId}`
  );
  return response.data;
};

export const changeUserStatus = async (info) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/api/saved/changeUserStatus`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const deleteOneUser = async (siteId, userId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/saved/deleteUser`,
    {
      data: {
        siteId: siteId,
        userId: userId,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const deleteMultiUser = async (siteId, userList) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/saved/deleteMultiUser`,
    {
      data: {
        siteId: siteId,
        userList: userList,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const changeMultiUserStatus = async (info) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/api/saved/changeMultiUserStatus`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const changeMultiRegularStatus = async (info) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/changeMRegularStatus`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const deleteRegularReserve = async (siteId, recordId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/deleteRegularReserve`,
    {
      data: {
        siteId: siteId,
        recordId: recordId,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const deleteMultiRegular = async (siteId, recordList) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/deleteMultiRegular`,
    {
      data: {
        siteId: siteId,
        recordList: recordList,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const readEachRegularRecord = async (siteId, regularId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/eachReservedList`,
    {
      params: {
        siteId: siteId,
        regularId: regularId,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const getRemainTime = async (siteId, userId, date) => {
  console.log("내부");
  console.log(siteId);
  console.log(userId);
  console.log(date);
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/getRemainTime`,
    {
      params: {
        siteId: siteId,
        userId: userId,
        date: date,
      },
    }
  );
  console.log(response);
  return response.data;
};

export const getRemainRegularTime = async (
  siteId,
  userId,
  startDate,
  endDate
) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/reserve/getRemainRegularTime`,
    {
      params: {
        siteId: siteId,
        userId: userId,
        startDate: startDate,
        endDate: endDate,
      },
    }
  );
  return response.data;
};
