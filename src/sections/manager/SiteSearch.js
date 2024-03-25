import React, { useState } from "react";
// @mui
import { Button } from "@mui/material";
export default function SiteSearch(props) {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onClick = () => {
    props.setSearchFilter((prevState) => input);
  };
  return (
    <div style={{ width: "300px" }}>
      <input
        type="search"
        placeholder="Searching..."
        name="s"
        className="search-input"
        value={input}
        onChange={onChange}
        style={{
          border: "1px solid lightgray",
          padding: "8px",
          borderRadius: "10px",
        }}
      />
      <Button onClick={onClick} type="button" value="Search">
        <i className=" flaticon-search">검색</i>
      </Button>
    </div>
  );
}
