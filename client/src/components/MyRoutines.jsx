import React, { useEffect, useState } from "react";
import { NewRoutineForm } from './';

const myRoutines = ({token, username}) => {
    const [routines, setRoutines] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [userRoutines, setUserRoutines] = useState([]);
    
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

    useEffect(() => {
        const MyRoutines = async() => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${username}/routines`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                const data = await response.json();
                setUserRoutines([data]);
              } catch (error) {
                console.error(error);
              }
        }
        
        MyRoutines();
    }, [])

    return(
        <div>
            <h1>Welcome Back!</h1>
            {showForm ? (
            <NewRoutineForm onSubmit={handleAddRoutine}/>
        ) : (
        <button id='newRoutine' onClick={() => setShowForm(true)}>Add New Routine</button>)
        }
            <hr />
            <h2>Your Routines</h2>
            <ul className='routine-container'>
                {userRoutines.map(routine => (
                    <li key={routine.id} className='routine-item'>
                        <b>Routine Name: </b>{routine.name}
                        <br />
                        <b>Goal: </b>{routine.goal}
                        <br />
                    </li>
                ))}
            </ul>
            
        </div>
    )
};

export default myRoutines;