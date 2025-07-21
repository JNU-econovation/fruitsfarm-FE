import React from 'react';
import create_grapes from '../assets/create_grapes.jpg';
import create_wm from '../assets/create_wm.jpg';

import { useNavigate } from 'react-router-dom';
import '../style/create.css';

const Create = () => {
  const navigate = useNavigate();

  const GoHTGrape = () => {
    navigate('/createGrape');
  };
  const GoHTWM = () => {
    navigate('/createWM');
  };

  return (
    <div className="main-container">
      <main className="main-content">
        <div className="create-box">
          <img
            src={create_grapes}
            alt="grape"
            className="create-grapes"
            onClick={GoHTGrape}
          ></img>
          <img
            src={create_wm}
            alt="wm"
            className="create-wm"
            onClick={GoHTWM}
          ></img>
        </div>
      </main>
    </div>
  );
};

export default Create;
