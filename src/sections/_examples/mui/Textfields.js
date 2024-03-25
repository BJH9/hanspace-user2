import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { MenuItem, TextField, IconButton, InputAdornment } from "@mui/material";
import { Masonry } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
//
import { Block } from "../Block";

// ----------------------------------------------------------------------

const times = [
  { value: "30", label: "30분" },
  { value: "60", label: "1시간" },
  { value: "90", label: "1시간 30분" },
  { value: "120", label: "2시간" },
  { value: "150", label: "2시간 30분" },
  { value: "180", label: "3시간" },
  // { value: 'JPY', label: '¥' },
];

const style = {
  // '& > *': { my: '8px !important' },
};

// ----------------------------------------------------------------------

Textfields.propTypes = {
  variant: PropTypes.string,
};

export default function Textfields({ variant, setTu }) {
  const [time, setTime] = useState("30");

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChangeTime = (event) => {
    setTime(event.target.value);
    setTu(event.target.value);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      variant={variant}
      select
      fullWidth
      label="예약 시간 단위"
      value={time}
      onChange={handleChangeTime}
      // helperText="예약 시간"
    >
      {times.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
