import PropTypes from "prop-types";
// @mui
import { Box, Grid } from "@mui/material";
// components
import { SkeletonProductItem } from "../../../../components/skeleton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
//
import ShopProductCard from "./ShopProductCard";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Product from "./Product";
import room from "../../../../assets/img/뉴턴220호.jpg";

// ----------------------------------------------------------------------

ShopProductList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
};

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

export default function ShopProductList({
  timingFilter,
  waitingFilter,
  searchFilter,
  sortFilter,
  products,
  loading,
  ...other
}) {
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth() + 1;
  const todayDate = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // const nowTime = now.getTime();
  // const oneDate = "2023-04-05";
  // const aDate = new Date(oneDate);
  // const aTime = aDate.getTime();
  // const diff = Math.abs((nowTime - aTime) / (1000 * 60 * 60 * 24));

  const [product, setProduct] = useState([
    {
      img: { room },
      name: "NTH313",
      application: "3월 28일",
      reservation: "7월 3일",
      reservation2: "2023-03-28",
      time: "7시~9시",
      waiting: "대기",
    },
    {
      img: { room },
      name: "NTH217",
      application: "3월 29일",
      reservation: "7월 3일",
      reservation2: "2023-03-29",
      time: "7시~9시",
      waiting: "대기",
    },
    {
      img: { room },
      name: "NTH404",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-01",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH109",
      application: "7월 1일",
      reservation: "7월 3일",
      reservation2: "2023-07-01",
      time: "7시~9시",
      waiting: "대기",
    },
    {
      img: { room },
      name: "NTH219",
      application: "5월 17일",
      reservation: "7월 3일",
      reservation2: "2023-05-17",
      time: "7시~9시",
      waiting: "거절",
    },
    {
      img: { room },
      name: "NTH404",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-01",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH107",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-01",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH106",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-03-12",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH306",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-03-05",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH102",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-02-29",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-02-28",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-09-28",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-05-01",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-09",
      time: "7시~9시",
      waiting: "승인",
    },
    {
      img: { room },
      name: "NTH201",
      application: "4월 1일",
      reservation: "7월 3일",
      reservation2: "2023-04-07",
      time: "7시~9시",
      waiting: "승인",
    },
  ]);

  const [sortedProduct, setSortedProduct] = useState([]);

  useEffect(() => {
    if (sortFilter != "oldest") {
      setProduct((prevData) =>
        prevData.sort(
          (a, b) => new Date(a.reservation2) - new Date(b.reservation2)
        )
      );
      setSortedProduct((prevData) => [...product]);
      console.log("latest sort: ", product);
    } else if (sortFilter == "oldest") {
      setProduct((prevData) =>
        prevData.sort(
          (a, b) => new Date(b.reservation2) - new Date(a.reservation2)
        )
      );
      setSortedProduct((prevData) => [...product]);
      console.log("oldest sort: ", product);
    }
  }, [sortFilter]);

  useEffect(() => {
    if (sortedProduct.length != 0) {
      if (waitingFilter === "accepted") {
        setProduct([...sortedProduct]);
        setProduct((prevData) =>
          prevData.filter((item) => item.waiting === "승인")
        );
        console.log("accepted filter: ", product);
      } else if (waitingFilter === "rejected") {
        setProduct([...sortedProduct]);
        setProduct((prevData) =>
          prevData.filter((item) => item.waiting === "거절")
        );
        console.log("rejected filter: ", product);
      } else if (waitingFilter === "waiting") {
        setProduct([...sortedProduct]);
        setProduct((prevData) =>
          prevData.filter((item) => item.waiting === "대기")
        );
        console.log("waiting filter: ", product);
      } else if (waitingFilter === "all") {
        setProduct([...sortedProduct]);
      }
    }
  }, [waitingFilter]);

  useEffect(() => {}, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="마감 전" {...a11yProps(0)} />
            <Tab label="마감 후" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            gap={3}
            display="grid"
            // gridTemplateColumns={{
            //   xs: "repeat(1, 1fr)",
            //   sm: "repeat(2, 1fr)",
            //   md: "repeat(3, 1fr)",
            //   lg: "repeat(4, 1fr)",
            // }}
            {...other}
          >
            <Grid container spacing={10}>
              {product
                ? product.map((p, i) => {
                    let date1 = new Date(p.reservation2);
                    let oneDate;
                    let nowTime;
                    let aTime;
                    let diff;
                    if (date1 > now) {
                      if (searchFilter == "" || p.name.includes(searchFilter)) {
                        if (timingFilter == "month3") {
                          oneDate = new Date(p.reservation2);
                          nowTime = now.getTime();
                          aTime = oneDate.getTime();
                          diff = nowTime - aTime;
                          if (Math.abs(diff / (1000 * 60 * 60 * 24)) <= 90) {
                            return (
                              <Grid item xs={12} sm={6} lg={4}>
                                <Product
                                  name={p.name}
                                  application={p.application}
                                  reservation={p.reservation}
                                  time={p.time}
                                  waiting={p.waiting}
                                  application2={p.reservation2}
                                />
                              </Grid>
                            );
                          }
                        } else if (timingFilter == "month1") {
                          oneDate = new Date(p.reservation2);
                          nowTime = now.getTime();
                          aTime = oneDate.getTime();
                          diff = nowTime - aTime;
                          if (Math.abs(diff / (1000 * 60 * 60 * 24)) <= 30) {
                            return (
                              <Grid item xs={12} sm={6} lg={4}>
                                <Product
                                  name={p.name}
                                  application={p.application}
                                  reservation={p.reservation}
                                  time={p.time}
                                  waiting={p.waiting}
                                  application2={p.reservation2}
                                />
                              </Grid>
                            );
                          }
                        } else if (timingFilter == "week1") {
                          oneDate = new Date(p.reservation2);
                          nowTime = now.getTime();
                          aTime = oneDate.getTime();
                          diff = nowTime - aTime;
                          if (Math.abs(diff / (1000 * 60 * 60 * 24)) <= 7) {
                            return (
                              <Grid item xs={12} sm={6} lg={4}>
                                <Product
                                  name={p.name}
                                  application={p.application}
                                  reservation={p.reservation}
                                  time={p.time}
                                  waiting={p.waiting}
                                  application2={p.reservation2}
                                />
                              </Grid>
                            );
                          }
                        }
                      }
                    }
                  })
                : null}
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            gap={3}
            display="grid"
            // gridTemplateColumns={{
            //   xs: "repeat(1, 1fr)",
            //   sm: "repeat(2, 1fr)",
            //   md: "repeat(3, 1fr)",
            //   lg: "repeat(4, 1fr)",
            // }}
            {...other}
          >
            <Grid container spacing={10}>
              {product
                ? product.map((p, i) => {
                    let date1 = new Date(p.reservation2);
                    let oneDate;
                    let nowTime;
                    let aTime;
                    let diff;
                    if (date1 <= now) {
                      if (timingFilter == "month3") {
                        oneDate = new Date(p.reservation2);
                        nowTime = now.getTime();
                        aTime = oneDate.getTime();
                        diff = nowTime - aTime;
                        if (Math.abs(diff / (1000 * 60 * 60 * 24)) <= 90) {
                          return (
                            <Grid item xs={12} sm={6} lg={4}>
                              <Product
                                name={p.name}
                                application={p.application}
                                reservation={p.reservation}
                                time={p.time}
                                waiting={p.waiting}
                                application2={p.reservation2}
                              />
                            </Grid>
                          );
                        }
                      } else if (timingFilter == "month1") {
                        oneDate = new Date(p.reservation2);
                        nowTime = now.getTime();
                        aTime = oneDate.getTime();
                        diff = nowTime - aTime;
                        if (Math.abs(diff / (1000 * 60 * 60 * 24)) <= 30) {
                          return (
                            <Grid item xs={12} sm={6} lg={4}>
                              <Product
                                name={p.name}
                                application={p.application}
                                reservation={p.reservation}
                                time={p.time}
                                waiting={p.waiting}
                                application2={p.reservation2}
                              />
                            </Grid>
                          );
                        }
                      } else if (timingFilter == "week1") {
                        oneDate = new Date(p.reservation2);
                        nowTime = now.getTime();
                        aTime = oneDate.getTime();
                        diff = nowTime - aTime;
                        if (Math.abs(diff / (1000 * 60 * 60 * 24)) <= 7) {
                          return (
                            <Grid item xs={12} sm={6} lg={4}>
                              <Product
                                name={p.name}
                                application={p.application}
                                reservation={p.reservation}
                                time={p.time}
                                waiting={p.waiting}
                                application2={p.reservation2}
                              />
                            </Grid>
                          );
                        }
                      }
                    }
                  })
                : null}
            </Grid>
          </Box>
        </TabPanel>
      </Box>
    </React.Fragment>
  );
}
