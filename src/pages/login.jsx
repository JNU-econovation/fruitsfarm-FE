import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import '../style/login.css';
import h_logo from '../assets/h_logo.png';

const Login = () => {
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    if (!accountId) {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(config.serverURL + '/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId, password }),
        credentials: 'include',
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.error?.message || '다시 로그인 해주세요.');
        return;
      }

      if (data.success) {
        alert(`반갑습니다, ${accountId} 님`);
        navigate('/main');
      } else {
        alert(data.message || '다시 로그인 해주세요.');
      }
    } catch (error) {
      console.log('서버 오류', error);
      alert('서버 오류');
    }
  };

  const handleJoinClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <header className="header">
        <div className="logo">
          <img src={h_logo} alt="h_logo" />
        </div>
      </header>
      <section className="login-form">
        <h1 className="login">LOGIN</h1>
        <div className="id-pw-area">
          <div className="id-pw">
            <input
              type="text"
              id="accountId"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              required
            />
            <label htmlFor="accountId">아이디</label>
          </div>
          <div className="id-pw">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">비밀번호</label>
          </div>
        </div>
        <div className="btn-area">
          <button className="log_btn" type="button" onClick={login}>
            로그인
          </button>
        </div>
        <div className="join-find">
          <h4 onClick={handleJoinClick} className="gojoin-btn">
            회원가입
          </h4>
        </div>
      </section>
    </div>
  );
};

export default Login;
