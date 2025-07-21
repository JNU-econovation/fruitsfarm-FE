import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/mainCreate.css';
import create_img from '../assets/create_img.jpg';

const MainCreate = () => {
  const navigate = useNavigate();

  const GoCreate = () => {
    navigate('/create');
  };
  return (
    <div className="main-container">
      <main className="main-content">
        <div className="create-box">
          <img className="create-img" src={create_img} alt="생성 이미지" />
          <button className="create-button" onClick={GoCreate}>
            생성
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainCreate;
