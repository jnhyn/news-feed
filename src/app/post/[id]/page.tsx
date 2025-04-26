export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <h1>개별 기사 상세 페이지</h1>
      <p>기사 ID: {id}</p>
    </main>
  );
}
