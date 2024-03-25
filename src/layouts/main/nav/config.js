// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    auth: false,
    icon: <Iconify icon="eva:home-fill" />,
    path: '',
  },
  {
    title: '대여내역',
    auth: false,
    icon: <Iconify icon="ic:round-grain" />,
    path: '/reservation',
  },
  {
    title: '공간관리',
    auth: true,
    icon: <Iconify icon="ic:round-grain" />,
    path: '/manage-rooms',
  },
  {
    title: '대여관리',
    auth: true,
    icon: <Iconify icon="ic:round-grain" />,
    path: '/waiting',
  },
  {
    title: '사용자 관리',
    auth: true,
    icon: <Iconify icon="ic:round-grain" />,
    path: '/user-list',
  },
  {
    title: '내 사이트',
    auth: false,
    icon: <Iconify icon="ic:round-grain" />,
    path: '/site-list',
  },
];

export default navConfig;
