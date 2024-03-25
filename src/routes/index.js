import { Navigate, useParams, useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: General
  GeneralAppPage,
  GeneralFilePage,
  GeneralBankingPage,
  GeneralBookingPage,
  GeneralEcommercePage,
  GeneralAnalyticsPage,
  // Dashboard: User
  UserListPage,
  UserEditPage,
  UserCardsPage,
  UserCreatePage,
  UserProfilePage,
  UserAccountPage,
  // Dashboard: Ecommerce
  EcommerceShopPage,
  EcommerceCheckoutPage,
  EcommerceProductListPage,
  EcommerceProductEditPage,
  EcommerceProductCreatePage,
  EcommerceProductDetailsPage,
  // ReservationPage,
  // Dashboard: Invoice
  InvoiceListPage,
  InvoiceDetailsPage,
  InvoiceCreatePage,
  InvoiceEditPage,
  // Dashboard: Blog
  BlogPostsPage,
  BlogPostPage,
  BlogNewPostPage,
  // Dashboard: FileManager
  FileManagerPage,
  // Dashboard: App
  ChatPage,
  MailPage,
  CalendarPage,
  KanbanPage,
  //
  BlankPage,
  PermissionDeniedPage,
  //
  Page500,
  Page403,
  Page404,
  HomePage,
  FaqsPage,
  AboutPage,
  Contact,
  PricingPage,
  PaymentPage,
  ComingSoonPage,
  MaintenancePage,
  //
  ComponentsOverviewPage,
  FoundationColorsPage,
  FoundationTypographyPage,
  FoundationShadowsPage,
  FoundationGridPage,
  FoundationIconsPage,
  //
  MUIAccordionPage,
  MUIAlertPage,
  MUIAutocompletePage,
  MUIAvatarPage,
  MUIBadgePage,
  MUIBreadcrumbsPage,
  MUIButtonsPage,
  MUICheckboxPage,
  MUIChipPage,
  MUIDataGridPage,
  MUIDialogPage,
  MUIListPage,
  MUIMenuPage,
  MUIPaginationPage,
  MUIPickersPage,
  MUIPopoverPage,
  MUIProgressPage,
  MUIRadioButtonsPage,
  MUIRatingPage,
  MUISliderPage,
  MUIStepperPage,
  MUISwitchPage,
  MUITablePage,
  MUITabsPage,
  MUITextFieldPage,
  MUITimelinePage,
  MUITooltipPage,
  MUITransferListPage,
  MUITreesViewPage,
  //
  DemoAnimatePage,
  DemoCarouselsPage,
  DemoChartsPage,
  DemoCopyToClipboardPage,
  DemoEditorPage,
  DemoFormValidationPage,
  DemoImagePage,
  DemoLabelPage,
  DemoLightboxPage,
  DemoMapPage,
  DemoMegaMenuPage,
  DemoMultiLanguagePage,
  DemoNavigationBarPage,
  DemoOrganizationalChartPage,
  DemoScrollbarPage,
  DemoSnackbarPage,
  DemoTextMaxLinePage,
  DemoUploadPage,
} from './elements';
import RoomDetail from '../pages/RoomDetail';
import FormValidationPage from '../pages/components/extra/FormValidationPage';
import GoogleLogin from 'src/components/GoogleLogin/GoogleLogin';
import FirstFilter from 'src/pages/FirstFilter';
import Test from '../pages/Test';
import Home from 'src/sections/filter/Home';
import OurMUIDataGridPage from '../pages/components/mui/OurMUIDataGridPage';
import ReservationTab from '../pages/components/mui/ReservationTab';
import ManageRooms from 'src/pages/ManageRooms';
import NavTabs from '../pages/components/mui/NavTabs';
import CreateSite from 'src/sections/manager/CreateSite';
import { CreateSiteDetail, SiteListPage } from 'src/sections/manager';
import SiteList from 'src/sections/manager/SiteList';
import SiteFormValidationPage from '../pages/components/extra/SiteFormValidationPage';
import OurTextField from '../pages/components/mui/OurTextField';
import UserList from 'src/pages/components/mui/UserList';
import ReservationPage from '../pages/ReservationPage';
import { getSiteUserInfo } from 'src/api/GoogleUser';

const sudata = {};

// ----------------------------------------------------------------------

export default function Router() {
  const [user, setUser] = useState();
  const [siteUser, setSiteUser] = useState();
  const [site, setSite] = useState();
  const [login, setLogin] = useState(false);

  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: <MainLayout />,
      children: [
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'ecommerce', element: <GeneralEcommercePage /> },
        { path: 'analytics', element: <GeneralAnalyticsPage /> },
        { path: 'banking', element: <GeneralBankingPage /> },
        { path: 'booking', element: <GeneralBookingPage /> },
        { path: 'file', element: <GeneralFilePage /> },
        {
          path: 'e-commerce',
          children: [
            {
              element: <Navigate to="/dashboard/e-commerce/shop" replace />,
              index: true,
            },
            { path: 'list', element: <EcommerceProductListPage /> },
            { path: 'product/new', element: <EcommerceProductCreatePage /> },
            {
              path: 'product/:name/edit',
              element: <EcommerceProductEditPage />,
            },
            { path: 'checkout', element: <EcommerceCheckoutPage /> },
          ],
        },
        {
          path: 'user',
          children: [
            {
              element: <Navigate to="/dashboard/user/profile" replace />,
              index: true,
            },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            {
              element: <Navigate to="/dashboard/invoice/list" replace />,
              index: true,
            },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },
        {
          path: 'blog',
          children: [
            {
              element: <Navigate to="/dashboard/blog/posts" replace />,
              index: true,
            },
            { path: 'posts', element: <BlogPostsPage /> },
            { path: 'post/:title', element: <BlogPostPage /> },
            { path: 'new', element: <BlogNewPostPage /> },
          ],
        },
        { path: 'files-manager', element: <FileManagerPage /> },
        {
          path: 'mail',
          children: [
            {
              element: <Navigate to="/dashboard/mail/all" replace />,
              index: true,
            },
            { path: 'label/:customLabel', element: <MailPage /> },
            { path: 'label/:customLabel/:mailId', element: <MailPage /> },
            { path: ':systemLabel', element: <MailPage /> },
            { path: ':systemLabel/:mailId', element: <MailPage /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <ChatPage />, index: true },
            { path: 'new', element: <ChatPage /> },
            { path: ':conversationKey', element: <ChatPage /> },
          ],
        },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'kanban', element: <KanbanPage /> },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main Routes
    {
      path: '/Hanspace',
      element: (
        <MainLayout
          user={user}
          site={site}
          siteUser={siteUser}
          setSite={setSite}
          setUser={setUser}
          setSiteUser={setSiteUser}
          login={login}
          setLogin={setLogin}
        />
      ),
      children: [
        {
          element: (
            <CreateSite
              user={user}
              site={site}
              siteUser={siteUser}
              setSite={setSite}
              setUser={setUser}
              setSiteUser={setSiteUser}
              login={login}
              setLogin={setLogin}
            />
          ),
          index: true,
        },
        { path: 'test', element: <Test /> },
        { path: 'room-detail', element: <RoomDetail /> },
        { path: 'home', element: <Home /> },
        {
          path: ':link',
          children: [
            {
              element: (
                <FirstFilter
                  user={user}
                  site={site}
                  setSite={setSite}
                  setUser={setUser}
                  siteUser={siteUser}
                  setSiteUser={setSiteUser}
                  login={login}
                  setLogin={setLogin}
                />
              ),
              index: true,
            },
            {
              path: 'waiting',
              element: (
                <NavTabs
                  user={user}
                  site={site}
                  setSite={setSite}
                  setUser={setUser}
                  siteUser={siteUser}
                  setSiteUser={setSiteUser}
                  login={login}
                  setLogin={setLogin}
                />
              ),
            },
            {
              path: 'user-list',
              element: (
                <UserList
                  user={user}
                  site={site}
                  setSite={setSite}
                  setUser={setUser}
                  siteUser={siteUser}
                  setSiteUser={setSiteUser}
                  login={login}
                  setLogin={setLogin}
                />
              ),
            },
            {
              path: 'manage-rooms',
              element: (
                <ManageRooms
                  user={user}
                  site={site}
                  setSite={setSite}
                  setUser={setUser}
                  siteUser={siteUser}
                  setSiteUser={setSiteUser}
                  login={login}
                  setLogin={setLogin}
                />
              ),
            },
            {
              path: 'site-list',
              element: (
                <SiteListPage
                  user={user}
                  site={site}
                  setSite={setSite}
                  setUser={setUser}
                  siteUser={siteUser}
                  setSiteUser={setSiteUser}
                  login={login}
                  setLogin={setLogin}
                />
              ),
            },
            {
              path: 'reservation',
              element: (
                <ReservationPage
                  user={user}
                  site={site}
                  setSite={setSite}
                  setUser={setUser}
                  siteUser={siteUser}
                  setSiteUser={setSiteUser}
                  login={login}
                  setLogin={setLogin}
                />
              ),
            },
          ],
        },

        // { path: "test", element: <Test /> },
        // { path: s'room-detail', element: <RoomDetail /> },
        // {
        //   path: 'first-filter',
        //   element: <FirstFilter user={user} login={login} />,
        // },
        // { path: 'waiting', element: <NavTabs /> },
        // { path: 'user-list', element: <UserList /> },
        // { path: 'about-us', element: <AboutPage /> },
        // { path: 'contact-us', element: <Contact /> },
        // { path: 'faqs', element: <FaqsPage /> },
        // { path: 'manage-rooms', element: <ManageRooms /> },
        // { path: 'create-site', element: <CreateSite /> },
        // { path: 'create-site-detail', element: <CreateSiteDetail /> },
        // { path: 'site-list', element: <SiteListPage /> },
        // { path: 'reservation', element: <ReservationPage /> },
        // {
        //   path: 'dashboard',
        //   children: [
        //     {
        //       path: 'e-commerce',
        //       children: [
        //         { path: 'shop', element: <EcommerceShopPage /> },
        //         { path: 'shop/:id', element: <EcommerceProductDetailsPage /> },
        //       ],
        //     },
        //   ],
        // },
        // Demo Components
        {
          path: 'components',
          children: [
            { element: <ComponentsOverviewPage />, index: true },
            {
              path: 'foundation',
              children: [
                {
                  element: <Navigate to="/components/foundation/colors" replace />,
                  index: true,
                },
                { path: 'colors', element: <FoundationColorsPage /> },
                { path: 'typography', element: <FoundationTypographyPage /> },
                { path: 'shadows', element: <FoundationShadowsPage /> },
                { path: 'grid', element: <FoundationGridPage /> },
                { path: 'icons', element: <FoundationIconsPage /> },
              ],
            },
            {
              path: 'mui',
              children: [
                {
                  element: <Navigate to="/components/mui/accordion" replace />,
                  index: true,
                },
                { path: 'accordion', element: <MUIAccordionPage /> },
                { path: 'alert', element: <MUIAlertPage /> },
                { path: 'autocomplete', element: <MUIAutocompletePage /> },
                { path: 'avatar', element: <MUIAvatarPage /> },
                { path: 'badge', element: <MUIBadgePage /> },
                { path: 'breadcrumbs', element: <MUIBreadcrumbsPage /> },
                { path: 'buttons', element: <MUIButtonsPage /> },
                { path: 'checkbox', element: <MUICheckboxPage /> },
                { path: 'chip', element: <MUIChipPage /> },
                { path: 'data-grid', element: <MUIDataGridPage /> },
                { path: 'dialog', element: <MUIDialogPage /> },
                { path: 'list', element: <MUIListPage /> },
                { path: 'menu', element: <MUIMenuPage /> },
                { path: 'pagination', element: <MUIPaginationPage /> },
                { path: 'pickers', element: <MUIPickersPage /> },
                { path: 'popover', element: <MUIPopoverPage /> },
                { path: 'progress', element: <MUIProgressPage /> },
                { path: 'radio-button', element: <MUIRadioButtonsPage /> },
                { path: 'rating', element: <MUIRatingPage /> },
                { path: 'slider', element: <MUISliderPage /> },
                { path: 'stepper', element: <MUIStepperPage /> },
                { path: 'switch', element: <MUISwitchPage /> },
                { path: 'table', element: <MUITablePage /> },
                { path: 'tabs', element: <MUITabsPage /> },
                { path: 'textfield', element: <MUITextFieldPage /> },
                { path: 'timeline', element: <MUITimelinePage /> },
                { path: 'tooltip', element: <MUITooltipPage /> },
                { path: 'transfer-list', element: <MUITransferListPage /> },
                { path: 'tree-view', element: <MUITreesViewPage /> },
              ],
            },
            {
              path: 'extra',
              children: [
                {
                  element: <Navigate to="/components/extra/animate" replace />,
                  index: true,
                },
                { path: 'animate', element: <DemoAnimatePage /> },
                { path: 'carousel', element: <DemoCarouselsPage /> },
                { path: 'chart', element: <DemoChartsPage /> },
                {
                  path: 'copy-to-clipboard',
                  element: <DemoCopyToClipboardPage />,
                },
                { path: 'editor', element: <DemoEditorPage /> },
                {
                  path: 'form-validation',
                  element: <DemoFormValidationPage />,
                },
                { path: 'image', element: <DemoImagePage /> },
                { path: 'label', element: <DemoLabelPage /> },
                { path: 'lightbox', element: <DemoLightboxPage /> },
                { path: 'map', element: <DemoMapPage /> },
                { path: 'mega-menu', element: <DemoMegaMenuPage /> },
                { path: 'multi-language', element: <DemoMultiLanguagePage /> },
                { path: 'navigation-bar', element: <DemoNavigationBarPage /> },
                {
                  path: 'organization-chart',
                  element: <DemoOrganizationalChartPage />,
                },
                { path: 'scroll', element: <DemoScrollbarPage /> },
                { path: 'snackbar', element: <DemoSnackbarPage /> },
                { path: 'text-max-line', element: <DemoTextMaxLinePage /> },
                { path: 'upload', element: <DemoUploadPage /> },
              ],
            },
          ],
        },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: 'pricing', element: <PricingPage /> },
        { path: 'payment', element: <PaymentPage /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
