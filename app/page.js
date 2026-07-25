'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/useAuth';
import { supabase } from '../lib/supabaseClient';
import { chapters, BOOK_TITLE, BOOK_HANJA } from '../lib/chapters';
import AuthModal from './components/AuthModal';

export default function HomePage() {
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  function openAuth(mode) {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="paper">
      <div className="top-account">
        {loading ? null : user ? (
          <>
            <span>{user.user_metadata?.name || user.email}님, 어서 오십시오</span>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <button onClick={() => openAuth('login')}>이미 입교했다면 로그인</button>
        )}
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
            찌질하고 웅장한 무림 분투기. 전체 내용은 무료 입교(회원가입) 후
            열람하실 수 있습니다.
          </p>

          {!loading && !user && (
            <div className="cta-wrap">
              <button className="btn" onClick={() => openAuth('signup')}>
                무료로 입교하기
              </button>
            </div>
          )}

          <div className="chapter-list">
            {chapters.map((c) => (
              <ChapterCard
                key={c.id}
                chapter={c}
                unlocked={!!user}
                onLockedClick={() => openAuth('signup')}
              />
            ))}
          </div>
        </div>
      </div>

      {authOpen && (
        <AuthModal initialMode={authMode} onClose={() => setAuthOpen(false)} />
      )}
    </div>
  );
}

function ChapterCard({ chapter, unlocked, onLockedClick }) {
  const inner = (
    <>
      <div className="chapter-num">{chapter.cn}</div>
      <div className="chapter-meta">
        <div className="chapter-title-row">
          <p className="chapter-title">{chapter.title}</p>
          {chapter.hanja && <span className="chapter-hanja">{chapter.hanja}</span>}
        </div>
        <p className="chapter-teaser">{chapter.teaser}</p>
      </div>
      {unlocked ? (
        <span className="unlock-badge">열람 가능</span>
      ) : (
        <span className="lock-badge">입교 후 열람</span>
      )}
    </>
  );

  if (unlocked) {
    return (
      <Link href={`/chapter/${chapter.id}`} className="chapter-card">
        {inner}
      </Link>
    );
  }

  return (
    <div className="chapter-card" onClick={onLockedClick} role="button" tabIndex={0}>
      {inner}
    </div>
  );
}
