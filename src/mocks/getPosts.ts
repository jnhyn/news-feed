// src/mocks/getPosts.ts
export type Post = {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  tags: string[];
  date: string;
};

const ALL_MOCK_POSTS: Post[] = Array.from({ length: 50 }, (_, idx) => ({
  id: (idx + 1).toString(),
  title: `샘플 뉴스/블로그 #${idx + 1}`,
  thumbnail:
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=400&q=80',
  summary: 'AI가 작성한 샘플 요약입니다.',
  tags: ['nextjs', 'react', 'ai', 'webdev'].filter((_, i) => i <= idx % 4),
  date: `2024-06-${(idx % 28) + 1}`,
}));

export async function getPosts(
  page: number,
  limit: number = 10
): Promise<Post[]> {
  await new Promise((res) => setTimeout(res, 500)); // 네트워크 딜레이 흉내
  const start = (page - 1) * limit;
  return ALL_MOCK_POSTS.slice(start, start + limit);
}
