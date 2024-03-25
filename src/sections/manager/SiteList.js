import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import roomImg from "../../assets/img/뉴턴220호.jpg";
import Site from "./Site";
import PropTypes from "prop-types";
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
  Typography,
} from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SiteList({ sites, user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (sites) {
      // 이용중인 사이트
      const fetchGetUsingSites = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/saved/subscribed-sites`,
            { params: { userId: user.id } }
          );
          setSite(response.data);
          console.log("이용중인 사이트 불러오기", site);
        } catch (err) {
          console.log("이용중인 사이트 불러오기 에러");
        }
      };
      fetchGetUsingSites();

      // 관리하는 사이트
      const fetchGetManagingSites = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/saved/manage-sites`,
            { params: { userId: user.id } }
          );
          setManagingSite(response.data);
          console.log("관리중인 사이트 불러오기", managingSite);
        } catch (err) {
          console.log("관리중인 사이트 불러오기 에러");
        }
      };
      fetchGetManagingSites();

      // 만든 사이트
      const fetchGetCreatedSites = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/saved/my-sites`,
            { params: { userId: user.id } }
          );
          setCreatedSite(response.data);
        } catch (err) {
          console.log("만든 사이트 불러오기 에러");
        }
      };
      console.log("만든 사이트 불러오기", createdSite);
      fetchGetCreatedSites();
    }
  }, []);

  const [site, setSite] = useState([
    // {
    //   id: 1,
    //   img: { roomImg },
    //   name: "한동대학교 강의실",
    //   description: "한동대학교 강의실 대여 시스템",
    // },
    // {
    //   id: 2,
    //   img: { roomImg },
    //   name: "한동대학교 외부 MT",
    //   description: "한동대학교 MT 외부 시설 대여 시스템",
    // },
    // {
    //   id: 3,
    //   img: { roomImg },
    //   name: "스터디룸",
    //   description: "스터디룸 대여 시스템",
    // },
  ]);

  const [managingSite, setManagingSite] = useState([
    // {
    //   id: 1,
    //   img: { roomImg },
    //   name: "서울대학교 강의실",
    //   description: "서울대학교 강의실 대여 시스템",
    // },
    // {
    //   id: 2,
    //   img: { roomImg },
    //   name: "서울대학교 외부 MT",
    //   description: "서울대학교 MT 외부 시설 대여 시스템",
    // },
    // {
    //   id: 3,
    //   img: { roomImg },
    //   name: "스터디룸",
    //   description: "스터디룸 대여 시스템",
    // },
    // {
    //   id: 1,
    //   img: { roomImg },
    //   name: "서울대학교 강의실",
    //   description: "서울대학교 강의실 대여 시스템",
    // },
    // {
    //   id: 2,
    //   img: { roomImg },
    //   name: "서울대학교 외부 MT",
    //   description: "서울대학교 MT 외부 시설 대여 시스템",
    // },
    // {
    //   id: 3,
    //   img: { roomImg },
    //   name: "스터디룸",
    //   description: "스터디룸 대여 시스템",
    // },
    // {
    //   id: 1,
    //   img: { roomImg },
    //   name: "서울대학교 강의실",
    //   description: "서울대학교 강의실 대여 시스템",
    // },
    // {
    //   id: 2,
    //   img: { roomImg },
    //   name: "서울대학교 외부 MT",
    //   description: "서울대학교 MT 외부 시설 대여 시스템",
    // },
    // {
    //   id: 3,
    //   img: { roomImg },
    //   name: "스터디룸",
    //   description: "스터디룸 대여 시스템",
    // },
  ]);

  const [createdSite, setCreatedSite] = useState([
    // {
    //   id: 1,
    //   img: { roomImg },
    //   name: "부산대학교 강의실",
    //   description: "부산대학교 강의실 대여 시스템",
    // },
    // {
    //   id: 2,
    //   img: { roomImg },
    //   name: "부산대학교 외부 MT",
    //   description: "부산대학교 MT 외부 시설 대여 시스템",
    // },
    // {
    //   id: 3,
    //   img: { roomImg },
    //   name: "스터디룸",
    //   description: "스터디룸 대여 시스템",
    // },
    // {
    //   id: 1,
    //   img: { roomImg },
    //   name: "부산대학교 강의실",
    //   description: "부산대학교 강의실 대여 시스템",
    // },
    // {
    //   id: 2,
    //   img: { roomImg },
    //   name: "부산대학교 외부 MT",
    //   description: "부산대학교 MT 외부 시설 대여 시스템",
    // },
    // {
    //   id: 3,
    //   img: { roomImg },
    //   name: "스터디룸",
    //   description: "스터디룸 대여 시스템",
    // },
  ]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="이용중인 사이트" {...a11yProps(0)} />
            <Tab label="관리중인 사이트" {...a11yProps(1)} />
            <Tab label="내가 만든 사이트" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Box gap={3} display="grid">
              <Grid container spacing={10}>
                {site
                  ? site.map((s, i) => {
                      return (
                        <Grid item xs={12} sm={6} lg={4}>
                          <Box
                            onClick={() => {
                              navigate("/" + s.link);
                            }}
                          >
                            <Site
                              id={s.id}
                              name={s.name}
                              description={s.description}
                              link={s.link}
                              logo={s.logo}
                            />
                          </Box>
                        </Grid>
                      );
                    })
                  : null}
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box gap={3} display="grid">
              <Grid container spacing={10}>
                {managingSite
                  ? managingSite.map((s, i) => {
                      return (
                        <Grid item xs={12} sm={6} lg={4}>
                          <Box
                            onClick={() => {
                              navigate("/" + s.link);
                            }}
                          >
                            <Site
                              id={s.id}
                              name={s.name}
                              description={s.description}
                              link={s.link}
                              logo={s.logo}
                            />
                          </Box>
                        </Grid>
                      );
                    })
                  : null}
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box gap={3} display="grid">
              <Grid container spacing={10}>
                {createdSite
                  ? createdSite.map((s, i) => {
                      return (
                        <Grid item xs={12} sm={6} lg={4}>
                          <Box
                            onClick={() => {
                              navigate("/" + s.link);
                            }}
                          >
                            <Site
                              id={s.id}
                              name={s.name}
                              description={s.description}
                              link={s.link}
                              logo={s.logo}
                            />
                          </Box>
                        </Grid>
                      );
                    })
                  : null}
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </Box>
    </>
  );
}
