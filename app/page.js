'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/useAuth';
import { supabase } from '../lib/supabaseClient';
import { books } from '../lib/books';
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
    <div className="library">
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

      <div className="library-header">
        <p className="hanja-eyebrow">武 林 書 庫</p>
        <h1 className="library-title">무림서고</h1>
        <p className="library-sub">읽고 싶은 서책을 골라주세요</p>
      </div>

      {!loading && !user && (
        <div className="cta-wrap">
          <button className="btn" onClick={() => openAuth('signup')}>
            무료로 입교하기
          </button>
        </div>
      )}

      <div className="book-grid">
        {books.map((b) => (
          <BookCover
            key={b.id}
            book={b}
            unlocked={!!user}
            onLockedClick={() => openAuth('signup')}
          />
        ))}
      </div>

      {authOpen && (
        <AuthModal initialMode={authMode} onClose={() => setAuthOpen(false)} />
      )}
    </div>
  );
}

function BookCover({ book, unlocked, onLockedClick }) {
  const inner = (
    <>
      <div
        className="book-cover-art"
        style={{ backgroundImage: `url(${book.cover})` }}
      >
        <span className="book-cover-title-overlay">{book.title}</span>
        {!unlocked && <span className="book-cover-lock">입교 후 열람</span>}
      </div>
      <div className="book-cover-info">
        <p className="book-cover-name">{book.title}</p>
        <p className="book-cover-tagline">{book.tagline}</p>
      </div>
    </>
  );

  if (unlocked) {
    return (
      <Link href={`/book/${book.id}`} className={`book-cover-card`}>
        {inner}
      </Link>
    );
  }

  return (
    <div
      className="book-cover-card locked"
      onClick={onLockedClick}
      role="button"
      tabIndex={0}
    >
      {inner}
    </div>
  );
}