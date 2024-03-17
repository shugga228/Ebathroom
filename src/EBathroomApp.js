import React, { useState, useEffect } from 'react';
import './styles.css'; 

function EBathroomApp() {
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowInfo(true);
    setTimerOn(true);
  };

  const handleEnd = () => {
    setName('');
    setTeacher('');
    setShowInfo(false);
    setTime(0);
    setTimerOn(false);
  };

  return (
    <div>
      <h1>E-Bathroom App</h1>
      {!showInfo && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="teacher">Teacher:</label>
            <input
              type="text"
              id="teacher"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      {showInfo && (
        <div>
          <h2>Submitted Information:</h2>
          <p>Name: {name}</p>
          <p>Teacher: {teacher}</p>
          <p>Time Elapsed: {formatTime(time)}</p>
          <button onClick={handleEnd}>End</button>
        </div>
      )}
    </div>
  );
}

export default EBathroomApp;
