import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from './config';
import './mainList.css';

const MainList = () => {
  const navigate = useNavigate();
  const [trackers, setTrackers] = useState([]);

  //목록 불러오기
  useEffect(() => {
    const fetchTrackersList = async () => {
      try {
        const response = await fetch(
          `${config.serverURL}/api/v1/habit-trackers`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const result = await response.json();
        console.log(result);

        if (result.status_code === 401) {
          alert('로그인 후 이용해주세요.');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('서버 오류');
        }

        setTrackers(result.data);
      } catch (error) {
        console.error('서버 오류:', error);
        alert('서버 오류. 다시 시도해주세요.');
      }
    };

    fetchTrackersList();
  }, [navigate]);

  //삭제함수
  const handleDelete = async (habitTrackerId) => {
    const confirm = window.confirm('Habit Tracker를 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      const response = await fetch(
        `${config.serverURL}/api/v1/habit-trackers/${habitTrackerId}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 204) {
        alert('삭제되었습니다.');
        setTrackers(
          trackers.filter((t) => t.habitTrackerId !== habitTrackerId)
        );
      } else {
        throw new Error(response.error || '오류 삭제 실패');
      }
    } catch (error) {
      console.log('삭제오류', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const getImage = (type) => {
    if (type === 'grape') return '/list_grape.png';
    if (type === 'watermelon') return '/list_wm.png';
    return '/img/default.png';
  };

  const handleHT = (type, habitTrackerId) => {
    if (type === 'grape') {
      navigate(`/HTGrape?id=${habitTrackerId}`);
    }
    if (type === 'watermelon') {
      navigate(`/HTwm?id=${habitTrackerId}`);
    }
  };

  return (
    <div className="main-container">
      <main className="main-content">
        <div className="list-box">
          <div className="list-h">
            <div>목록</div>
            <div>주제</div>
            <div>기간</div>
          </div>

          <div className="list-b">
            {trackers.map((tracker) => (
              <div className="row" key={tracker.habitTrackerId}>
                <div className="imgdiv">
                  <img
                    src={getImage(tracker.type)}
                    alt="fruit"
                    style={{ width: '40px', height: '40px' }}
                  />
                </div>
                <div
                  className="ach"
                  onClick={() => handleHT(tracker.type, tracker.habitTrackerId)}
                >
                  {tracker.achievement}
                </div>
                <div className="period">
                  {tracker.startDate} - {tracker.endDate}
                  <button
                    className="pbtn"
                    onClick={() => handleDelete(tracker.habitTrackerId)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainList;
