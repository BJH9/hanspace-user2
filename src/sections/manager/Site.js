import React from "react";
import roomImg from "../../assets/img/뉴턴220호.jpg";
// @mui
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
  ToggleButton,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import cafeImg from "../../assets/img/cafe10.jpeg";

export default function Site({ id, name, description, link, logo }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/first-filter");
  }
  return (
    <>
      {/* <div
        style={{
          padding: "7px",
          borderRadius: "20px",
          backgroundColor: "#f8f9fa",
        }}
        onClick={handleClick}
      >
       
        <div>
          <img src={roomImg} />
        </div>
        
        <div
          style={{ marginTop: "10px", fontWeight: "bold", textAlign: "center" }}
        >
          {props.name}
        </div>
      </div> */}
      <Card
        sx={{ maxWidth: 345 }}
        // onClick={() => {
        // navigate("/" + link);
        // }}
      >
        <CardMedia sx={{ height: 140 }} image={logo} />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
