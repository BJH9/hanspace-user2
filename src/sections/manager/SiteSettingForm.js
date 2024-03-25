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
} from '@mui/material';
import { Masonry } from '@mui/lab';

//
import Block from 'src/components/settings/drawer/Block';

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

export default function SiteSettingForm({ handleOpen, siteId }) {
  const [site, setSite] = useState({});
  const [tags, setTags] = useState();
  //   const [load, setLoad] = useState(false);
  const Check = () => {
    console.log('site: ');
    console.log(site);
    console.log('\ntags: ');
    console.log(tags);
  };
  const saveSiteSetting = async () => {
    // tempSiteSaved = Object.assign({}, site);
    tempSiteSaved = { ...site };
  };
  const InitSetting = async () => {
    setSite(tempSite);
    setTags(tempTags);
  };

  useEffect(() => {
    async function tmp() {
      await InitSetting();
      saveSiteSetting();
    }
    tmp();
  }, []);

  const handleCancel = () => {
    setSite({ ...tempSiteSaved });
    console.log('cancel');
    handleOpen();
  };
  const handleSave = () => {
    // axios....
    console.log('saved');
    handleOpen();
  };

  return (
    <>
      <Check />
      {site ? (
        <>
          <Masonry height="auto" columns={{ xs: 1, md: 1 }} sx={{ p: 1, mt: 3, ml: 0.5 }}>
            <Block title="사이트 설정" sx={style}>
              <TextField
                variant={variant}
                required
                fullWidth
                label="사이트이름"
                value={site.name}
                onChange={(event) => {
                  setSite({ ...site, name: event.target.value });
                }}
              />
              <TextField
                variant={variant}
                required
                fullWidth
                label="사이트 설명"
                value={site.description}
                onChange={(event) => {
                  setSite({ ...site, description: event.target.value });
                }}
              />
              <TextField
                variant={variant}
                required
                fullWidth
                label="사이트 고유 링크"
                onChange={(event) => {
                  setSite({ ...site, link: event.target.value });
                }}
                value={site.link}
              />
              <TextField
                variant={variant}
                required
                fullWidth
                label="회사이름"
                value={site.company}
                onChange={(event) => {
                  setSite({ ...site, company: event.target.value });
                }}
              />
              <TextField
                variant="standard"
                required
                fullWidth
                label="예약 가능 날짜"
                onChange={(event) => {
                  setSite({ ...site, maxDate: event.target.value });
                }}
                value={site.maxDate}
              />
              <TextField
                variant="standard"
                required
                fullWidth
                label="예약 가능 시간"
                value={site.maxTime}
                onChange={(event) => {
                  setSite({ ...site, maxTime: event.target.value });
                }}
              />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">제약 여부</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={site.restriction || 1}
                  onChange={(event) => {
                    setSite({ ...site, restriction: event.target.value });
                  }}
                >
                  <FormControlLabel value={1} control={<Radio />} label="O" />
                  <FormControlLabel value={2} control={<Radio />} label="X" />
                  <FormControlLabel value={3} control={<Radio />} label="일부" />
                </RadioGroup>
              </FormControl>
            </Block>
          </Masonry>
        </>
      ) : (
        <></>
      )}

      {/* <Button
        onClick={() => {
          console.log(site);
          console.log(tempSiteSaved);
        }}
      >
        Info
      </Button> */}
      <Button color="primary" onClick={handleSave}>
        저장
      </Button>
      <Button color="error" onClick={handleCancel}>
        취소
      </Button>
    </>
  );
}
