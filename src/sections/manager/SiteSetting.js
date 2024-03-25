import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import {
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Dialog,
  DialogContent,
} from '@mui/material';
import { Masonry } from '@mui/lab';

//
import Block from 'src/components/settings/drawer/Block';
import SiteSettingForm from './SiteSettingForm';

// ----------------------------------------------------------------------
const variant = 'outlined';
const style = {
  '& > *': { my: '8px !important' },
};
const tempSite = {
  id: 1,
  name: '홍방이사이트',
  description: '홍방이 캡스톤 연습용 사이트',
  logo: 'https://user-images.githubusercontent.com/79990740/233854891-d14f5bd5-f22a-49c0-8f9f-cba833f7d4b6.jpeg',
  link: 'hong',
  company: '(주)홍방이',
  maxDate: 30,
  maxTime: 3,
  restriction: 3,
};
const tempTags = [
  {
    id: 1,
    siteId: 1,
    name: '공부용',
  },
  {
    id: 2,
    siteId: 1,
    name: '강연용',
  },
  {
    id: 3,
    siteId: 1,
    name: '팀모임용',
  },
];
var tempSiteSaved = {};

export default function SiteSetting() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };
  //   const [site, setSite] = useState({});
  //   const [tags, setTags] = useState();

  //   const handleOpen = () => {
  //     setOpen(!open);
  //   }

  //   const Check = () => {
  //     console.log('site: ');
  //     console.log(site);
  //     console.log('\ntags: ');
  //     console.log(tags);
  //   };
  //   const saveSiteSetting = async () => {
  //     // tempSiteSaved = Object.assign({}, site);
  //     tempSiteSaved = { ...site };
  //   };
  //   const InitSetting = async () => {
  //     setSite(tempSite);
  //     setTags(tempTags);
  //   };

  //   useEffect(() => {
  //     async function tmp() {
  //       await InitSetting();
  //       saveSiteSetting();
  //     }
  //     tmp();
  //   }, []);

  //   const handleCancel = () => {
  //     setSite({...tempSiteSaved});
  //     console.log('cancel')
  //     handleOpen();

  //   }
  //   const handleSave = () => {
  //     // axios....
  //     console.log('saved')
  //     handleOpen();

  //   }

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleOpen}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <SiteSettingForm handleOpen={handleOpen} />
        </DialogContent>
        {/* <DialogActions>
                <Button onClick={editUserInfo} variant="outlined" color="primary">
                  수정
                </Button>
                <Button onClick={cancelMyPage} variant="outlined" color="error">
                  취소
                </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}
