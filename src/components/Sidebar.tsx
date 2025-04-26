'use client';

import { Box, Typography, Chip, Paper, Stack } from '@mui/material';
import Link from 'next/link';

// 인기 태그 mock 데이터
const popularTags = [
  { tag: 'nextjs', count: 45 },
  { tag: 'react', count: 36 },
  { tag: 'ai', count: 24 },
  { tag: 'typescript', count: 14 },
  { tag: 'webdev', count: 10 },
  { tag: 'news', count: 7 },
];

export default function Sidebar() {
  return (
    <Box
      component='aside'
      sx={{
        width: 260,
        flexShrink: 0,
        pr: 4,
        display: { xs: 'none', md: 'block' },
        position: 'sticky',
        top: 100,
        alignSelf: 'flex-start',
        height: 'fit-content',
      }}
    >
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant='h6' fontWeight={800} gutterBottom>
          뉴스블로그 요약기
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          AI가 추천하는 최신 뉴스와 블로그를 한눈에!
          <br />
          관심 태그로 모아보고, 한 줄 요약까지.
        </Typography>
      </Paper>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant='subtitle1' fontWeight={700} gutterBottom>
          🔥 인기 태그
        </Typography>
        <Stack direction='row' spacing={0} flexWrap='wrap'>
          {popularTags.map((tag) => (
            <Chip
              key={tag.tag}
              label={
                <span>
                  #{tag.tag}{' '}
                  <small style={{ color: '#999' }}>({tag.count})</small>
                </span>
              }
              component={Link}
              href={`/tags/${tag.tag}`}
              clickable
              sx={{
                m: '2px 2px 6px 0',
                fontWeight: 600,
                transition: 'all .15s linear',
              }}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
