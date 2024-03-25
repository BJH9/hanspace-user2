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
import UserAuth from "src/sections/_examples/mui/data-grid/UserAuth";

// ----------------------------------------------------------------------

const TABS = [
  // { value: 'outlined', label: 'Outlined', component: <Textfields variant="outlined" /> },
  // { value: 'filled', label: 'Filled', component: <Textfields variant="filled" /> },
  // { value: 'standard', label: 'Standard', component: <Textfields variant="standard" /> },
];

// ----------------------------------------------------------------------

export default function OurUserAuth({
  params,
  auth,
  id,
  setChangeAuth,
  change,
  setChange,
  setChosenId,
  setChosenAuth,
}) {
  const [currentTab, setCurrentTab] = useState("outlined");

  return (
    <>
      <Box key={"outlined"}>
        <UserAuth
          variant="outlined"
          params={params}
          id={id}
          auth={auth}
          setChangeAuth={setChangeAuth}
          change={change}
          setChange={setChange}
          setChosenId={setChosenId}
          setChosenAuth={setChosenAuth}
        />
      </Box>
    </>
  );
}
