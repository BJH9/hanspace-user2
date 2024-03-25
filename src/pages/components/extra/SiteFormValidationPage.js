import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import {
  Box,
  Card,
  Container,
  CardHeader,
  CardContent,
  Button,
  Modal,
  Dialog,
  Typography,
} from "@mui/material";
// routes
import { PATH_PAGE } from "../../../routes/paths";
// components
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
// sections
import { ReactHookForm } from "../../../sections/_examples/extra/form";
import SiteReactHookForm from "../../../sections/_examples/extra/form/SiteReactHookForm";
import { getSiteByLink } from "src/api/site";
import BtnUpload from "src/components/FileUpload/BtnUpload";

// ----------------------------------------------------------------------

export default function SiteFormValidationPage({
  imageUrl,
  setImageUrl,
  file,
  setFile,
  t,
  hashtags,
  setHashTags,
  editSiteInfo,
  site,
  user,
  siteUser,
  setSiteUser,
  tempSiteInfo,
  setTempSiteInfo,
  closeMethod,
  setIm,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [mySiteSettingOpen, setMySiteSettingOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState();

  const handleSiteSettingOpen = (setMySiteSettingOpen) => {
    setMySiteSettingOpen(true);
  };

  // useEffect(() => {
  //   async function fetchSite() {
  //     getSiteByLink("hbl").then(function (data) {
  //       setData(data);
  //     });
  //   }
  //   fetchSite();
  //   console.log(data);
  // }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: 800,
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Helmet>
        <title> 예약자 정보 입력 </title>
      </Helmet>
      {/* <Box style={{ textAlign: "right" }}>
        <Button variant="contained" onClick={handleOpen}>
          사이트 생성하기
        </Button>
      </Box> */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // style={{ maxHeight: "500px", overflowY: "auto" }}
      > */}
      <Box sx={{ margin: "10px" }}>
        <Typography
          variant="h6"
          sx={{ marginBottom: "30px", marginTop: "30px" }}
        >
          사이트 설정
        </Typography>
        <SiteReactHookForm
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          file={file}
          setFile={setFile}
          t={t}
          hashTags={hashtags}
          setHashTags={setHashTags}
          site={site}
          closeMethod={closeMethod}
          editSiteInfo={editSiteInfo}
          user={user}
          siteUser={siteUser}
          setSiteUser={setSiteUser}
          tempSiteInfo={tempSiteInfo}
          setTempSiteInfo={setTempSiteInfo}
          setIm={setIm}
        />
      </Box>
      {/* <Dialog>
        <Box style={style}>
          <Container sx={{ my: 10 }}>
            <Card>
              <CardHeader title="예약자 정보 입력" />
              <CardContent>
                <SiteReactHookForm />
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Dialog> */}
      {/* </Modal> */}
    </>
  );
}
