import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

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
  TextField,
} from '@mui/material';
//
import NavList from './NavList';
import Logo from '../../../../components/logo';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Block } from 'src/sections/_examples/Block';
import UserInfoForm from 'src/sections/_examples/mui/UserInfoForm';
import SiteFormValidationPage from 'src/pages/components/extra/SiteFormValidationPage';
import { editSiteUserInfo } from 'src/api/GoogleUser';
import UserInfoCreate from 'src/sections/_examples/mui/UserInfoCreate';
// ----------------------------------------------------------------------

const style = {
  '& > *': { my: '8px !important' },
};

export default function NavCreate({ user, login, setUser, setLogin }) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleMyPageOpen = () => {
    setMyPageOpen(true);
  };
  const handleMyPageClose = () => {
    setMyPageOpen(false);
  };

  const cancelMyPage = () => {
    handleMyPageClose();
  };

  const logout = () => {
    setUser();
    sessionStorage.removeItem('user');
    setLogin(false);
    handleDialogClose();
    handleClose();
  };
  const print = () => {
    console.log(user);
    console.log(login);
  };

  return (
    <>
      <Stack component="nav" direction="row" spacing={0} sx={{ mr: 1 }}>
        {login && user ? (
          <>
            <Button sx={{ color: 'primary' }} onClick={handleMyPageOpen}>
              내 정보
            </Button>
            <Dialog
              open={myPageOpen}
              keepMounted
              onClose={handleMyPageClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent>
                <UserInfoCreate user={user} />
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelMyPage} variant="outlined" color="error">
                  닫기
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <></>
        )}

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
              <DialogTitle>{'로그아웃 하시겠습니까?'}</DialogTitle>
              <DialogActions>
                <Button onClick={logout} variant="outlined" color="error">
                  로그아웃
                </Button>
                <Button onClick={handleDialogClose} variant="outlined" color="info">
                  취소
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
}
