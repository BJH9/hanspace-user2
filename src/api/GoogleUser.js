import axios from 'axios';

export const getUserByEmail = async (request) => {
  const body = {
    email: request.email,
    name: request.name,
  };
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/user/findElseSignUp`,
    body,
  );
  return response.data;
};

export const getSiteUserInfo = async (userId, siteId) => {
  const body = {
    userId: `${userId}`,
    siteId: `${siteId}`,
  };
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/saved/findSiteUserInfo`,
    body,
  );
  return response.data;
};

export const editSiteUserInfo = async (request) => {
  const body = {
    groupName: request.groupName,
    purpose: request.purpose,
    reservation: request.reservation,
    contact: request.contact,
  };
  const response = await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/api/saved/editSavedUserInfo/${request.id}`,
    body,
  );
  console.log('EDIT API');
  console.log(response.data);
  return response.data;
};
