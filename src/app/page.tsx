import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>홈: 최신 뉴스/블로그 목록</h1>
      <ul>
        <li>
          <Link href='/post/1'>첫 번째 기사 상세</Link>
        </li>
        <li>
          <Link href='/tags/nextjs'>nextjs 태그 목록</Link>
        </li>
        <li>
          <Link href='/search'>검색</Link>
        </li>
        <li>
          <Link href='/settings'>설정/정보</Link>
        </li>
      </ul>
    </main>
  );
}
