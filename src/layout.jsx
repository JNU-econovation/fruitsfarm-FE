import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import config from './config';
import './layout.css';
//세션 유효성 확인하고 안되면 로그인으로 이동 로직 추가!!!!!
const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(config.serverURL + '/api/v1/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert(data.error?.message || '다시 시도해주세요.');
        if (response.status === 400) {
          navigate('/login');
        }
        return;
      }

      if (data.success) {
        alert(data.data);
        navigate('/login');
      } else {
        alert('오류가 발생하였습니다.');
      }
    } catch (error) {
      console.log('서버 오류', error);
      alert('서버 오류');
    }
  };

  return (
    <div className="header-container">
      <header className="header">
        <div className="logo">
          <Link to="/main">
            <img className="logo-img" src="h_logo.png" alt="h_logo" />
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/create" className="nav-button">
            <button className="nav-button">생성</button>
          </Link>
          <button onClick={handleLogout} className="nav-button">
            로그아웃
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
