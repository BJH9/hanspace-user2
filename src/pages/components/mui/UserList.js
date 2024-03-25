import { Helmet } from 'react-helmet-async';
// @mui
import {
  Box,
  Container,
  Stack,
  Card,
  CardHeader,
  Typography,
  Link,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock_
import _mock, { randomInArray } from '../../../_mock';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import DataGridBasic from '../../../sections/_examples/mui/data-grid/DataGridBasic';
import DataGridCustom from '../../../sections/_examples/mui/data-grid/DataGridCustom';
import React, { useContext, useEffect, useState } from 'react';
import RoutineDataGrid from '../../../sections/_examples/mui/data-grid/RoutineDataGrid';
import UserDataGrid from 'src/sections/_examples/mui/data-grid/UserDataGrid';
import { deleteMultiUser, deleteOneUser, getUserList } from 'src/api/reserve';

import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getSiteByLink } from 'src/api/site';
import { getSiteUserInfo } from 'src/api/GoogleUser';

export const _dataGrid = [...Array(36)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  lastLogin: _mock.time(index),
  performance: _mock.number.percent(index),
  rating: _mock.number.rating(index),
  status: randomInArray(['대기', '수락', '거절']),
  isAdmin: _mock.boolean(index),
  lastName: _mock.name.lastName(index),
  firstName: _mock.name.firstName(index),
  age: _mock.number.age(index),
}));

export default function UserList({
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

  const [del, setDel] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState();
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [data, setData] = useState();
  const [refresh, setRefresh] = useState();
  const [isRender, setIsRender] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancelApprove = () => {
    if (del.length != 0) {
      setFlag2(!flag2);
    }
  };

  const handleDelete = () => {
    if (del.length != 0) {
      setOpen(true);
    }
  };

  const handleApprove = () => {
    if (del.length != 0) setFlag(!flag);
  };

  const handleReject = () => {
    if (del.length != 0) setFlag3(!flag3);
  };

  const readReserve = async () => {
    console.log('들어옴');
    await getUserList(site.id).then(function (info) {
      setData(info);
    });
  };

  useEffect(() => {
    readReserve();
  }, [refresh]);

  useEffect(() => {
    setRefresh(null);
  }, [data]);

  const confirmDelete = async () => {
    if (index != undefined) {
      await deleteOneUser(1, index);
    } else {
      const idList = del.map((list) => list.id);

      await deleteMultiUser(1, idList);
    }
    setData(await getUserList(1));
    setDel([]);
    setOpen(false);
  };
  if (data && site) {
    return (
      <div key={isRender}>
        {' '}
        <Container sx={{ my: 10 }}>
          <Card>
            <CardHeader title="사용자 관리" sx={{ mb: 2 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                mb: '1rem',
                mr: '2rem',
              }}
            >
              <Button
                variant={'outlined'}
                color={'primary'}
                onClick={() => handleApprove()}
                sx={{ mr: '0.6rem' }}
              >
                선택 승인
              </Button>
              <Button variant={'outlined'} color={'warning'} onClick={() => handleCancelApprove()}>
                선택 승인 취소
              </Button>

              <Button
                variant={'outlined'}
                color={'error'}
                onClick={() => handleReject()}
                sx={{ ml: '0.6rem' }}
              >
                선택 거절
              </Button>

              <Box sx={{ marginLeft: '8px' }}>
                <Button variant={'outlined'} color={'error'} onClick={() => handleDelete()}>
                  선택 삭제
                </Button>
              </Box>
            </Box>
            <Box sx={{ height: 720 }}>
              <UserDataGrid
                data={data}
                setDel={setDel}
                setOpen={setOpen}
                setIndex={setIndex}
                flag={flag}
                flag2={flag2}
                flag3={flag3}
                del={del}
                site={site}
              />
            </Box>
          </Card>
        </Container>
        <Dialog
          open={(open && del.length != 0) || (open && index.length != 0)}
          onClose={handleClose}
          fullWidth
        >
          <DialogTitle style={{ textAlign: 'center' }}>삭제하시겠습니까?</DialogTitle>
          <DialogContent style={{ textAlign: 'center' }}>
            <DialogContentText id="alert-dialog-description">
              주의! 삭제하시면 기록이 완전히 삭제됩니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button onClick={handleClose}>취소</Button>
            <Button color="error" onClick={confirmDelete} autoFocus>
              삭제
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
