import { chapters, BOOK_TITLE, BOOK_HANJA } from './chapters';

// 나중에 다른 작품이 생기면 이 배열에 객체만 하나 더 추가하면 됩니다.
export const books = [
  {
    id: 'hunma',
    title: BOOK_TITLE,
    hanja: BOOK_HANJA,
    tagline: '— 정천마 분투기 —',
    teaser:
      '여의경(如意境)의 대마두이나, 실상은 매미 한 마리에도 무너지는 정천마의 찌질하고 웅장한 무림 분투기.',
    chapterCount: chapters.length,
    cover: '/covers/hunma.jpg',
  },
];