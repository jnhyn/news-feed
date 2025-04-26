'use client';

import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import { lightTheme, darkTheme } from '../styles/theme';
import { useThemeStore } from '../store/useThemeStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

// ✅ react-query 추가!
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <Header />
            <Container maxWidth='lg' sx={{ my: 3 }}>
              <Box display='flex' flexDirection='row' gap={4}>
                <Sidebar />
                <Box flex={1} component='main' minWidth={0}>
                  {children}
                </Box>
              </Box>
            </Container>
            <Footer />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
