'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../lib/useAuth';
import { supabase } from '../../../lib/supabaseClient';
import { chapters, BOOK_TITLE, BOOK_HANJA } from '../../../lib/chapters';

export default function BookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

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
          <p className="hanja-eyebrow">{BOOK_HANJA}</p>
          <h1 className="book-title">{BOOK_TITLE}</h1>
          <p className="book-tagline">— 정천마 분투기 —</p>
          <hr className="rule" />
          <p className="lede">
            여의경(如意境)의 대마두이나, 실상은 매미 한 마리에도 무너지는 정천마의
            찌질하고 웅장한 무림 분투기.
          </p>

          <div className="chapter-list">
            {chapters.map((c) => (
              <Link key={c.id} href={`/chapter/${c.id}`} className="chapter-card">
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