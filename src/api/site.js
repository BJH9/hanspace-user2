import axios from 'axios';

export const getSiteByLink = async (link) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/site/getSiteByLink/${link}`,
  );
  return response.data;
};

export const saveSiteInfo = async (file) => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/upload/test`, {
    params: {
      file: file,
    },
  });
  return response.data;
};

export const editSiteInf = async (info) => {
  console.log("info");
  console.log(info);
  const response = await axios.put(
    `http://localhost:8080/api/site/editSiteInfo`,
    info,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};
