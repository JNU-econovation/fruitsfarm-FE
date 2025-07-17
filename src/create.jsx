import React from 'react';
/*import { useState } from 'react';
import config from './config';
import { Link } from 'react-router-dom';
*/

import { useNavigate } from 'react-router-dom';
import './create.css';

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
            src="/create_grapes.jpg"
            alt="grape"
            className="create-grapes"
            onClick={GoHTGrape}
          ></img>
          <img
            src="/create_wm.jpg"
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
