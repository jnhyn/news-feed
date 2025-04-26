import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ mt: 5, py: 2, textAlign: 'center', color: 'text.secondary' }}>
      <Typography variant='caption'>
        &copy; {new Date().getFullYear()} MyNews | 데이터 소스: 여러 뉴스/블로그
        | <a href='mailto:contact@example.com'>문의</a>
      </Typography>
    </Box>
  );
}
