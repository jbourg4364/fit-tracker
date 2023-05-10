import React, { useEffect, useState } from 'react';
import './Activities.css';




const Activities = () => {
const [activities, setActivities] = useState([]);


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


    return(
        <div>
            <h1>Activities</h1>
            <button id='newActivity'>Add New Activity</button>
            <ul>
                {activities.map(activity => (
                <li key={activity.id}>
                    <b>{activity.name}</b>
                    <br />
                    <p>"{activity.description}"</p>
                </li>))}
            </ul>
        </div>
    )
};



export default Activities;