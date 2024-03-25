import axios from 'axios';
export const getRooms = async (sid) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/room/roomList/${sid}`);
  return response.data;
};
