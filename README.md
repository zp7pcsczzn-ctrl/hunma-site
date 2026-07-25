# 훈마서기 웹사이트

무료 회원가입(입교) 후에만 본문을 열람할 수 있는 무협 콘텐츠 웹사이트입니다.
Next.js + Supabase(회원가입/로그인) 조합으로 만들었고, Vercel에 무료로 배포할 수 있습니다.

---

## 0. 준비물

- 이메일 계정 (Supabase, Vercel, GitHub 가입용 — 다 무료입니다)
- 컴퓨터에 [Node.js](https://nodejs.org) 설치 (LTS 버전)
- 터미널(명령 프롬프트) 사용법 기본

---

## 1. Supabase 프로젝트 만들기 (회원가입 기능 담당)

1. https://supabase.com 접속 → 회원가입 → "New project" 클릭
2. 프로젝트 이름(예: `hunma-seogi`), 비밀번호(DB용, 따로 기억해둘 것), 리전은 `Northeast Asia (Seoul)` 선택
3. 프로젝트가 생성되면 왼쪽 메뉴 **Settings → API**로 이동
4. 아래 두 값을 복사해둡니다.
   - `Project URL`
   - `anon public` 키
5. 왼쪽 메뉴 **Authentication → Providers → Email**이 켜져 있는지 확인 (기본값이 켜져 있음)
6. (선택) **Authentication → Settings**에서 "Confirm email"을 꺼두면, 가입 즉시 로그인되어 테스트가 편합니다. 실제 서비스라면 켜두는 걸 권장합니다.

---

## 2. 프로젝트 코드 준비

압축을 푼 폴더(`hunma-site`)에서 터미널을 열고:

```bash
npm install
cp .env.local.example .env.local
```

`.env.local` 파일을 열어서 1번에서 복사해둔 값을 넣습니다.

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi....(긴 문자열)
```

로컬에서 확인해보기:

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속 → 표지/목차가 보이고, "무료로 입교하기"로 실제 회원가입 테스트 가능합니다.
(가입한 계정은 Supabase 대시보드의 **Authentication → Users**에서 확인할 수 있습니다.)

---

## 3. GitHub에 올리기

```bash
git init
git add .
git commit -m "훈마서기 초기 버전"
```

GitHub에서 새 저장소(repository)를 만든 뒤 안내에 따라 push 합니다.

---

## 4. Vercel로 배포하기 (실제 인터넷 주소 생성)

1. https://vercel.com 접속 → GitHub 계정으로 로그인
2. "Add New... → Project" → 방금 올린 GitHub 저장소 선택 → Import
3. **Environment Variables** 항목에 `.env.local`에 넣었던 두 값을 그대로 추가
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. "Deploy" 클릭 → 1~2분 후 `https://프로젝트이름.vercel.app` 같은 실제 주소가 생성됩니다.

이 주소는 누구나 접속 가능하고, 회원가입해야만 본문을 볼 수 있는 상태로 작동합니다.

---

## 5. 다음 장 추가하는 방법

`lib/chapters.js` 파일의 `chapters` 배열에 새 장 객체를 추가하면 됩니다. 형식:

```js
{
  id: 'ch4',
  cn: '第四章',
  label: '제4장',
  title: '장 제목',
  hanja: '한자 부제 (없으면 null)',
  epigraph: '표제 인용구 (없으면 null)',
  teaser: '목차에 보일 짧은 미리보기 문장',
  paras: [
    ['body', '지문 문장'],
    ['dialogue', '“대사”'],
    ['sfx', '의성어—'],
    ['tech', '“필살기 시전 대사”'],
  ],
}
```

저장 후 GitHub에 push하면 Vercel이 자동으로 재배포합니다.

---

## 참고: 보안/운영 관련

- 비밀번호는 Supabase가 안전하게 암호화해서 저장합니다 (직접 암호화 코드를 짤 필요 없음).
- 무료 티어 기준: Supabase는 월 5만 명 활성 사용자, Vercel은 개인 프로젝트라면 충분한 무료 한도를 제공합니다.
- 커스텀 도메인(예: `hunmaseogi.com`)을 연결하고 싶다면 Vercel 프로젝트의 **Settings → Domains**에서 추가할 수 있습니다 (도메인 자체는 별도 구매 필요).
