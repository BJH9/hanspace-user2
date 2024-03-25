import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

// @mui
import { Container, Box, Grid } from '@mui/material';
// sections
import { ManageRoomPage } from '../sections/manager';
import { CreateRoomModal } from '../sections/manager';
import { BanRoomModal } from '../sections/manager';
import axios from 'axios';
import { getSiteByLink } from 'src/api/site';
import { getSiteUserInfo } from 'src/api/GoogleUser';

export default function ManageRooms({
  user,
  setUser,
  siteUser,
  setSiteUser,
  site,
  setSite,
  login,
  setLogin,
}) {
  useEffect(() => {
    const fetchGetRooms = async () => {
      // const siteId = site.siteId;
      try {
        // console.log("siteId", { siteId });
        console.log('not site in room');
        if (site) {
          console.log('site in room');
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/room/find-rooms`,
            {
              params: {
                siteId: site.id,
                // site.Id,
                // { siteId },
                // `${siteId}`
              },
            },
          );
          setRoom(response.data);
          console.log('공간 전체 리스트 불러오기', response.data);
        }
      } catch (err) {
        console.log('공간 전체 리스트 불러오기 에러');
      }
    };
    const fetchGetSiteTags = async () => {
      // const siteId = site.siteId;
      try {
        // console.log("siteId", { siteId });
        if (site) {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/tag/site-tags`,
            {
              params: {
                siteId: site.id,
                // site.Id,
                // { siteId },
                // `${siteId}`
              },
            },
          );
          setTag(response.data);
          console.log('전체 태그 리스트 불러오기', response.data);
        }
      } catch (err) {
        console.log('전체 태그 리스트 불러오기 에러');
      }
    };
    fetchGetRooms();
    fetchGetSiteTags();
  }, [user]);
  const [room, setRoom] = useState([]);
  const [tag, setTag] = useState([]);
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
  return (
    <>
      <Container sx={{ py: 10 }}>
        <Box
          gap={1}
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <Grid container justifyContent="flex-end">
            <Box
              style={{
                display: 'flex',
                textAlign: 'right',
              }}
            >
              <Box>
                <BanRoomModal room={room} />
              </Box>
              <Box style={{ marginLeft: '20px' }}>
                <CreateRoomModal site={site} tag={tag} />
              </Box>
            </Box>
          </Grid>
          <div style={{ marginTop: '30px' }}></div>
          <ManageRoomPage room={room} tags={tag} />
        </Box>
      </Container>
    </>
  );
}
