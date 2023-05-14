// MyRoutines.js
import React, { useState, useEffect } from 'react';
import { getAllRoutines } from '../api-client/index';
import NewRoutineForm from './NewRoutineForm';
import UpdateRoutineForm from './UpdateRoutineForm';
import DeleteRoutineButton from './DeleteRoutineButton';
import './MyRoutines.css';

const MyRoutines = ({ user, token }) => {
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const refreshRoutines = async () => {
    const allRoutines = await getAllRoutines();
    const userRoutines = allRoutines.filter(routine => routine.creatorId === user.id);
    setRoutines(userRoutines);
  };

  useEffect(() => {
    refreshRoutines();
  }, [user]);

  const handleEditClick = (routine) => {
    setSelectedRoutine(routine);
  };

  return (
    <div className="my-routines-container">
      <NewRoutineForm token={token} refreshRoutines={refreshRoutines} />
      <div className="my-routines-list">
        {routines.length === 0 ? (
          <div className="no-routines">You haven't created any routines yet.</div>
        ) : (
          routines.map((routine, index) => (
            <div key={routine.id} className="my-routine-card" id={`routine-${index}`}>
              <h2 className="my-routine-name">{routine.name}</h2>
              <p className="my-routine-goal">Goal: <span>{routine.goal}</span></p>
              <h3 className="activities-title">Activities</h3>
              {routine.activities.map((activity) => (
                <div key={activity.id} className="activity-info">
                  <h4 className="activity-name">{activity.name}</h4>
                  <p className="activity-description">Description: <span>{activity.description}</span></p>
                  <p className="activity-duration">Duration: <span>{activity.duration} minutes</span></p>
                  <p className="activity-count">Count: <span>{activity.count}</span></p>
                </div>
              ))}
              <p className="my-routine-creator">Created by: <span>{routine.creatorName}</span></p>
              <button className="edit-button" onClick={() => handleEditClick(routine)}>Edit</button>
              {routine.creatorId === user.id && <DeleteRoutineButton routine={routine} token={token} refreshRoutines={refreshRoutines} />}
            </div>
          ))
        )}
      </div>
      {selectedRoutine && (
        <div className="update-routine-container">
          <UpdateRoutineForm routine={selectedRoutine} token={token} refreshRoutines={refreshRoutines} />
        </div>
      )}
    </div>
  );
}

export default MyRoutines;
