import { useState, useEffect } from 'react';
import isWeekend from 'date-fns/isWeekend';
// @mui

import {
  Button,
  Typography,
  Chip,
  Select,
  TextField,
  Stack,
  Paper,
  Checkbox,
  Box,
  Slider,
  Grid,
  Radio,
  FormControl,
  MenuItem,
  RadioGroup,
  InputLabel,
  FormControlLabel,
} from '@mui/material';
import { Masonry } from '@mui/lab';
import { MobileDatePicker } from '@mui/x-date-pickers';
//
import { Block } from '../../Block';
import { max } from 'lodash';

// ----------------------------------------------------------------------

const maxTime = 180;

export default function FilterDate({
  reserveOne,
  people,
  setPeople,
  checked,
  setChecked,
  search,
  setSearch,
  hour,
  setHour,
  site,
  reserveStartDate,
  setReserveStartDate,
  reserveEndDate,
  setReserveEndDate,
}) {
  const [timeunits, setTimeunits] = useState([]);

  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  const handleChangeAll = (event) => {
    setChecked([
      !checked[0],
      !checked[0],
      !checked[0],
      !checked[0],
      !checked[0],
      !checked[0],
      !checked[0],
    ]);
  };
  const handleChangeMonThu = async (event) => {
    setChecked([false, true, false, false, true, false, false]);
  };
  const handleChangeTueFri = (event) => {
    setChecked([false, false, true, false, false, true, false]);
  };

  const handleChange0 = (event) => {
    const newChecked = [
      checked[0],
      checked[1],
      checked[2],
      checked[3],
      checked[4],
      checked[5],
      checked[6],
    ];
    newChecked[event.target.value] = event.target.checked;
    setChecked(newChecked);
  };

  // const MenuByMaxTime = () => {
  //   var ret = [];
  //   const n = site.maxTime / site.timeUnit;
  //   for (var i = 0; i < n; i++) {
  //     var temp = (
  //       <MenuItem
  //         value={(i + 1) * site.timeUnit}
  //         onClick={() => {
  //           setHour((i + 1) * site.timeUnit);
  //         }}
  //       >
  //         {(i + 1) * site.timeUnit}분
  //       </MenuItem>
  //     );
  //     ret.push(temp);
  //   }
  //   console.log(ret);
  //   return ret;
  // };

  const initTimeUnitCnt = () => {
    var i = 1;
    var t = [];
    while (site.maxTime - i * site.timeUnit >= 0) {
      t.push(i);
      i++;
    }
    setTimeunits(t);
  };
  useEffect(() => {
    initTimeUnitCnt();
  }, [site]);

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };
  useEffect(() => {
    if (!reserveOne) {
      if (search) {
        if (!handleCheckValidFilter()) {
          setSearch(false);
          alert('선택기간에는 해당요일이 없습니다');
        }
      }
    }
  }, [checked]);
  useEffect(() => {
    if (!reserveOne) {
      if (search) {
        if (!handleCheckValidFilter()) {
          setSearch(false);
          alert('선택기간에는 해당요일이 없습니다');
        }
      }
    }
  }, [reserveStartDate]);
  useEffect(() => {
    if (!reserveOne) {
      if (search) {
        if (!handleCheckValidFilter()) {
          setSearch(false);
          alert('선택기간에는 해당요일이 없습니다');
        }
      }
    }
  }, [reserveEndDate]);

  const handleCheckValidFilter = () => {
    var days = Math.ceil(
      (reserveEndDate.getTime() - reserveStartDate.getTime()) / (1000 * 3600 * 24),
    );
    // console.log(days);
    for (var i = 0; i <= days; i++) {
      var temp = new Date(reserveStartDate);
      temp.setDate(reserveStartDate.getDate() + i);
      // console.log(temp);
      if (checked[temp.getDay()]) {
        // console.log(temp);
        // console.log('is ' + temp.getDay())
        return true;
      }
    }
    return false;
  };

  return (
    <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
      <Block title="대여날짜" spacing={2}>
        {reserveOne ? (
          <>
            <MobileDatePicker
              orientation="portrait"
              minDate={new Date()}
              maxDate={new Date().setDate(new Date().getDate() + site.maxDate)}
              label="날짜"
              value={reserveStartDate}
              onChange={(newValue) => {
                if (newValue < today) alert('대여날짜는 오늘부터 가능합니다');
                else setReserveStartDate(newValue);
              }}
              renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
            />
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel id="demo-simple-select-label">사용시간</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hour}
                label="Hour"
                onChange={handleHourChange}
              >
                {timeunits.map((element) => (
                  <MenuItem key={element} value={element * site.timeUnit}>
                    {element * site.timeUnit}분
                  </MenuItem>
                ))}

                {/* <MenuItem value={1}>1시간</MenuItem>
                <MenuItem value={2}>2시간</MenuItem>
                <MenuItem value={3}>3시간</MenuItem> */}
              </Select>
            </FormControl>
          </>
        ) : (
          <Grid>
            <MobileDatePicker
              orientation="portrait"
              label="시작날짜"
              minDate={new Date()}
              maxDate={new Date().setDate(new Date().getDate() + site.maxDate)}
              value={reserveStartDate}
              onChange={(newValue) => {
                // if (newValue < today) alert('대여날짜는 오늘부터 가능합니다');
                // else {
                // setSearch(false);
                if (newValue > reserveEndDate) alert('시작날짜는 종료날짜 이후로 가능합니다.');
                else {
                  setReserveStartDate(newValue);
                }
                // }
              }}
              renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
            />
            <MobileDatePicker
              orientation="portrait"
              label="종료날짜"
              minDate={new Date()}
              maxDate={new Date().setDate(new Date().getDate() + site.maxDate)}
              value={reserveEndDate}
              onChange={(newValue) => {
                // setSearch(false);
                if (newValue < reserveStartDate) alert('끝날짜는 시작날짜보다 커야합니다');
                else setReserveEndDate(newValue);
              }}
              renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
            />
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel id="demo-simple-select-label">사용시간</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hour}
                label="Hour"
                onChange={handleHourChange}
              >
                {timeunits.map((element) => (
                  <MenuItem key={element} value={element * site.timeUnit}>
                    {element * site.timeUnit}분
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid xs={12}>
              <FormControlLabel
                control={
                  <Chip
                    color="primary"
                    variant="filled"
                    clickable
                    onClick={handleChangeAll}
                    label="All"
                    sx={{ p: 1 }}
                  ></Chip>
                }
              />
              <FormControlLabel
                control={
                  <Chip
                    color="info"
                    variant="filled"
                    clickable
                    onClick={handleChangeMonThu}
                    label="월목"
                    sx={{ p: 1 }}
                  ></Chip>
                }
              />
              <FormControlLabel
                control={
                  <Chip
                    color="secondary"
                    clickable
                    variant="filled"
                    onClick={handleChangeTueFri}
                    label="화금"
                    sx={{ p: 1 }}
                  ></Chip>
                }
              />

              {/* <FormControlLabel
                label="월목"
                labelPlacement="bottom"
                control={
                  <Checkbox
                    color="info"
                    checked={checked[1] && checked[4]}
                    // indeterminate={checked[0] !== checked[1]}
                    onChange={handleChangeMonThu}
                  />
                }
              />
              <FormControlLabel
                label="화금"
                labelPlacement="bottom"
                control={
                  <Checkbox
                    color="secondary"
                    checked={checked[2] && checked[5]}
                    onChange={handleChangeTueFri}
                  />
                }
              /> */}

              <Box container sx={{ xs: 7 }} spacing={0}>
                <FormControlLabel
                  label="월"
                  labelPlacement="right"
                  value={1}
                  control={<Checkbox checked={checked[1]} onChange={handleChange0} />}
                />
                <FormControlLabel
                  label="화"
                  labelPlacement="right"
                  value={2}
                  control={<Checkbox checked={checked[2]} onChange={handleChange0} />}
                />
                <FormControlLabel
                  label="수"
                  labelPlacement="right"
                  value={3}
                  control={<Checkbox checked={checked[3]} onChange={handleChange0} />}
                />
                <FormControlLabel
                  label="목"
                  labelPlacement="right"
                  value={4}
                  control={<Checkbox checked={checked[4]} onChange={handleChange0} />}
                />
                <FormControlLabel
                  label="금"
                  labelPlacement="right"
                  value={5}
                  control={<Checkbox checked={checked[5]} onChange={handleChange0} />}
                />
                <FormControlLabel
                  label="토"
                  labelPlacement="right"
                  value={6}
                  control={<Checkbox checked={checked[6]} onChange={handleChange0} />}
                />
                <FormControlLabel
                  label="일"
                  labelPlacement="right"
                  value={0}
                  control={<Checkbox checked={checked[0]} onChange={handleChange0} />}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Block>

      <Block title="사용인원">
        <TextField
          label="인원"
          value={people}
          sx={{ mt: 2 }}
          onChange={(event) => setPeople(event.target.value)}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
      </Block>
    </Masonry>
  );
}
