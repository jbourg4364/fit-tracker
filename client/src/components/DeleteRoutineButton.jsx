// DeleteRoutineButton.js
import React from 'react';

const DeleteRoutineButton = ({ routine, token, refreshRoutines }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/routines/${routine.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.message);
      }

      refreshRoutines();
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>Delete</button>
  );
};

export default DeleteRoutineButton;
