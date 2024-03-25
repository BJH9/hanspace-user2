import React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function TimeCheckbox() {
  return (
    <React.Fragment>
      <div>
        <Checkbox {...label} defaultChecked size="small" />
        <Checkbox {...label} defaultChecked />
        <Checkbox
          {...label}
          defaultChecked
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </div>
    </React.Fragment>
  );
}
