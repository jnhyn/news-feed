import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
} from '@mui/material';
import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  tags: string[];
  date: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card
      sx={{
        display: 'flex',
        mb: 2,
        borderRadius: 2,
        boxShadow: 2,
        minHeight: 120,
      }}
    >
      <CardMedia
        component='img'
        sx={{
          width: 120,
          borderRadius: '0 0 0 8px', // 오른쪽 top, bottom은 radius 없음, 왼쪽 아래만 radius
          objectFit: 'cover',
        }}
        image={post.thumbnail}
        alt={post.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography
            component={Link}
            href={`/post/${post.id}`}
            variant='h6'
            sx={{ textDecoration: 'none' }}
          >
            {post.title}
          </Typography>
          <Box sx={{ mt: 1, mb: 1 }}>
            {post.tags.map((tag) => (
              <Chip
                label={tag}
                component={Link}
                href={`/tags/${tag}`}
                key={tag}
                size='small'
                sx={{ mr: 0.5 }}
                clickable
              />
            ))}
          </Box>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 1 }}
            noWrap
          >
            {post.summary}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='caption' color='text.secondary'>
              {post.date}
            </Typography>
            <Button
              component={Link}
              href={`/post/${post.id}`}
              size='small'
              variant='outlined'
            >
              요약 보기
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
