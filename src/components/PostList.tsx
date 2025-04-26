'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from '@tanstack/react-query';
import PostCard from './PostCard';
import { getPosts, Post } from '../mocks/getPosts';
import { Box, CircularProgress } from '@mui/material';

const PAGE_SIZE = 10;

export default function PostList() {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => getPosts(pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  if (status === 'pending') return <CircularProgress />;
  if (!data) return null;

  const allPosts: Post[] = data.pages.flat();

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <CircularProgress />
        </Box>
      }
      endMessage={
        <Box textAlign='center' color='text.secondary'>
          모든 뉴스/블로그를 다 보셨습니다!
        </Box>
      }
    >
      {allPosts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </InfiniteScroll>
  );
}
