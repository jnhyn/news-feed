'use client';

import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { lightTheme, darkTheme } from '../styles/theme';
import { useThemeStore } from '../store/useThemeStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkMode = useThemeStore((state) => state.darkMode);

  return (
    <html lang='ko'>
      <body>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Header />
          <Container maxWidth='md'>
            <main>{children}</main>
          </Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
