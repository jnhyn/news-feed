import { Box, Typography, Chip, Paper } from '@mui/material';

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // 실제 서비스에서는 id로 데이터 fetch. 여기선 샘플
  const post = {
    id,
    title: 'Next.js 15 출시! 무엇이 달라졌을까?',
    thumbnail:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80',
    summary: 'Next.js 15의 주요 변화와 마이그레이션 팁을 정리했습니다.',
    tags: ['nextjs', 'release', 'react'],
    date: '2024-06-01',
    content: `실제 본문 예시. 주요 변경 사항을 설명합니다...`,
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', py: 4 }}>
      <Typography variant='h4' fontWeight={700}>
        {post.title}
      </Typography>
      <Typography variant='caption' color='text.secondary'>
        {post.date}
      </Typography>
      <Box sx={{ my: 2 }}>
        {post.tags.map((tag) => (
          <Chip label={tag} key={tag} size='small' sx={{ mr: 0.5 }} />
        ))}
      </Box>
      <img
        src={post.thumbnail}
        style={{
          width: '100%',
          maxHeight: 300,
          objectFit: 'cover',
          borderRadius: 8,
        }}
        alt={post.title}
      />

      {/* AI 요약 박스 */}
      <Paper variant='outlined' sx={{ my: 3, p: 2, background: '#f3f3fa' }}>
        <b>AI 요약</b>
        <Typography variant='body2' sx={{ mt: 1 }}>
          {post.summary}
        </Typography>
      </Paper>

      <Typography sx={{ mt: 3 }}>{post.content}</Typography>
    </Box>
  );
}
