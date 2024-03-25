import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Minimal',
    children: [
      { name: 'About us', href: PATH_PAGE.about },
      { name: 'Contact us', href: PATH_PAGE.contact },
      { name: 'FAQs', href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'support@minimals.cc', href: '#' },
      { name: 'Los Angeles, 359  Hidden Valley Road', href: '#' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function HisSpaceFooter() {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            pb: 5,
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          <Logo sx={{ mx: { xs: 'auto' } }} />
          © 2023. All rights reserved <br /> 홍성헌 이인혁 방제형
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container sx={{ pt: 10 }}>
        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            pb: 5,
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          <Logo sx={{ mx: { xs: 'auto' } }} />
          © 2023. All rights reserved <br /> 홍성헌 이인혁 방제형
        </Typography>
      </Container>
    </Box>
  );

  return isHome ? simpleFooter : mainFooter;
}
