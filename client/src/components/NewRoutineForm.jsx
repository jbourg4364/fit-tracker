// NewRoutineForm.js
import React, { useState } from 'react';

const NewRoutineForm = ({ token, refreshRoutines }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/routines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setName('');
        setGoal('');
        setIsPublic(false);
        refreshRoutines();
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Routine Name:</label>
      <input
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <label htmlFor="goal">Goal:</label>
      <input
        id="goal"
        value={goal}
        onChange={e => setGoal(e.target.value)}
        required
      />

      <label htmlFor="isPublic">Public:</label>
      <input
        id="isPublic"
        type="checkbox"
        checked={isPublic}
        onChange={() => setIsPublic(prevIsPublic => !prevIsPublic)}
      />

      <button type="submit">Create Routine</button>
    </form>
  );
};

export default NewRoutineForm;
