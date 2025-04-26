import PostList from '../components/PostList';

export default function HomePage() {
  return (
    <section>
      <h2 style={{ margin: '2rem 0 1.2rem' }}>📰 최신 뉴스/블로그</h2>
      <PostList />
    </section>
  );
}
