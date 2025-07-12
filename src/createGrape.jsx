import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createGrape.css';
import config from './config';
/*
import { Link } from 'react-router-dom';

*/

const CreateGrape = () => {
  const [goal, setgoal] = useState('');
  const [cheer, setcheer] = useState('');
  const [startDate, setstartDate] = useState('');
  const navigate = useNavigate();

  const handleDateClick = (e) => {
    setstartDate(e.target.value);
  };

  const handleSubmit = async () => {
    if (!goal && !cheer && !startDate) {
      alert('모든 항목을 입력해 주세요!');
    }

    const requestBody = {
      type: 'grape',
      achievement: goal,
      motivation: cheer,
      startDate: startDate,
    };

    try {
      const response = await fetch(
        `${config.serverURL}/api/v1/habit-trackers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.status_code === 401) {
        alert('로그인 후 이용해주세요.');
        navigate('/login');
        return;
      }

      if (result.success) {
        const habitTrackerId = result.data.habitTrackerId;
        navigate(`/HTGrape?id=${habitTrackerId}`);
      } else {
        alert('생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
    }
  };

  return (
    <div className="main-container-CG">
      <main className="main-content-CG">
        {/*로그인 확인해서 다르게 보여줘야 함*/}
        <div className="create-box-CG">
          <h1>포도 습관 기록</h1>
          <input
            className="inputText"
            type="text"
            placeholder="한 줄 목표를 입력하세요..."
            value={goal}
            onChange={(e) => setgoal(e.target.value)}
            maxLength={80}
          ></input>
          <input
            className="inputText"
            type="text"
            placeholder="응원하는 말을 입력하세요..."
            value={cheer}
            onChange={(e) => setcheer(e.target.value)}
            maxLength={80}
          ></input>
          <input
            className="inputDate"
            type="date"
            placeholder="시작일"
            value={startDate}
            onChange={handleDateClick}
            maxLength={80}
          ></input>
          <button className="SubBtn" onClick={handleSubmit}>
            생성
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreateGrape;
