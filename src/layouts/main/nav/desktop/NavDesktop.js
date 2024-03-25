import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import AWS from 'aws-sdk';

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
import Typography from 'src/theme/overrides/Typography';
import { editSiteInf } from 'src/api/site';
import { connectFirestoreEmulator } from 'firebase/firestore';
// ----------------------------------------------------------------------

const style = {
  '& > *': { my: '8px !important' },
};

NavDesktop.propTypes = {
  data: PropTypes.array,
  isOffset: PropTypes.bool,
};

export default function NavDesktop({
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
  tempSiteInfo,
  setTempSiteInfo,
}) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);
  const [mySiteSettingOpen, setMySiteSettingOpen] = useState(false);
  const [siteSavedInfo, setSiteSavedInfo] = useState();
  const [hashtags, setHashTags] = useState([]);
  const [test, setTest] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [t, setT] = useState([]);
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRETACCESSKEY,
    region: process.env.REACT_APP_AWS_REGION,
    signatureVersion: 'v4',
  });

  const s3 = new AWS.S3();

  // const uploadToS3 = async () => {
  //   if (!file) {
  //     return;
  //   }
  //   const params = {
  //     Bucket: process.env.REACT_APP_AWS_BUCKET,
  //     Key: `${Date.now()}.${file.name}`,
  //     Body: file,
  //   };
  //   const { Location } = await s3.upload(params).promise();
  //   setImageUrl(Location);
  //   console.log("uploading to s3", Location);
  // };

  const uploadToS3 = () => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
      }
      const params = {
        Bucket: process.env.REACT_APP_AWS_BUCKET,
        Key: `${Date.now()}.${file.name}`,
        Body: file,
      };
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  };

  useEffect(() => {
    console.log('site');
    console.log(site);
    const tagList = site.tagList.map((tag) => tag.name);
    test1(tagList);
    test2(tagList);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const test1 = (tagList) => {
    const savedInfo = { ...site, tagList };
    setSiteSavedInfo(savedInfo); // 처음 들어왔을 때 저장하는 태그
  };
  const test2 = (tagList) => {
    const savedInfo = { ...site, tagList };
    setTempSiteInfo(savedInfo);
  };

  useEffect(() => {
    console.log('siteSavedInfo');
    console.log(siteSavedInfo);
  }, [siteSavedInfo]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSiteSettingOpen = () => {
    renew();
    setMySiteSettingOpen(true);
  };

  useEffect(() => {
    console.log('tempSiteInfo');
    console.log(tempSiteInfo);
  }, [tempSiteInfo]);

  const handleSiteSettingClose = () => {
    renew();
    setMySiteSettingOpen(false);
  };

  const renew = () => {
    setTempSiteInfo(siteSavedInfo);
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
    console.log('USER INFO EDITED');
    await editSiteUserInfo(tempSavedInfo).then(function (data) {
      setUserSavedInfo(data);
    });
    sessionStorage.setItem('usersavedinfo', JSON.stringify(tempSavedInfo));
    handleMyPageClose();
    setLogin(true);
    window.location.reload();
    alert('수정되었습니다!');
  };

  const updatePhoto = () => {
    if (file) {
      uploadToS3();
    }
  };

  const editSiteInfo = async () => {
    handleSiteSettingClose();
    await updatePhoto();
    const imageUrl = await uploadToS3();

    tempSiteInfo.tagList = [...tempSiteInfo.tagList];

    if (imageUrl != null) {
      tempSiteInfo.logo = imageUrl;
    }

    await editSiteInf(tempSiteInfo).then(function (data) {
      setTempSiteInfo(data);
    });

    setLogin(true);
    window.location.reload();
    alert('수정되었습니다!');
  };

  const logout = () => {
    setUser();
    setSiteUser();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('usersavedinfo');
    setLogin(false);
    handleDialogClose();
    handleClose();
  };

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);
  const print = () => {
    console.log(user);
    console.log(siteUser);
    console.log(site);
    console.log(login);
  };

  const UnauthUser = ({ newNav }) => {
    if (!newNav.auth) {
      return <NavList key={newNav.title} item={newNav} login={login} />;
    } else {
      return null;
    }
  };

  const HandleLoginFilter = ({ nav }) => {
    const newNav = Object.assign({}, nav);
    newNav.path = `/Hanspace/${site.link}` + nav.path;

    if (!siteUser) {
      if (newNav.title === 'Home') return <UnauthUser newNav={newNav} />;
      else return null;
    } else {
      if ((siteUser.status === 1 || siteUser.status === 3) && newNav.title !== 'Home') {
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
      {site && data ? (
        <>
          <Stack component="nav" direction="row" spacing={5} sx={{ mr: 2 }}>
            {data.map((nav, index) => (
              <>
                {/* <NavList key={link.title} item={link} login={login} /> */}
                <HandleLoginFilter key={index} nav={nav} />
              </>
            ))}
          </Stack>
        </>
      ) : (
        <></>
      )}
      <>
        <Stack component="nav" direction="row" spacing={0} sx={{ mr: 1 }}>
          {login && user && siteUser ? (
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
                  <Button onClick={editUserInfo} variant="outlined" color="primary">
                    수정
                  </Button>
                  <Button onClick={cancelMyPage} variant="outlined" color="error">
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
              {login && user && (siteUser.authority === 1 || siteUser.authority === 2) ? (
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
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                        file={file}
                        setFile={setFile}
                        site={site}
                        closeMethod={handleSiteSettingClose}
                        user={user}
                        siteUser={siteUser}
                        setSiteUser={setSiteUser}
                        tempSiteInfo={tempSiteInfo}
                        setTempSiteInfo={setTempSiteInfo}
                        t={t}
                        hashtags={hashtags}
                        setHashTags={setHashTags}
                        editSiteInfo={editSiteInfo}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={editSiteInfo} variant="outlined" color="primary">
                        수정
                      </Button>
                      <Button onClick={handleSiteSettingClose} variant="outlined" color="error">
                        취소
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                <></>
              )}
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
    </>
  );
}
