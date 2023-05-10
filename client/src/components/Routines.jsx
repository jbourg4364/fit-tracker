import React, { useEffect, useState } from 'react';
import { NewRoutineForm } from './';

const Routines = () => {
const [routines, setRoutines] = useState([]);
const [showForm, setShowForm] = useState(false);

useEffect(() => {
    const fetchRoutines = async () => {
       try {
        const response = await fetch('http://localhost:8080/api/routines');
        const data = await response.json();
        
        setRoutines(data);
       } catch (error) {
        console.error(error)
       }
    };

    fetchRoutines();
}, []);

const handleAddRoutine = async (name, goal) => {
    try {
        const response = await fetch('http://localhost:8080/api/routines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, goal })
        });

        const data = await response.json();
        setRoutines([...routines, data]);
    } catch (error) {
        console.error(error);
    }
};

    
return(
    <div>
        <h1>Routines</h1>
        {showForm ? (
            <NewRoutineForm onSubmit={handleAddRoutine}/>
        ) : (
        <button id='newRoutine' onClick={() => setShowForm(true)}>Add New Routine</button>)
        }
        <ul className='routine-container'>
            {routines.map(routine => (
            <li key={routine.id} className='routine-item'>
                <b>Routine Name: </b>{routine.name}
                <br />
                <b>Goal: </b>{routine.goal}
                <br />
                <b>Created By: </b>{routine.creatorName}
                <ul>
                    <hr />
                    <em>Activities Available for This Item</em>
                    <li>
                        <b>{routine.activities[0].name}</b>
                        <p>{routine.activities[0].description}</p>
                        <p>Count: {routine.activities[0].count}</p>
                        <p>Duration: {routine.activities[0].duration}</p>
                    </li>
                </ul>
            </li>
            
            ))}
        </ul>
    </div>
)
};

export default Routines;