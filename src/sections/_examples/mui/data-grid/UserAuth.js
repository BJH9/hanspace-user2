import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// @mui
import {
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";

// // components
// import Iconify from "../../../components/iconify";
// //
// import { Block } from "../Block";

// ----------------------------------------------------------------------

const times = [
  { value: "2", label: "admin" },
  { value: "3", label: "user" },
  { value: "4", label: "blacklist" },

  // { value: "creator", label: "creator" },

  //   { value: "-", label: "-" },

  // { value: 'JPY', label: '¥' },
];

// const style = {
//   // '& > *': { my: '8px !important' },
// };

// ----------------------------------------------------------------------

// UserAuth.propTypes = {
//   variant: PropTypes.string,
// };
let temp = "-";
let check = false;

export default function UserAuth({
  params,
  auth,
  setChangeAuth,
  change,
  id,
  setChange,
  setChosenId,
  setChosenAuth,
}) {
  const [time, setTime] = useState(auth);
  const [rendered, setRendered] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [test, setTest] = useState(auth);
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChangeTime = (event) => {
    // test 의 초기값이 auth 가 아닌 빈문자열일 경우
    setTest(event.target.value);
    // setChosenAuth(event.target.value);
    // setChosenId(id);
    setChangeAuth(true);
  };
  const handleValue = (value) => {
    setChosenAuth(value);
    setChosenId(id);
  };

  useEffect(() => {
    if (rendered) {
      setTime(test);
    } else setRendered(true);
  }, [change]);

  //   const handleChange = (prop) => (event) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };

  //   const handleClickShowPassword = () => {
  //     setValues({ ...values, showPassword: !values.showPassword });
  //   };

  //   const handleMouseDownPassword = (event) => {
  //     event.preventDefault();
  //   };

  return (
    <>
      {time == "creator" ? (
        "creator"
      ) : params.row.status === "대기" ? null : (
        <TextField
          variant="outlined"
          select
          fullWidth
          //   label="예약 시간 단위"
          //   margin="dense"
          value={time}
          onChange={handleChangeTime}
          // helperText="예약 시간"
          size="small"
          //   inputProps={{
          //     style: {
          //       height: "1px",
          //     },
          //   }}
        >
          {times.map((option) => (
            <MenuItem
              key={option.label}
              value={option.label}
              onClick={() => {
                handleValue(option.value);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    </>
  );
}
