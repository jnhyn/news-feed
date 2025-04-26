'use client';

import { useCallback } from 'react';
import { Box, InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchStore } from '../store/useSearchStore';
import { useRouter } from 'next/navigation';

export default function SearchBar({
  autoFocus = false,
}: {
  autoFocus?: boolean;
}) {
  const { keyword, setKeyword, addRecent } = useSearchStore();
  const router = useRouter();
  // const timer = useRef<NodeJS.Timeout | null>(null);

  // Debounce for typing (검색 페이지 실시간 결과엔 debounce로!)
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setKeyword(value);
    },
    [setKeyword]
  );

  // 엔터 or 버튼 누르면 /search로 이동 & 최근검색 추가
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setKeyword('');
      if (keyword.trim()) {
        addRecent(keyword.trim());
        router.push('/search');
      }
    },
    [keyword, addRecent, router]
  );

  return (
    <Box component='form' onSubmit={onSubmit} sx={{ my: 1 }}>
      <Paper
        sx={{
          p: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3,
        }}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder='검색어를 입력하세요...'
          value={keyword}
          onChange={onChange}
          autoFocus={autoFocus}
        />
        <IconButton type='submit'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
