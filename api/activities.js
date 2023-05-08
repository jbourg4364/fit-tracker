const express = require('express');
const activitiesRouter = express.Router();
const { getAllActivities, createActivity, getActivityByName } = require('../db/activities');


activitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /activities");
    next();
});

// GET /api/activities/:activityId/routines

// GET /api/activities
activitiesRouter.get('/', async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();

    res.send(allActivities);
  } catch (error) {
    console.error("Cannot get activities from /activities", error);
  }
});
// POST /api/activities
activitiesRouter.post('/', async (req, res, next) => {
    const { name, description } = req.body;
    const activityData = {
        name: name,
        description: description,
    };

    try {
        const newActivity = await createActivity(activityData);
        const allActivities = await getAllActivities();
        console.log(allActivities)
        console.log(newActivity.name);
        if(allActivities.keys === newActivity.name) {
          console.log("yes")
        } else {
          console.log("no")
        };
        
       
       
    
        
    } catch (error) {
        console.error(error);
    }
})

// PATCH /api/activities/:activityId

module.exports = activitiesRouter;