import React, { useState } from "react";
// @mui
import {
  Box,
  Paper,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import appleImg from "../../assets/img/apple.png";

export default function Home() {
  const [title, setTitle] = useState("강의실 대여 시스템");
  const [description, setDescription] = useState(
    "n medio silvae statuam Herculis vidit quae sanguinem sudabat Luna in caelo clarissima fulgebat subito nubes eos tegere coeperunt Puella aquam e fonte hauriebat mirum in modum oculis eius placuit Agricola frumentum in agro serit animo spem maximam gerit Eheu! Lupus ad villam accurrit et oves rapit pastoribus nihil relicto Pueri in prato ludebant herbis mollibus gaudebant Nox tenebrosa erat et solitudinem timuit Regina regis filia auro coronata in throno sedebat Ventus oras maris everberabat navigia tremebant Felix qui vera amicitia gaudet nulla fortuna mutare potest"
  );

  return (
    <>
      <div style={{ margin: "10%" }}>
        <Box>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            {title}
          </Typography>
        </Box>
        <Box style={{ margin: "20%", marginTop: "10%", marginBottom: "10%" }}>
          <Typography>{description}</Typography>
        </Box>
      </div>
    </>
  );
}
