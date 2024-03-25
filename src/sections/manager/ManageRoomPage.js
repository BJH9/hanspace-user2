import React from "react";
// @mui
import { Container, Box, Stack, Typography } from "@mui/material";
import FormProvider from "../../components/hook-form";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../components/settings";

// sections
import { RoomList } from "../../sections/manager";

export default function ManageRoomPage({ room, tags }) {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* 필터 */}
          </Stack>
        </Stack>

        {/* 리스트 */}
        <RoomList room={room} tags={tags} />
        <div style={{ marginTop: "30px" }}></div>
      </Container>
    </>
  );
}
