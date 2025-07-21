import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import '../style/main.css';

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackers = async () => {
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

        if (result.status_code === 401) {
          alert('로그인 후 이용해주세요.');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('서버 오류');
        }

        if (result.success && result.data.length > 0) {
          navigate('/mainList');
        } else {
          navigate('/mainCreate');
        }
      } catch (error) {
        console.error('서버 오류:', error);
        alert('서버 오류. 다시 시도해주세요.');
      }
    };

    fetchTrackers();
  }, [navigate]);

  return null;
};

export default Main;
