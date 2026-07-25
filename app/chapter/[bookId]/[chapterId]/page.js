'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../../lib/useAuth';
import { books } from '../../../../lib/books';

export default function ChapterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();

  const book = books.find((b) => b.id === params.bookId);
  const bookChapters = book ? book.chapters : [];
  const idx = bookChapters.findIndex((c) => c.id === params.chapterId);
  const chapter = bookChapters[idx];
  const prev = bookChapters[idx - 1];
  const next = bookChapters[idx + 1];

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [loading, user, router]);

  if (loading) {
    return <div className="paper"><p className="center-note">불러오는 중...</p></div>;
  }
  if (!user) {
    return <div className="paper"><p className="center-note">입교 후 열람 가능한 장입니다. 서고로 이동합니다...</p></div>;
  }
  if (!book || !chapter) {
    return (
      <div className="paper">
        <p className="center-note">존재하지 않는 장입니다.</p>
        <p style={{ textAlign: 'center' }}>
          <Link href="/">서고로 돌아가기</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="paper">
      <Link href={`/book/${book.id}`} className="back-link">← 목차로 돌아가기</Link>

      <div className="frame">
        <div className="corner tl"></div>
        <div className="corner tr"></div>
        <div className="corner bl"></div>
        <div className="corner br"></div>
        <div className="frame-inner">
          <p className="running-head">{book.title} · {chapter.label}</p>
          <p className="ch-num">{chapter.cn}</p>
          <h2 className="ch-title">{chapter.title}</h2>
          {chapter.hanja && <p className="ch-hanja">{chapter.hanja}</p>}
          {chapter.epigraph && <p className="epigraph">{chapter.epigraph}</p>}
          <hr className="rule" />

          {chapter.paras.map(([kind, text], i) => (
            <ParaLine key={i} kind={kind} text={text} />
          ))}

          <p className="ch-end">— {chapter.label} 끝 —</p>
          <p className="colophon">
            {book.title} · 지은이 {book.author} · 출판 {book.publisher}
          </p>

          <div className="ch-nav">
            {prev ? (
              <Link href={`/chapter/${book.id}/${prev.id}`} className="btn ghost" style={{ textDecoration: 'none' }}>
                ← 이전 장
              </Link>
            ) : (
              <span className="btn ghost disabled-link">← 이전 장</span>
            )}
            {next ? (
              <Link href={`/chapter/${book.id}/${next.id}`} className="btn ghost" style={{ textDecoration: 'none' }}>
                다음 장 →
              </Link>
            ) : (
              <span className="btn ghost disabled-link">다음 장 →</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ParaLine({ kind, text }) {
  if (kind === 'body') return <p className="body-p">{text}</p>;
  if (kind === 'dialogue') return <p className="dialogue-p">{text}</p>;
  if (kind === 'sfx') return <p className="sfx-p">{text}</p>;
  if (kind === 'tech') return <p className="tech-p">{text}</p>;
  return null;
}