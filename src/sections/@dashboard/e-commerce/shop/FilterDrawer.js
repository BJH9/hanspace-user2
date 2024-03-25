import React from "react";
// @mui
import { Button } from "@mui/material";

export default function FilterDrawer(props) {
  //   const onChange = (e) => {
  //     props.setIsLast(false);
  //     props.setFilterStatus((prevState) => {
  //       return { ...prevState, condition: parseInt(e.target.value), page: 0 };
  //     });
  //   };

  return (
    <React.Fragment>
      <div>
        <Button>Filter</Button>
      </div>
    </React.Fragment>
  );
}
