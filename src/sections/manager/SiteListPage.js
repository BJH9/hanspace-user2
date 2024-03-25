import React from 'react';
// @mui
import { Container, Box, Stack, Typography } from '@mui/material';
import FormProvider from '../../components/hook-form';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';

// sections
import { SiteList } from '../../sections/manager';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { getSiteByLink } from 'src/api/site';
import { getSiteUserInfo } from 'src/api/GoogleUser';

export default function SiteListPage({
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
            console.log('sessionStorage.getItem(site) === null');
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
                  if (data.status === 1) {
                    alert('미승인 사용자입니다');
                    navigate(`/Hanspace/${site.link}`);
                  }
                },
              );
            }
          } else {
            var s = JSON.parse(sessionStorage.getItem('site'));
            if (data.link != s.link) {
              console.log('data.link != s.link');
              setSite(data);
              sessionStorage.setItem('site', JSON.stringify(data));
              // setUser();
              // setSiteUser();
              // // setLogin(false);
              // // sessionStorage.removeItem('user');
              // sessionStorage.removeItem('usersavedinfo');
              if (sessionStorage.getItem('user') !== null) {
                console.log('sessionStorage.getItem(site) !== null');
                setUser(JSON.parse(sessionStorage.getItem('user')));
                setLogin(true);
                getSiteUserInfo(JSON.parse(sessionStorage.getItem('user')).id, data.id).then(
                  function (data) {
                    sessionStorage.setItem('usersavedinfo', JSON.stringify(data));
                    setSiteUser(data);
                    console.log(data);
                    if (data.status === 1) {
                      alert('미승인 사용자입니다');
                      navigate(`/Hanspace/${site.link}`);
                    }
                    // else if (data.authority !== 1 && data.authority !== 2) {
                    //   alert('2접근권한이 없습니다');
                    //   navigate(`/${site.link}`);
                    // }
                  },
                );
              }
            } else {
              console.log('data.link == s.link');
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
                    if (data.status === 1) {
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
        if (data.status === 1) {
          alert('미승인 사용자입니다');
          navigate(`/Hanspace/${site.link}`);
        }
      });
    }
  }, [user]);

  const NavToHome = () => {
    if (site) {
      if (siteUser) {
        if (siteUser.status === 1) {
          alert('미승인 유저입니다');
          navigate(`/Hanspace/${site.link}`);
        }
      }
      if (!login && !user) {
        alert('로그인이 필요한 서비스입니다');
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

  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* 필터 */}
          </Stack>
        </Stack>

        {/* 리스트 */}
        <SiteList user={user} sites={site} />
        <div style={{ marginTop: '30px' }}></div>
      </Container>
    </>
  );
}
