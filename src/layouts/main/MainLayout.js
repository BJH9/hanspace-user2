import { useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// @mui
import { Box } from "@mui/material";
//
import Footer from "./Footer";
import HisSpaceFooter from "./HisSpaceFooter";
import Header from "./Header";

export default function MainLayout({
  user,
  setUser,
  siteUser,
  setSiteUser,
  login,
  setLogin,
  site,
  setSite,
}) {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header
        user={user}
        setUser={setUser}
        siteUser={siteUser}
        setSiteUser={setSiteUser}
        site={site}
        setSite={setSite}
        login={login}
        setLogin={setLogin}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        <Outlet />
      </Box>
      <HisSpaceFooter />
    </Box>
  );
}
