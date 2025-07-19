import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './join.css';
import config from './config';

const Join = () => {
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [idConfirmed, setIdConfirmed] = useState(false); // 아이디 중복 확인 상태 추가
  //mutate

  const navigate = useNavigate();
  // 비밀번호 확인 및 회원가입 로직
  const handleJoin = async () => {
    if (!idConfirmed) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const accountIdTrimmed = accountId.trim();
    if (!accountIdTrimmed || !password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 회원가입 API 호출
    try {
      const response = await fetch(config.serverURL + '/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: accountIdTrimmed,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('서버 오류');
      }

      // 서버 응답
      const data = await response.json();

      if (data.success) {
        alert('회원가입 성공했습니다.');
        navigate('/login');
      } else {
        alert(data.data || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.log('서버 오류', error);
      alert('서버 오류');
    }
  };

  // 아이디 중복 확인
  const idConfirm = async () => {
    const accountIdTrimmed = accountId.trim();
    if (!accountIdTrimmed) {
      alert('아이디를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(
        `${
          config.serverURL
        }/api/v1/check-accountId?accountId=${encodeURIComponent(
          accountIdTrimmed
        )}`,
        {
          method: 'GET',
        }
      );

      if (response.status === 409) {
        alert('중복된 아이디입니다.');
        setIdConfirmed(false);
        return;
      }

      if (!response.ok) {
        throw new Error('서버 오류');
      }

      const data = await response.json();
      console.log('서버 응답:', data);
      if (data.success) {
        setIdConfirmed(true);
        alert(data.data);
      } else {
        setIdConfirmed(false);
        alert(data.data);
      }
    } catch (error) {
      console.log('서버 오류', error);
      alert('서버 오류');
    }
  };

  return (
    <div>
      <header>
        <div className="header">
          <div className="logo">
            <img src="h_logo.png" alt="h_logo" />
          </div>
        </div>
      </header>

      <section className="join_form">
        <h1 className="join">회원가입</h1>
        <form className="join_area">
          <div className="id_pw_area">
            <div className="id_pw input_with_button">
              <input
                type="text"
                id="accountId"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                required
                autoComplete="username"
              />
              <label htmlFor="accountId">아이디</label>
              <button type="button" onClick={idConfirm}>
                중복 확인
              </button>
            </div>
            <div className="id_pw">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <label htmlFor="password">비밀번호</label>
            </div>
            <div className="id_pw">
              <input
                type="password"
                id="password_confirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
              <label htmlFor="password_confirm">비밀번호 확인</label>
            </div>
          </div>
        </form>
        <div className="join_info">
          *영어와 숫자, 특수문자를 포함하여 6자 이상 20자 이하로 작성해주세요.
        </div>

        <div className="btn_area">
          <button className="join_btn" type="button" onClick={handleJoin}>
            가입하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default Join;
