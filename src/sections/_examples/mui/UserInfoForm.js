import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { MenuItem, TextField, IconButton, InputAdornment, Button, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const CURRENCIES = [
  { value: 'USD', label: '$' },
  { value: 'EUR', label: '€' },
  { value: 'BTC', label: '฿' },
  { value: 'JPY', label: '¥' },
];

const style = {
  '& > *': { my: '8px !important' },
};
const variant = 'outlined';

// ----------------------------------------------------------------------

// UserInfoForm.propTypes = {
//   variant: PropTypes.string,
// };

export default function UserInfoForm({ user, siteUser, tempSavedInfo, setTempSavedInfo }) {
  const auth = ['', '생성자', '관리자', '일반유저', '금지유저'];
  const status = ['', '미승인', '승인', '불허'];
  return (
    <>
      {tempSavedInfo ? (
        <>
          <Masonry height="auto" columns={{ xs: 1, md: 1 }} sx={{ p: 1, mt: 3, ml: 0.5 }}>
            <Block title="내 정보" sx={style}>
              <Typography variant="p" sx={{ fontWeight: 'bold' }}>
                권한: {auth[siteUser.authority]}
              </Typography>
              <br />
              <Typography variant="p" sx={{ fontWeight: 'bold' }}>
                상태: {status[siteUser.status]}{' '}
              </Typography>
              <TextField
                variant={variant}
                disabled
                required
                fullWidth
                label="유저이름"
                value={user.name}
              />
              <TextField
                variant={variant}
                disabled
                required
                fullWidth
                label="유저이메일"
                value={user.email}
              />
              <TextField
                variant={variant}
                required
                fullWidth
                label="모임명"
                onChange={(event) => {
                  setTempSavedInfo({ ...tempSavedInfo, groupName: event.target.value });
                }}
                value={tempSavedInfo.groupName}
              />
              <TextField
                variant={variant}
                required
                fullWidth
                label="대여목적"
                onChange={(event) => {
                  setTempSavedInfo({ ...tempSavedInfo, purpose: event.target.value });
                }}
                value={tempSavedInfo.purpose}
              />
              <TextField
                variant={variant}
                required
                fullWidth
                label="신청인"
                onChange={(event) => {
                  setTempSavedInfo({ ...tempSavedInfo, reservation: event.target.value });
                }}
                value={tempSavedInfo.reservation}
              />
              <TextField
                variant={variant}
                required
                fullWidth
                label="번호"
                onChange={(event) => {
                  setTempSavedInfo({ ...tempSavedInfo, contact: event.target.value });
                }}
                value={tempSavedInfo.contact}
              />
            </Block>
          </Masonry>
        </>
      ) : (
        <></>
      )}

      {/* <Button
        onClick={() => {
          // console.log(tempSavedInfo);
          // console.log(userSavedInfo);
          var c = sessionStorage.getItem('usersavedinfo');
          var d;
          if (c !== null) {
            d = JSON.parse(c);
            console.log(d);
          }
        }}
      >
        Info
      </Button> */}
    </>
  );
}
