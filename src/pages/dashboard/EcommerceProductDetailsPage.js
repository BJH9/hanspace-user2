import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, addToCart, gotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import room from '../../assets/img/뉴턴220호.jpg';
// components
import Iconify from '../../components/iconify';
import Markdown from '../../components/markdown';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { SkeletonProductDetails } from '../../components/skeleton';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/e-commerce/details';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import KakaoShareBtn from '../../sections/@dashboard/e-commerce/shop/KakaoShareBtn';

import { getSiteByLink } from 'src/api/site';
import { getSiteUserInfo } from 'src/api/GoogleUser';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

// ----------------------------------------------------------------------

export default function EcommerceProductDetailsPage({
  user,
  setUser,
  siteUser,
  setSiteUser,
  site,
  setSite,
  login,
  setLogin,
}) {
  // const { link } = useParams();
  // useEffect(() => {
  //   if (link) {
  //     async function fetchSite() {
  //       await getSiteByLink(link).then(function (data) {
  //         if (sessionStorage.getItem('site') === null) {
  //           setSite(data);
  //           sessionStorage.setItem('site', JSON.stringify(data));
  //         } else {
  //           var s = JSON.parse(sessionStorage.getItem('site'));
  //           if (data.link != s.link) {
  //             setSite(data);
  //             sessionStorage.setItem('site', JSON.stringify(data));
  //             setUser();
  //             setSiteUser();
  //             setLogin(false);
  //             sessionStorage.removeItem('user');
  //             sessionStorage.removeItem('usersavedinfo');
  //           } else {
  //             setSite(data);
  //             if (sessionStorage.getItem('user') !== null) {
  //               setUser(JSON.parse(sessionStorage.getItem('user')));
  //               setLogin(true);
  //             }
  //           }
  //         }
  //       });
  //     }
  //     fetchSite();
  //   }
  // }, [link]);

  // useEffect(() => {
  //   if (user && site && !siteUser) {
  //     getSiteUserInfo(user.id, site.id).then(function (data) {
  //       sessionStorage.setItem('usersavedinfo', JSON.stringify(data));
  //       setSiteUser(data);
  //       if (data.status === 1) {
  //         alert('미승인 사용자입니다');
  //       }
  //     });
  //   }
  // }, [user]);

  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const dispatch = useDispatch();

  const { product, isLoading, checkout } = useSelector((state) => state.product);

  const [currentTab, setCurrentTab] = useState('description');

  const [roomInfo, setRoomInfo] = useState({
    img: { room },
    name: 'NTH313',
    application: '3월 28일',
    reservation: '2023-04-01',
    reservation2: '2023-03-28',
    time: '7시~9시',
    waiting: '승인',
    timing: '이용 전',
  });

  const [RoomDetail, setRoomDetail] = useState(['실험', '전자칠판', '빔 프로젝터']);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    if (name) {
      dispatch(getProduct(name));
    }
  }, [dispatch, name]);

  const handleAddCart = (newProduct) => {
    dispatch(addToCart(newProduct));
  };

  const handleGotoStep = (step) => {
    dispatch(gotoStep(step));
  };

  const TABS = [
    {
      value: 'description',
      label: 'description',
      component: product ? <Markdown children={product?.description} /> : null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`Ecommerce: ${product?.name || ''} | Minimal UI`}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            {
              name: 'Shop',
              href: PATH_DASHBOARD.eCommerce.shop,
            },
            { name: product?.name },
          ]}
        />
        {/*<div style={{margin: "auto"}}>*/}
        {/*  <img style={{marginTop: "50px", marginBottom: "50px", maxWidth: "350px"}} src={room} />*/}
        {/*</div>*/}
        {/* <Grid item xs={12} md={6} lg={7}>
          <img style={{marginTop: "50px", width: "350px", margin: "0px auto"}} src={room} />
          <div style={{textAlign: "center", marginBottom: "30px"}}>
            <div style={{marginBottom: "20px"}}>{roomInfo.name}</div>
            <div style={{borderTop: "0.2px solid black", borderBottom: "0.2px solid black", marginBottom: "20px" }}>
              {RoomDetail.map((r, i) => {
                return <div style={{ textAlign: "center"}}>{"- " + r}</div>;
              })}
            </div>
            <div style={{display: "flex", marginBottom: "30px"}}>
              <div style={{width: "50%"}}>
                <div style={{color: "lightGray"}}>예약 날짜</div>
                <div>{roomInfo.reservation}</div>
              </div>
              <div style={{width: "50%"}}>
                <div style={{color: "lightGray"}}>예약 시간</div>
                <div>{roomInfo.time}</div>
              </div>
            </div>
            <div style={{
              color:
                  roomInfo.waiting == "승인"
                      ? "green"
                      : roomInfo.waiting == "거절"
                          ? "red"
                          : "lightGray",
              // marginTop: "10px",
              fontSize: "15px",
              paddingTop: "7px",
              paddingBottom: "7px",
              marginBottom: "5px",
            }}>[ {roomInfo.waiting} ]</div>
            <div style={{marginBottom: "20px"}}>{roomInfo.timing}</div>
            <div style={{margin: "0px auto"}}>
              <KakaoShareBtn />
            </div>

          </div>
        </Grid> */}

        {/*<CartWidget totalItems={checkout.totalItems} />*/}

        {/*{product && (*/}
        {/*  <>*/}
        {/*    <Grid container spacing={3}>*/}
        {/*      <Grid item xs={12} md={6} lg={7}>*/}
        {/*        <ProductDetailsCaÏprousel product={product} />*/}
        {/*      </Grid>*/}

        {/*      <Grid item xs={12} md={6} lg={5}>*/}
        {/*        <ProductDetailsSummary*/}
        {/*          product={product}*/}
        {/*          cart={checkout.cart}*/}
        {/*          onAddCart={handleAddCart}*/}
        {/*          onGotoStep={handleGotoStep}*/}
        {/*        />*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}

        {/*    <Box*/}
        {/*      gap={5}*/}
        {/*      display="grid"*/}
        {/*      gridTemplateColumns={{*/}
        {/*        xs: 'repeat(1, 1fr)',*/}
        {/*        md: 'repeat(3, 1fr)',*/}
        {/*      }}*/}
        {/*      sx={{ my: 10 }}*/}
        {/*    >*/}
        {/*      {SUMMARY.map((item) => (*/}
        {/*        <Box key={item.title} sx={{ textAlign: 'center' }}>*/}
        {/*          <Stack*/}
        {/*            alignItems="center"*/}
        {/*            justifyContent="center"*/}
        {/*            sx={{*/}
        {/*              width: 64,*/}
        {/*              height: 64,*/}
        {/*              mx: 'auto',*/}
        {/*              borderRadius: '50%',*/}
        {/*              color: 'primary.main',*/}
        {/*              bgcolor: (theme) => `${alpha(theme.palette.primary.main, 0.08)}`,*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            <Iconify icon={item.icon} width={36} />*/}
        {/*          </Stack>*/}

        {/*          <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>*/}
        {/*            {item.title}*/}
        {/*          </Typography>*/}

        {/*          <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>*/}
        {/*        </Box>*/}
        {/*      ))}*/}
        {/*    </Box>*/}

        {/*    <Card>*/}
        {/*      <Tabs*/}
        {/*        value={currentTab}*/}
        {/*        onChange={(event, newValue) => setCurrentTab(newValue)}*/}
        {/*        sx={{ px: 3, bgcolor: 'background.neutral' }}*/}
        {/*      >*/}
        {/*        {TABS.map((tab) => (*/}
        {/*          <Tab key={tab.value} value={tab.value} label={tab.label} />*/}
        {/*        ))}*/}
        {/*      </Tabs>*/}

        {/*      <Divider />*/}

        {/*      {TABS.map(*/}
        {/*        (tab) =>*/}
        {/*          tab.value === currentTab && (*/}
        {/*            <Box*/}
        {/*              key={tab.value}*/}
        {/*              sx={{*/}
        {/*                ...(currentTab === 'description' && {*/}
        {/*                  p: 3,*/}
        {/*                }),*/}
        {/*              }}*/}
        {/*            >*/}
        {/*              {tab.component}*/}
        {/*            </Box>*/}
        {/*          )*/}
        {/*      )}*/}
        {/*    </Card>*/}
        {/*  </>*/}
        {/*)}*/}

        {/*{isLoading && <SkeletonProductDetails />}*/}

        <div
          style={{
            padding: '7px',
            borderRadius: '20px',
            backgroundColor: '#f8f9fa',
            width: '350px',
            margin: '0 auto',
            marginBottom: '100px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                color:
                  roomInfo.waiting == '승인'
                    ? 'green'
                    : roomInfo.waiting == '거절'
                    ? 'red'
                    : 'lightGray',
                // marginTop: "10px",
                fontSize: '15px',
                paddingTop: '7px',
                paddingBottom: '7px',
                marginBottom: '5px',
              }}
            >
              [ {roomInfo.waiting} ]
            </div>
            <div
              style={{
                fontSize: '12px',
                marginTop: '7px',
                textAlign: 'right',
              }}
            >
              {roomInfo.application + ' 신청'}
            </div>
          </div>
          <div>
            <img src={room} />
          </div>
          <div
            style={{
              marginTop: '10px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {roomInfo.name}
          </div>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                marginTop: '7px',
                width: '50%',
                fontSize: '12px',
                textAlign: 'center',
                borderRight: '3px solid white',
              }}
            >
              <div style={{ color: 'gray' }}>{'예약 날짜'}</div>
              <div
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                {roomInfo.reservation}
              </div>
            </div>
            <div
              style={{
                marginTop: '7px',
                width: '50%',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              <div style={{ color: 'gray' }}>{'예약 시간'}</div>
              <div style={{ marginTop: '10px', marginBottom: '10px' }}>{roomInfo.time}</div>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
            <div style={{ width: '4%' }}></div>
          </div>
          <div></div>
          <div
            style={{
              marginBottom: '20px',
            }}
          >
            {RoomDetail.map((r, i) => {
              return <div style={{ marginLeft: '20px' }}>{'- ' + r}</div>;
            })}
          </div>
        </div>
      </Container>
    </>
  );
}
