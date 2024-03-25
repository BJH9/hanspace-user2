import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import {
  Container,
  Typography,
  Stack,
  Box,
  Fab,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import FormProvider from '../../components/hook-form';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterDrawer,
  ShopProductSearch,
  ReservationList,
} from '../../sections/@dashboard/e-commerce/shop';

import { Block } from '../../sections/_examples/Block';

import FilterDrawer from './FilterDrawer';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import { useParams } from 'react-router';
import { getSiteByLink } from 'src/api/site';
import { getSiteUserInfo } from 'src/api/GoogleUser';

// ----------------------------------------------------------------------

export default function EcommerceShopPage({
  user,
  setUser,
  siteUser,
  setSiteUser,
  site,
  setSite,
  login,
  setLogin,
}) {
  const { link } = useParams();
  useEffect(() => {
    if (link) {
      async function fetchSite() {
        await getSiteByLink(link).then(function (data) {
          if (sessionStorage.getItem('site') === null) {
            setSite(data);
            sessionStorage.setItem('site', JSON.stringify(data));
          } else {
            var s = JSON.parse(sessionStorage.getItem('site'));
            if (data.link != s.link) {
              setSite(data);
              sessionStorage.setItem('site', JSON.stringify(data));
              setUser();
              setSiteUser();
              setLogin(false);
              sessionStorage.removeItem('user');
              sessionStorage.removeItem('usersavedinfo');
            } else {
              setSite(data);
              if (sessionStorage.getItem('user') !== null) {
                setUser(JSON.parse(sessionStorage.getItem('user')));
                setLogin(true);
              }
            }
          }
        });
      }
      fetchSite();
    }
  }, [link]);

  useEffect(() => {
    if (user && site && !siteUser) {
      getSiteUserInfo(user.id, site.id).then(function (data) {
        sessionStorage.setItem('usersavedinfo', JSON.stringify(data));
        setSiteUser(data);
        if (data.status === 1) {
          alert('미승인 사용자입니다');
        }
      });
    }
  }, [user]);
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { products, checkout } = useSelector((state) => state.product);

  const [openFilter, setOpenFilter] = useState(false);

  const [toggleOpen, setToggleOpen] = useState(false);

  const [alignment, setAlignment] = React.useState('list');

  const handleToggleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleToggle = () => {
    setToggleOpen(!toggleOpen);
  };

  // filter 관련: 기간, 승인
  const [timingFilter, setTimingFilter] = useState('month3');
  const [waitingFilter, setWaitingFilter] = useState('all');

  // sort 관련: 최신순, 오래된순
  const [sortFilter, setSortFilter] = useState('latest');

  // 검색 관련
  const [searchFilter, setSearchFilter] = useState('');

  const defaultValues = {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: [0, 200],
    rating: '',
    sortBy: 'featured',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.gender &&
      !dirtyFields.category &&
      !dirtyFields.colors &&
      !dirtyFields.priceRange &&
      !dirtyFields.rating) ||
    false;

  const values = watch();

  const dataFiltered = applyFilter(products, values);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleResetFilter = () => {
    reset();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const floatButtonStyle = {
    margin: 0,
    top: 'auto',
    right: 60,
    bottom: -65,
    left: 'auto',
    position: 'fixed',
  };

  return (
    <>
      <Helmet>
        <title> Ecommerce: Shop | Minimal UI</title>
      </Helmet>

      <FormProvider methods={methods}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs links={[{ name: '예약 내역' }]} />

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <ShopProductSearch searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
          </Stack>

          <Fab
            sx={{
              position: 'fixed',
              right: 140,
              left: 'auto',
              top: 'auto',
              bottom: 19,
            }}
          >
            <ShopProductSort setSortFilter={setSortFilter} />
          </Fab>

          <Fab
            sx={{
              position: 'fixed',
              right: 80,
              left: 'auto',
              top: 'auto',
              bottom: 19,
            }}
          >
            <ShopFilterDrawer
              isDefault={isDefault}
              open={openFilter}
              onOpen={handleOpenFilter}
              onClose={handleCloseFilter}
              onResetFilter={handleResetFilter}
              setTimingFilter={setTimingFilter}
              timingFilter={timingFilter}
              setWaitingFilter={setWaitingFilter}
              waitingFilter={waitingFilter}
            />
          </Fab>

          <Stack sx={{ mb: 3 }}>
            {!isDefault && (
              <>
                <Typography variant="body2" gutterBottom>
                  <strong>{dataFiltered.length}</strong>
                  &nbsp;Products found
                </Typography>

                <ShopTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
              </>
            )}
          </Stack>

          <Grid container justifyContent="flex-end">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleToggleChange}
              aria-label="Platform"
            >
              <ToggleButton value="list">리스트</ToggleButton>
              <ToggleButton value="card">카드</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {alignment === 'list' ? (
            <ShopProductList
              products={dataFiltered}
              loading={!products.length && isDefault}
              timingFilter={timingFilter}
              waitingFilter={waitingFilter}
              sortFilter={sortFilter}
              searchFilter={searchFilter}
            />
          ) : (
            <ReservationList />
          )}

          <div style={{ marginTop: '30px' }}></div>
        </Container>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products, filters) {
  const { gender, category, colors, priceRange, rating, sortBy } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }

  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }

  // FILTER PRODUCTS
  if (gender.length) {
    products = products.filter((product) => gender.includes(product.gender));
  }

  if (category !== 'All') {
    products = products.filter((product) => product.category === category);
  }

  if (colors.length) {
    products = products.filter((product) => product.colors.some((color) => colors.includes(color)));
  }

  if (min !== 0 || max !== 200) {
    products = products.filter((product) => product.price >= min && product.price <= max);
  }

  if (rating) {
    products = products.filter((product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRating > convertRating(rating);
    });
  }

  return products;
}
