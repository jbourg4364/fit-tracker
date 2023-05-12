import React, { useEffect, useState } from 'react';

const Routines = () => {
const [routines, setRoutines] = useState([]);

useEffect(() => {
    const fetchRoutines = async () => {
       try {
        const response = await fetch('http://localhost:8080/api/routines');
        const data = await response.json();
        console.log(data)
        setRoutines(data);
       } catch (error) {
        console.error(error)
       }
    };

    fetchRoutines();
}, []);

console.log(routines)
    
return(
    <div>
        <h1>Routines</h1>
        <ul>
            {routines.map(routine => (
            <li key={routine.id}>
                <b>Routine Name: </b>{routine.name}
                <br />
                <b>Goal: </b>{routine.goal}
                <br />
                <b>Created By: </b>{routine.creatorName}
                <ul>
                    <br></br>
                    <em>Activities Available for This Routine</em>
                    {routine.activities && routine.activities.length > 0 &&
                        <li>
                            <b>{routine.activities[0].name}</b>
                            <p>{routine.activities[0].description}</p>
                            <p>Count: {routine.activities[0].count}</p>
                            <p>Duration: {routine.activities[0].duration}</p>
                        </li>
                    }
                </ul>
                <hr></hr>
            </li>
            ))}
        </ul>
    </div>
)
};

export default Routines;
