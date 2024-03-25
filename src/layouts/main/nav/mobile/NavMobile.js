import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import useScript from "../../../../hooks/useScript";
import { useLocation } from "react-router-dom";
// @mui
import {
  List,
  Drawer,
  IconButton,
  Button,
  Dialog,
  Slide,
  DialogActions,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
// config
import { NAV } from "../../../../config";
// components
import Logo from "../../../../components/logo";
import Iconify from "../../../../components/iconify";
import Scrollbar from "../../../../components/scrollbar";
import { Link as RouterLink } from "react-router-dom";
//
import UserInfoForm from "src/sections/_examples/mui/UserInfoForm";
import NavList from "./NavList";
import { editSiteUserInfo } from "src/api/GoogleUser";
import SiteFormValidationPage from "src/pages/components/extra/SiteFormValidationPage";

// ----------------------------------------------------------------------

NavMobile.propTypes = {
  data: PropTypes.array,
  isOffset: PropTypes.bool,
};
const tempUserSavedInfo = {
  id: 1,
  userId: 1,
  siteId: 1,
  groupName: "홍방이캡스톤",
  purpose: "캡스톤 회의",
  reservation: "홍성헌",
  contact: "01075072099",
};
export default function NavMobile({
  isOffset,
  data,
  user,
  login,
  setUser,
  setLogin,
  site,
  setSite,
  siteUser,
  setSiteUser,
  userSavedInfo,
  setUserSavedInfo,
  tempSavedInfo,
  setTempSavedInfo,
}) {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);
  const [mySiteSettingOpen, setMySiteSettingOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSiteSettingOpen = () => {
    setMySiteSettingOpen(true);
  };

  const handleSiteSettingClose = () => {
    setMySiteSettingOpen(false);
  };

  const cancelSiteSetting = () => {
    setMySiteSettingOpen(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleMyPageOpen = () => {
    setTempSavedInfo(userSavedInfo);
    setMyPageOpen(true);
  };
  const handleMyPageClose = () => {
    setMyPageOpen(false);
  };

  const cancelMyPage = () => {
    setTempSavedInfo(userSavedInfo);
    handleMyPageClose();
  };
  const editUserInfo = async () => {
    // Validation check
    console.log("USER INFO EDITED");
    await editSiteUserInfo(tempSavedInfo).then(function (data) {
      setUserSavedInfo(data);
    });
    sessionStorage.setItem("usersavedinfo", JSON.stringify(tempSavedInfo));
    handleMyPageClose();
    setLogin(true);
    alert("수정되었습니다!");
  };

  const logout = () => {
    setUser();
    setSiteUser();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("usersavedinfo");
    setLogin(false);
    handleDialogClose();
    handleClose();
  };
  const print = () => {
    console.log(user);
    console.log(siteUser);
    console.log(site);
    console.log(login);
  };

  const UnauthUser = ({ newNav }) => {
    console.log(newNav);
    if (!newNav.auth) {
      return <NavList key={newNav.title} item={newNav} login={login} />;
    } else {
      return null;
    }
  };

  const HandleLoginFilter = ({ nav }) => {
    const newNav = Object.assign({}, nav);
    newNav.path = `/${site.link}` + nav.path;

    if (!siteUser) {
      if (newNav.title === "Home") return <UnauthUser newNav={newNav} />;
      else return null;
    } else {
      if (
        (siteUser.status === 1 || siteUser.status === 3) &&
        newNav.title !== "Home"
      ) {
        return null;
      } else {
        if (siteUser.authority === 1 || siteUser.authority === 2) {
          return <NavList key={newNav.title} item={newNav} login={login} />;
        }
        return <UnauthUser newNav={newNav} />;
      }
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          ml: 1,
          ...(isOffset && {
            color: "text.primary",
          }),
        }}
      >
        <Iconify icon="eva:menu-2-fill" />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />
          {site && data ? (
            <List component="nav" disablePadding>
              {data.map((nav) => (
                <HandleLoginFilter key={nav.title} nav={nav} />
              ))}
            </List>
          ) : (
            <></>
          )}

          <Stack
            sx={{
              position: "absolute",
              bottom: 0,
              alignContent: "center",
              width: "100%",
            }}
          >
            {login && user && siteUser ? (
              <>
                <Button sx={{ color: "primary" }} onClick={handleMyPageOpen}>
                  내 정보
                </Button>
                <Dialog
                  open={myPageOpen}
                  keepMounted
                  onClose={handleMyPageClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogContent>
                    <UserInfoForm
                      user={user}
                      siteUser={siteUser}
                      setSiteUser={setSiteUser}
                      userSavedInfo={userSavedInfo}
                      tempSavedInfo={tempSavedInfo}
                      setTempSavedInfo={setTempSavedInfo}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={editUserInfo}
                      variant="outlined"
                      color="primary"
                    >
                      수정
                    </Button>
                    <Button
                      onClick={cancelMyPage}
                      variant="outlined"
                      color="error"
                    >
                      취소
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <></>
            )}
            {siteUser ? (
              <>
                {login &&
                user &&
                (siteUser.authority === 1 || siteUser.authority === 2) ? (
                  <>
                    <Button color="primary" onClick={handleSiteSettingOpen}>
                      사이트 설정
                    </Button>
                    <Dialog
                      open={mySiteSettingOpen}
                      keepMounted
                      onClose={handleSiteSettingClose}
                      aria-describedby="alert-dialog-slide-description"
                      fullWidth={true}
                    >
                      <DialogContent>
                        <SiteFormValidationPage
                          site={site}
                          closeMethod={handleSiteSettingClose}
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            <Button onClick={print}>But</Button>
            {login && user ? (
              <>
                <Button color="error" onClick={handleDialogOpen}>
                  로그아웃
                </Button>
                <Dialog
                  open={openDialog}
                  keepMounted
                  onClose={handleDialogClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"로그아웃 하시겠습니까?"}</DialogTitle>
                  <DialogActions>
                    <Button onClick={logout} variant="outlined" color="error">
                      로그아웃
                    </Button>
                    <Button
                      onClick={handleDialogClose}
                      variant="outlined"
                      color="info"
                    >
                      취소
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <></>
            )}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
