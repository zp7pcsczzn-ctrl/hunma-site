'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../lib/useAuth';
import { supabase } from '../../../lib/supabaseClient';
import { books } from '../../../lib/books';

export default function BookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const book = books.find((b) => b.id === params.id);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [loading, user, router]);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return <div className="paper"><p className="center-note">불러오는 중...</p></div>;
  }
  if (!user) {
    return <div className="paper"><p className="center-note">입교 후 열람 가능합니다. 서고로 이동합니다...</p></div>;
  }
  if (!book) {
    return (
      <div className="paper">
        <p className="center-note">존재하지 않는 서책입니다.</p>
        <p style={{ textAlign: 'center' }}>
          <Link href="/">서고로 돌아가기</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="paper">
      <Link href="/" className="back-link">← 서고로 돌아가기</Link>

      <div className="top-account">
        <span>{user.user_metadata?.name || user.email}님, 어서 오십시오</span>
        <button onClick={handleLogout}>로그아웃</button>
      </div>

      <div className="frame">
        <div className="corner tl"></div>
        <div className="corner tr"></div>
        <div className="corner bl"></div>
        <div className="corner br"></div>
        <div className="frame-inner">
          {book.hanja && <p className="hanja-eyebrow">{book.hanja}</p>}
          <h1 className="book-title">{book.title}</h1>
          <p className="book-tagline">{book.tagline}</p>
          <hr className="rule" />
          <p className="lede">{book.teaser}</p>

          <div className="chapter-list">
            {book.chapters.map((c) => (
              <Link key={c.id} href={`/chapter/${book.id}/${c.id}`} className="chapter-card">
                <div className="chapter-num">{c.cn}</div>
                <div className="chapter-meta">
                  <div className="chapter-title-row">
                    <p className="chapter-title">{c.title}</p>
                    {c.hanja && <span className="chapter-hanja">{c.hanja}</span>}
                  </div>
                  <p className="chapter-teaser">{c.teaser}</p>
                </div>
                <span className="unlock-badge">열람 가능</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}