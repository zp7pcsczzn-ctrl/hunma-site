import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: '훈마서기 — 정천마 분투기',
  description: '여의경의 대마두, 그러나 실상은 찌질한 정천마의 무림 분투기. 무료 입교(회원가입) 후 전체 장을 열람하세요.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}