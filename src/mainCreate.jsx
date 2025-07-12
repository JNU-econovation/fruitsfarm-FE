import React from 'react';
/*import { useState } from 'react';
import config from './config';
import { Link } from 'react-router-dom';
*/
import { useNavigate } from 'react-router-dom';
import './mainCreate.css';

const MainCreate = () => {
  const navigate = useNavigate();

  const GoCreate = () => {
    navigate('/create');
  };
  return (
    <div className="main-container">
      <main className="main-content">
        {/*로그인 확인해서 다르게 보여줘야 함*/}
        <div className="create-box">
          <img className="create-img" src="/create_img.jpg" alt="생성 이미지" />
          <button className="create-button" onClick={GoCreate}>
            생성
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainCreate;
