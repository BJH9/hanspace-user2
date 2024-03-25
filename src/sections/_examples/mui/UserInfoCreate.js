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

export default function UserInfoCreate({ user }) {
  return (
    <>
      {user ? (
        <>
          <Masonry height="auto" columns={{ xs: 1, md: 1 }} sx={{ p: 1, mt: 3, ml: 0.5 }}>
            <Block title="내 정보" sx={style}>
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
            </Block>
          </Masonry>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
