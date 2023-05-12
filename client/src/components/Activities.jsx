import React, { useEffect, useState } from 'react';
import './Activities.css';
import { NewActivityForm } from './'


// Assuming isLoggedIn will give us authentication
const Activities = ({isLoggedIn}) => {
    const [activities, setActivities] = useState([]);
    const [showForm, setShowForm] = useState(false);

    isLoggedIn = true; // Temporary declaration

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

    return(
        <div>
            <h1>Activities</h1>
            {showForm ? (
                <NewActivityForm onSubmit={handleAddActivity} /> 
            ) : (
            <button id='newActivity' onClick={() => isLoggedIn ? setShowForm(true) : window.alert("Please Login to Add an Activity")}>Add New Activity</button>
            )}
            <ul className='activity-container'>
                {activities.map(activity => (
                <li key={activity.id} className='activity-item'>
                    <b>{activity.name}</b>
                    <br />
                    <p>"{activity.description}"</p>
                </li>))}
            </ul>
        </div>
    )
};



export default Activities;