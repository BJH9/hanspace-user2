import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function WaitingCheckbox(props) {
  const onChange = (e) => {
    props.setWaitingFilter((prevState) => e.target.value);
    console.log("waiting: ", e.target.value);
  };

  return (
    <React.Fragment>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">대기 상태</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={props.waitingFilter}
          name="radio-buttons-group"
          onChange={onChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="전체보기" />
          <FormControlLabel value="accepted" control={<Radio />} label="승인" />
          <FormControlLabel value="waiting" control={<Radio />} label="대기" />
          <FormControlLabel value="rejected" control={<Radio />} label="거절" />
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
}
