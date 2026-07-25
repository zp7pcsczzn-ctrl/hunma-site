'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AuthModal({ initialMode = 'signup', onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [stamped, setStamped] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    setBusy(true);

    if (mode === 'signup') {
      if (!name.trim()) {
        setMsg('도호(이름)를 입력해 주세요.');
        setBusy(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name.trim() } },
      });
      if (error) {
        setMsg(translateError(error.message));
        setBusy(false);
        return;
      }
      setStamped(true);
      setTimeout(() => onClose(), 900);
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMsg(translateError(error.message));
        setBusy(false);
        return;
      }
      setStamped(true);
      setTimeout(() => onClose(), 700);
    }
  }

  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-inner">
          <button className="modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>

          {stamped && (
            <div className="seal-wrap">
              <div className="seal stamped">入敎</div>
            </div>
          )}

          <p className="modal-title">
            {mode === 'signup' ? '훈마신교 입교 서약' : '다시 오셨군요'}
          </p>
          <p className="modal-sub">
            {mode === 'signup'
              ? '무료 입교 시 전체 장을 열람하실 수 있습니다'
              : '도호와 암구호로 로그인하세요'}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="field">
                <label>도호(이름)</label>
                <input
                  type="text"
                  placeholder="예: 정재훈"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="field">
              <label>이메일</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>암구호(비밀번호)</label>
              <input
                type="password"
                placeholder="6자 이상"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p className={'form-msg' + (msg ? ' err' : '')}>{msg}</p>

            <button className="btn" type="submit" disabled={busy}>
              {busy ? '처리 중...' : mode === 'signup' ? '입교하기' : '로그인'}
            </button>
          </form>

          <p className="switch-line">
            {mode === 'signup' ? (
              <>
                이미 입교하셨나요?{' '}
                <button onClick={() => { setMode('login'); setMsg(''); }}>
                  로그인
                </button>
              </>
            ) : (
              <>
                아직 입교 전이신가요?{' '}
                <button onClick={() => { setMode('signup'); setMsg(''); }}>
                  무료 입교하기
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function translateError(message) {
  if (!message) return '알 수 없는 오류가 발생했습니다.';
  if (message.includes('already registered') || message.includes('already exists')) {
    return '이미 입교한 도호(이메일)입니다. 로그인해 주세요.';
  }
  if (message.includes('Invalid login credentials')) {
    return '이메일 또는 암구호가 일치하지 않습니다.';
  }
  if (message.includes('Password should be at least')) {
    return '암구호는 6자 이상이어야 합니다.';
  }
  if (message.includes('valid email')) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return message;
}
