import React, { useEffect, useState } from 'react';
import './Activities.css';
import { NewActivityForm } from './'


// Assuming isLoggedIn will give us authentication
const Activities = ({isLoggedIn}) => {
    const [activities, setActivities] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [routines, setRoutines] = useState([]);


useEffect(() => {
    const fetchActivities = async () => {
       try {
        const response = await fetch('http://localhost:8080/api/activities');
        const data = await response.json();
        
        setActivities(data);
       } catch (error) {
        console.error(error)
       }
    };

    fetchActivities();
    
}, []);

const handleAddActivity = async (name, description) => {
    try {
        const response = await fetch('http://localhost:8080/api/activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description })
        });

        const data = await response.json();
        console.log(data);
        setActivities([...activities, data]);
    } catch (error) {
        console.error(error);
    }
};

const handleActivityClick = async (activityId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/activities/${activityId}/routines`);
      const data = await response.json();
  
      if (data.length === 0) {
        
        return;
      }
  
      setRoutines(data);
      return routines;
    } catch (error) {
        // console.error(error);
    
        window.alert("No routines are currently associated with that activity.");
        return ;
    }
  };
  
  

    return(
        <div>
            <h1>Activities</h1>
            {showForm ? (
                <NewActivityForm onSubmit={handleAddActivity} /> 
            ) : (
            <button id='newActivity' onClick={() => isLoggedIn ? setShowForm(true) : window.alert("Please Login to Add an Activity")}>Add New Activity</button>
            )}

            {(routines.length) ? (
                <div>
                    <h2>Routines for Selected Activity</h2>
                    <hr></hr>
                    <ul>
                        {routines.map(routine => (
                            <li key={routine.id}>
                                {routine.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (<h2>Choose an activity below to see it's routines!</h2>) 
            }
            <ul className='activity-container'>
                {activities.map(activity => (
                <li key={activity.id} className='activity-item' onClick={() => handleActivityClick(activity.id)} >
                    <b>{activity.name}</b>
                    <br />
                    <p>"{activity.description}"</p>
                </li>))}

            </ul>
        </div>
    )
};



export default Activities;