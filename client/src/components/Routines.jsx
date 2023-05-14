import React, { useState, useEffect } from 'react';
import { getAllRoutines } from '../api-client/index';
import './Routines.css';

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllRoutines();
      console.log(result)
      setRoutines(result);
    };

    fetchData();
  }, []);

  return (
    <div className="routines-container">
      {routines.map((routine, index) => (
        <div key={routine.id} className="routine-card" id={`routine-${index}`}>
          <h2 className="routine-name">{routine.name}</h2>
          <p className="routine-goal">Goal: <span>{routine.goal}</span></p>
          <h3 className="activities-title">Activities</h3>
          {routine.activities.map((activity) => (
            <div key={activity.id} className="activity-info">
              <h4 className="activity-name">{activity.name}</h4>
              <p className="activity-description">Description: <span>{activity.description}</span></p>
              <p className="activity-duration">Duration: <span>{activity.duration} minutes</span></p>
              <p className="activity-count">Count: <span>{activity.count}</span></p>
            </div>
          ))}
          <p className="routine-creator">Created by: <span>{routine.creatorName}</span></p>
        </div>
      ))}
    </div>
  );
}

export default Routines;
