import React, { useState } from 'react';

const UpdateRoutineForm = ({ routine, token, refreshRoutines }) => {
  const [name, setName] = useState(routine.name);
  const [goal, setGoal] = useState(routine.goal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/routines/${routine.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic: routine.isPublic
        })
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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>

      <label>
        Goal:
        <input type="text" value={goal} onChange={e => setGoal(e.target.value)} />
      </label>

      <input type="submit" value="Update Routine" />
    </form>
  );
};

export default UpdateRoutineForm;
