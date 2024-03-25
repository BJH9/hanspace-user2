import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { getSiteByLink } from 'src/api/site';
import { getSiteUserInfo } from 'src/api/GoogleUser';

import OneTimeReservation from './OneTimeReservation';
import AllReservation from './AllReservation';
import RoutineReservation from './RoutineReservation';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NavTabs({
  user,
  setUser,
  siteUser,
  setSiteUser,
  site,
  setSite,
  login,
  setLogin,
}) {
  const { link } = useParams();
  useEffect(() => {
    if (link) {
      async function fetchSite() {
        await getSiteByLink(link).then(function (data) {
          if (sessionStorage.getItem('site') === null) {
            setSite(data);
            sessionStorage.setItem('site', JSON.stringify(data));
            if (sessionStorage.getItem('user') !== null) {
              setUser(JSON.parse(sessionStorage.getItem('user')));
              setLogin(true);
              getSiteUserInfo(JSON.parse(sessionStorage.getItem('user')).id, data.id).then(
                function (data) {
                  sessionStorage.setItem('usersavedinfo', JSON.stringify(data));
                  setSiteUser(data);
                  console.log(data);
                  if (data.status === 1 || data.status === 3) {
                    alert('미승인 사용자입니다');
                    navigate(`/Hanspace/${site.link}`);
                  } else if (data.authority !== 1 && data.authority !== 2) {
                    alert('접근권한이 없습니다');
                    navigate(`/Hanspace/${site.link}`);
                  }
                },
              );
            }
          } else {
            var s = JSON.parse(sessionStorage.getItem('site'));
            if (data.link != s.link) {
              setSite(data);
              sessionStorage.setItem('site', JSON.stringify(data));

              if (sessionStorage.getItem('user') !== null) {
                console.log('sessionStorage.getItem(site) !== null');
                setUser(JSON.parse(sessionStorage.getItem('user')));
                setLogin(true);
                getSiteUserInfo(JSON.parse(sessionStorage.getItem('user')).id, data.id).then(
                  function (data) {
                    sessionStorage.setItem('usersavedinfo', JSON.stringify(data));
                    setSiteUser(data);
                    console.log(data);
                    if (data.status === 1 || data.status === 3) {
                      alert('미승인 사용자입니다');
                      navigate(`/Hanspace/${site.link}`);
                    }
                  },
                );
              }
            } else {
              setSite(data);
              if (sessionStorage.getItem('user') !== null) {
                console.log('sessionStorage.getItem(site) !== null');
                setUser(JSON.parse(sessionStorage.getItem('user')));
                setLogin(true);
                getSiteUserInfo(JSON.parse(sessionStorage.getItem('user')).id, data.id).then(
                  function (data) {
                    sessionStorage.setItem('usersavedinfo', JSON.stringify(data));
                    setSiteUser(data);
                    console.log(data);
                    if (data.status === 1 || data.status === 3) {
                      alert('미승인 사용자입니다');
                      navigate(`/Hanspace/${site.link}`);
                    }
                  },
                );
              }
            }
          }
        });
      }
      fetchSite();
    }
  }, [link]);

  useEffect(() => {
    if (user && site && !siteUser) {
      getSiteUserInfo(user.id, site.id).then(function (data) {
        sessionStorage.setItem('usersavedinfo', JSON.stringify(data));
        setSiteUser(data);
        console.log(data);
        if (data.status === 1 || data.status === 3) {
          alert('미승인 사용자입니다');
          navigate(`/Hanspace/${site.link}`);
        } else if (data.authority !== 1 && data.authority !== 2) {
          alert('접근권한이 없습니다');
          navigate(`/Hanspace/${site.link}`);
        }
      });
    }
  }, [user]);

  const NavToHome = () => {
    if (site) {
      if (siteUser) {
        if (siteUser.authority !== 1 && siteUser.authority !== 2) {
          alert('접근권한이 없습니다');
          navigate(`/Hanspace/${site.link}`);
        }
      }
      if (!login && !user) {
        alert('접근권한이 없습니다');
        navigate(`/Hanspace/${site.link}`);
      }
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    NavToHome();
  }, []);
  useEffect(() => {
    NavToHome();
  }, [site]);
  useEffect(() => {
    if (!login && sessionStorage.getItem('usersavedinfo') === null) NavToHome();
  }, [login]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (site) {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            sx={{ ml: '8rem' }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="전체 대여" {...a11yProps(0)} />
            <Tab label="일회 대여" {...a11yProps(1)} />
            <Tab label="정기 대여" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <AllReservation site={site}></AllReservation>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OneTimeReservation site={site}></OneTimeReservation>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RoutineReservation site={site}></RoutineReservation>
        </TabPanel>
      </Box>
    );
  }
}
