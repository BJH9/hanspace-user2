// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import { StyledChart } from './components/chart';
import SnackbarProvider from './components/snackbar';
import { ThemeSettings } from './components/settings';
import { MotionLazyContainer } from './components/animate';

// ----------------------------------------------------------------------
// import { useState, useEffect } from 'react';
// import { getSiteUserInfo } from './api/GoogleUser';

export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <ThemeLocalization>
            <SnackbarProvider>
              <StyledChart />
              <Router />
            </SnackbarProvider>
          </ThemeLocalization>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
