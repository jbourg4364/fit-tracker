import React, { useState } from 'react';
import './Activities.css';

const NewActivityForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(name, description);
        setName('');
        setDescription('');
    };

  return (
    <form className='newActivityForm' onSubmit={handleSubmit}>
        <label className='newActivityLabel'>
            Name:
            <input type='text' value={name} onChange={(event) => setName(event.target.value)} required/>
        </label>
        <br />
        <label className='newActivityLabel'>
            Description:
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} required/>
        </label>
        <br />
        <button type='submit' className='newActivitySubmit'>Submit</button>
    </form>
  )
}

export default NewActivityForm;