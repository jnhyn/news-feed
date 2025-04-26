export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return (
    <main>
      <h1>태그별 뉴스/블로그 목록</h1>
      <p>태그: {tag}</p>
    </main>
  );
}
