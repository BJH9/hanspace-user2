import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Link, Typography } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// routes
import { PATH_DOCS, PATH_MINIMAL_ON_STORE } from '../../routes/paths';
// components
import Logo from '../../components/logo';
import Label from '../../components/label';
//
import navConfig from './nav/config';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import GoogleLogin from 'src/components/GoogleLogin/GoogleLogin';
import session from 'redux-persist/lib/storage/session';
import NavCreate from './nav/desktop/NavCreate';
import GoogleFake from './GoogleFake';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';

// ----------------------------------------------------------------------

export default function Header({
  user,
  setUser,
  login,
  setLogin,
  site,
  setSite,
  siteUser,
  setSiteUser,
}) {
  const carouselRef = useRef(null);

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  const [tempSavedInfo, setTempSavedInfo] = useState();
  const [tempSiteInfo, setTempSiteInfo] = useState();
  const [open, setOpen] = useState(false);

  return (
    <AppBar ref={carouselRef} color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop ? (
            <>
              {site ? (
                <>
                  <NavDesktop
                    user={user}
                    login={login}
                    setUser={setUser}
                    setLogin={setLogin}
                    site={site}
                    setSite={setSite}
                    siteUser={siteUser}
                    setSiteUser={setSiteUser}
                    isOffset={isOffset}
                    data={navConfig}
                    userSavedInfo={siteUser}
                    setUserSavedInfo={setSiteUser}
                    tempSavedInfo={tempSavedInfo}
                    setTempSavedInfo={setTempSavedInfo}
                    tempSiteInfo={tempSiteInfo}
                    setTempSiteInfo={setTempSiteInfo}
                  />
                </>
              ) : (
                <>
                  <NavCreate user={user} login={login} setUser={setUser} setLogin={setLogin} />
                </>
              )}
            </>
          ) : (
            <>
              {site ? (
                <NavMobile
                  user={user}
                  login={login}
                  setUser={setUser}
                  setLogin={setLogin}
                  site={site}
                  setSite={setSite}
                  siteUser={siteUser}
                  setSiteUser={setSiteUser}
                  isOffset={isOffset}
                  data={navConfig}
                  userSavedInfo={siteUser}
                  setUserSavedInfo={setSiteUser}
                  tempSavedInfo={tempSavedInfo}
                  setTempSavedInfo={setTempSavedInfo}
                  tempSiteInfo={tempSiteInfo}
                  setTempSiteInfo={setTempSiteInfo}
                />
              ) : (
                <NavCreate user={user} login={login} setUser={setUser} setLogin={setLogin} />
              )}
            </>
          )}

          {/* {!login ? (
            <GoogleLogin
              user={user}
              setUser={setUser}
              setSiteUser={setSiteUser}
              setLogin={setLogin}
              site={site}
            />
          ) : (
            <></>
          )} */}
          {!login ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                로그인
              </Button>
              <GoogleFake
                user={user}
                setUser={setUser}
                setSiteUser={setSiteUser}
                setLogin={setLogin}
                login={login}
                site={site}
                open={open}
                setOpen={setOpen}
              />
            </>
          ) : (
            <></>
          )}

          {/* {!login ? (
            <GoogleLogin
              bsPrefix="btn"
              className="btn btn-primary shadow-sm mt-3"
              buttonText="로그인"
              clientId={process.env.REACT_APP_GOOGLE_LOGIN}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy="single_host_origin"
              render={(renderProps) => (
                <>
                  <Button className="btn btn-primary shadow-sm" onClick={renderProps.onClick}>
                    학생 로그인
                  </Button>
                </>
              )}
            />
          ) : (
            <></>
          )} */}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
