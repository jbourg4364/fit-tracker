import React, { useState } from 'react';
import './Routines.css';

const NewRoutineForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name, goal);
    setName('');
    setGoal('');
};

  return (
    <form className='newRoutineForm' onSubmit={handleSubmit}>
        <label className='newRoutineLabel'>
            Routine Name:
            <input type='text' value={name} onChange={(event) => setName(event.target.value)} required/>
        </label>
        <br />
        <label className='newRoutineLabel'>
            Goal:
            <textarea value={goal} onChange={(event) => setGoal(event.target.value)} required/>
        </label>
        <br />
        <button type='submit' className='newRoutineSubmit'>Submit</button>
    </form>
  )
}

export default NewRoutineForm