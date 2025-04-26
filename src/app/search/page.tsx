'use client';

import { useSearchStore } from '../../store/useSearchStore';
import SearchBar from '../../components/SearchBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts, Post } from '../../mocks/getPosts';
import { Box, Chip, Typography, CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from '../../components/PostCard';

// 검색 필터용 함수
function filterPosts(posts: Post[], keyword: string) {
  const lc = keyword.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(lc) ||
      p.summary.toLowerCase().includes(lc) ||
      p.tags.join(' ').toLowerCase().includes(lc)
  );
}

export default function SearchPage() {
  const { keyword, setKeyword, recentKeywords, addRecent, clearRecent } =
    useSearchStore();

  // react-query 무한스크롤, 검색필터 로직
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['search', keyword],
    queryFn: async ({ pageParam = 1 }) => {
      const raw = await getPosts(pageParam, 12);
      // 필터링은 프론트에서 (실제는 백엔드에서)
      return filterPosts(raw, keyword);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: !!keyword.trim(),
  });

  const onRecentClick = (kw: string) => {
    setKeyword(kw);
    addRecent(kw);
  };

  /**
   * Highlights occurrences of a keyword within a given text by wrapping them in a `<mark>`-like syntax.
   *
   * @param text - The input string to search within.
   * @param kw - The keyword to highlight. If empty or not provided, the original text is returned unmodified.
   * @returns A string where the keyword occurrences are wrapped in a `**` to simulate highlighting.
   */
  const highlight = (text: string, keyword: string): string =>
    keyword
      ? text
          .split(new RegExp(`(${keyword})`, 'gi'))
          .map((part) =>
            part.toLowerCase() === keyword.toLowerCase() ? `**${part}**` : part
          )
          .join('')
      : text;

  return (
    <section>
      <Typography variant='h5' fontWeight={800} gutterBottom>
        🔍 뉴스/블로그 검색
      </Typography>
      <SearchBar autoFocus />
      {/* 최근 검색어 Chip */}
      {!!recentKeywords.length && (
        <Box my={1} display='flex' alignItems='center'>
          <Typography variant='body2' sx={{ mr: 1 }}>
            최근 검색:
          </Typography>
          {recentKeywords.map((kw) => (
            <Chip
              key={kw}
              label={kw}
              onClick={() => onRecentClick(kw)}
              sx={{ mx: 0.25 }}
            />
          ))}
          <Chip
            label='전체삭제'
            variant='outlined'
            size='small'
            onClick={clearRecent}
            sx={{ ml: 1 }}
          />
        </Box>
      )}

      {keyword.trim() ? (
        <Box>
          {!data ? (
            <Box p={3} textAlign='center'>
              <CircularProgress />
            </Box>
          ) : (
            <InfiniteScroll
              dataLength={data.pages.reduce((n, p) => n + p.length, 0)}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={
                <Box sx={{ py: 2, textAlign: 'center' }}>
                  <CircularProgress />
                </Box>
              }
              endMessage={
                <Box color='text.secondary' p={2} textAlign='center'>
                  끝까지 검색 결과를 모두 불러왔습니다.
                </Box>
              }
            >
              {data.pages.flat().length === 0 ? (
                <Box p={3} textAlign='center' color='text.secondary'>
                  {`"${keyword}"`} 에 대한 검색 결과를 찾을 수 없습니다. 다른
                  검색어를 입력해 보세요.
                </Box>
              ) : (
                data.pages.flat().map((post) => (
                  <Box key={post.id} mb={2}>
                    <PostCard
                      post={{
                        ...post,
                        // 제목, 요약 하이라이트 처리
                        title: highlight(post.title, keyword),
                        summary: highlight(post.summary, keyword),
                      }}
                    />
                  </Box>
                ))
              )}
            </InfiniteScroll>
          )}
        </Box>
      ) : (
        <Box color='text.secondary' p={3} textAlign='center'>
          검색어를 입력하세요.
        </Box>
      )}
    </section>
  );
}
