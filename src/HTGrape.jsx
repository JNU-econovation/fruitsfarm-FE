import React, { useEffect, useState } from 'react';
import './HTGrape.css';
import { useLocation } from 'react-router-dom';
import config from './config';
import { useNavigate } from 'react-router-dom';

const HTGrape = () => {
  const [habitData, setHabitData] = useState(null); //로딩 화면 분기를 위해서
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const habitTrackerId = params.get('id');

  const navigate = useNavigate();

  useEffect(() => {
    if (!habitTrackerId) {
      alert('다시 시도해주세요.'); //삭제
      console.log('habitTrackerId가 없습니다.');
      navigate('/main');
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          `${config.serverURL}/api/v1/habit-trackers/${habitTrackerId}`,
          {
            credentials: 'include',
          }
        );

        const result = await response.json();

        if (result.status_code === 401) {
          alert('로그인 후 이용해주세요.');
          navigate('/login');
          return;
        }

        if (result.success) {
          let parsedProgress;
          try {
            parsedProgress =
              typeof result.data.progress === 'string'
                ? JSON.parse(result.data.progress)
                : result.data.progress;
          } catch {
            parsedProgress = [];
          }

          setHabitData({ ...result.data, progress: parsedProgress });
        } else {
          alert(result.error?.message || '데이터를 가져오지 못했습니다.');
        }
      } catch (err) {
        console.error(err);
        alert('오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [habitTrackerId, navigate]);

  const handleToggle = (index) => {
    if (!habitData) return;
    setHabitData((prev) => ({
      ...prev,
      progress: prev.progress.map((v, i) => (i === index ? !v : v)),
    }));
  };

  const handleSave = async () => {
    if (!habitData) return;

    try {
      const response = await fetch(
        `${config.serverURL}/api/v1/habit-trackers/${habitTrackerId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            progress: JSON.stringify(habitData.progress),
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert('저장되었습니다!');
      } else {
        alert(result.error?.message || '저장에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('오류가 발생했습니다.');
    }
  };

  //로딩처리
  if (loading)
    return <p style={{ textAlign: 'center' }}> 해빗트래커를 불러오는 중…</p>;
  if (!habitData) return <p style={{ textAlign: 'center' }}>데이터 없음</p>;

  const pathList = [
    'M144.211 229.736C174.151 240.633 207.304 225.066 218.26 194.965C229.215 164.864 213.826 131.629 183.886 120.731C153.946 109.834 120.793 125.402 109.837 155.502C98.8815 185.603 114.271 218.839 144.211 229.736Z',
    'M227.211 263.736C257.151 274.633 290.304 259.066 301.26 228.965C312.215 198.864 296.826 165.629 266.886 154.731C236.946 143.834 203.793 159.402 192.837 189.502C181.882 219.603 197.271 252.839 227.211 263.736Z',
    'M148.211 322.736C178.151 333.633 211.304 318.066 222.26 287.965C233.215 257.864 217.826 224.629 187.886 213.731C157.946 202.834 124.793 218.402 113.837 248.502C102.882 278.603 118.271 311.839 148.211 322.736Z',
    'M384.211 319.736C414.151 330.633 447.304 315.066 458.26 284.965C469.215 254.864 453.826 221.629 423.886 210.731C393.946 199.834 360.793 215.402 349.837 245.502C338.882 275.603 354.271 308.839 384.211 319.736Z',
    'M242.211 352.736C272.151 363.633 305.304 348.066 316.26 317.965C327.215 287.864 311.826 254.629 281.886 243.731C251.946 232.834 218.793 248.402 207.837 278.502C196.882 308.603 212.271 341.839 242.211 352.736Z',
    'M306.211 288.736C336.151 299.633 369.304 284.066 380.26 253.965C391.215 223.864 375.826 190.629 345.886 179.731C315.946 168.834 282.793 184.402 271.837 214.502C260.882 244.603 276.271 277.839 306.211 288.736Z',
    'M340.211 391.736C370.151 402.633 403.304 387.066 414.26 356.965C425.215 326.864 409.826 293.629 379.886 282.731C349.946 271.834 316.793 287.402 305.837 317.502C294.882 347.603 310.271 380.839 340.211 391.736Z',
    'M164.211 422.736C194.151 433.633 227.304 418.066 238.26 387.965C249.215 357.864 233.826 324.629 203.886 313.731C173.946 302.834 140.793 318.402 129.837 348.502C118.882 378.603 134.271 411.839 164.211 422.736Z',
    'M255.211 455.736C285.151 466.633 318.304 451.066 329.26 420.965C340.215 390.864 324.826 357.629 294.886 346.731C264.946 335.834 231.793 351.402 220.837 381.502C209.882 411.603 225.271 444.839 255.211 455.736Z',
    'M180.704 521.167C210.644 532.064 243.796 516.496 254.752 486.396C265.708 456.295 250.318 423.059 220.378 412.162C190.438 401.265 157.286 416.832 146.33 446.933C135.374 477.034 150.764 510.269 180.704 521.167Z',
  ];

  return (
    <div className="main-container-CG">
      <main className="main-content-CG">
        <div className="create-box-CG">
          <h1>포도 습관 기록</h1>
          <div className="HT">
            <div className="HT-Text">
              <h2>Day{habitData.currentDate}</h2>
              <div className="input-box">
                <p>목표</p>
                <div className="text-box">{habitData.achievement}</div>
                <p>동기부여</p>
                <div className="text-box">{habitData.motivation}</div>
                <p>기간</p>
                <div className="date-box">
                  {habitData.startDate} ~ {habitData.endDate}
                </div>
              </div>
            </div>
            <div className="HT-Grape">
              <svg
                width="516"
                height="583"
                viewBox="0 0 516 583"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M455.648 117.171C455.648 117.171 406.02 169.287 312.935 115.748"
                  stroke="black"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M309.033 179.714C319.859 116.264 325.058 -20.6213 147.126 51.1698"
                  stroke="black"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {pathList.map((d, index) => {
                  const filled = habitData.progress?.[index] === true;
                  return (
                    <path
                      key={index}
                      d={d}
                      fill={filled ? '#800080' : 'white'}
                      stroke="black"
                      strokeWidth="15"
                      strokeMiterlimit="10"
                      onClick={() => handleToggle(index)}
                      style={{ cursor: 'pointer' }}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="btn-box">
              <button className="saveBtn" onClick={handleSave}>
                저장
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HTGrape;
