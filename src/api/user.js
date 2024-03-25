import axios from "axios";

export const changeUserAuth = async (info) => {
  const response = await axios.put(
    `http://localhost:8080/api/saved/changeUserAuth`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};
