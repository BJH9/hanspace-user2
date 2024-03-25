import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function TimeCheckbox(props) {
  const onChange = (e) => {
    props.setTimingFilter((prev) => e.target.value);
    console.log("timing: ", e.target.value);
  };

  return (
    <React.Fragment>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">기한</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={props.timingFilter}
          name="radio-buttons-group"
          onChange={onChange}
        >
          <FormControlLabel value="month3" control={<Radio />} label="3개월" />
          <FormControlLabel value="month1" control={<Radio />} label="1개월" />
          <FormControlLabel value="week1" control={<Radio />} label="1주일" />
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
}
