import { chapters, BOOK_TITLE, BOOK_HANJA, BOOK_AUTHOR, BOOK_PUBLISHER } from './chapters';
import {
  chapters as agaChapters,
  BOOK_TITLE as AGA_TITLE,
  BOOK_AUTHOR as AGA_AUTHOR,
  BOOK_PUBLISHER as AGA_PUBLISHER,
} from './chapters-aga';

// 작품이 더 늘어나면 이 배열에 객체만 하나씩 추가하면 됩니다.
export const books = [
  {
    id: 'hunma',
    title: BOOK_TITLE,
    hanja: BOOK_HANJA,
    author: BOOK_AUTHOR,
    publisher: BOOK_PUBLISHER,
    tagline: '— 정천마 분투기 —',
    teaser:
      '여의경(如意境)의 대마두이나, 실상은 매미 한 마리에도 무너지는 정천마의 찌질하고 웅장한 무림 분투기.',
    cover: '/covers/hunma.jpg',
    chapters,
  },
  {
    id: 'aga',
    title: AGA_TITLE,
    hanja: null,
    author: AGA_AUTHOR,
    publisher: AGA_PUBLISHER,
    tagline: "별명이 '아가'인 민균이의 우당탕탕 학교생활",
    teaser:
      '입학식부터 사고 치고, 첫사랑 앞에서 자기 이름마저 잊어버린 아가(김민균)의 좌충우돌 초등학교 생존기.',
    cover: '/covers/aga.png',
    chapters: agaChapters,
  },
];