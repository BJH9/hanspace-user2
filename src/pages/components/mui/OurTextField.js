import { useState } from "react";

import { Helmet } from "react-helmet-async";
// @mui
import { Box, Container, Tab, Tabs } from "@mui/material";
// routes
import { PATH_PAGE } from "../../../routes/paths";
// components
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
// sections
import Textfields from "../../../sections/_examples/mui/Textfields";

// ----------------------------------------------------------------------

const TABS = [
  // { value: 'outlined', label: 'Outlined', component: <Textfields variant="outlined" /> },
  // { value: 'filled', label: 'Filled', component: <Textfields variant="filled" /> },
  // { value: 'standard', label: 'Standard', component: <Textfields variant="standard" /> },
];

// ----------------------------------------------------------------------

export default function OurTextField({ setTu }) {
  const [currentTab, setCurrentTab] = useState("outlined");

  return (
    <>
      <Box key={"outlined"} sx={{ width: "100%" }}>
        <Textfields variant="outlined" setTu={setTu} />
      </Box>
    </>
  );
}
