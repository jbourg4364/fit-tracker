const express = require('express');
const activitiesRouter = express.Router();
const { getAllActivities, createActivity, getActivityByName, getActivityById } = require('../db/activities');
const { getPublicRoutinesByActivity } = require('../db/routines');






activitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /activities");
    next();
});

// GET /api/activities/:activityId/routines
activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  const {activityId} = req.params;
  try {
    const activity = await getActivityById(activityId);
    const routine = await getPublicRoutinesByActivity(activity);
    
    console.log(activity);
    console.log(routine);

    if(routine) {
      res.send(routine);
    } else {
      const error = {
        message: 'An activity with the same name already exists',
        name: 'DuplicateActivityError',
        error: new Error('An activity with the same name already exists')
      }
      console.log(error);
      return res.status(400).json(error);
    }

  } catch (error) {
    next(error)
  }
});





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
        
        const allActivity = await getAllActivities();
        const error = {error: "Error", name: "error", message: "hello"}
        for (let i = 0; i < allActivity.length; i++) {
          const allActivities = allActivity.map(activity => activity.name)
          if (allActivities[i].name === activityData.name) {
             return res.status(401).json({
              error: 'UnauthorizedError',
              message: 'You must be logged in to perform this action',
              name: 'UnauthorizedError',
            });
          } else {
            const newActivity = await createActivity(activityData);
            console.log("New", newActivity);
            res.send(newActivity)
          }
        }       
        
        
    } catch (error) {
      console.error("Error", error)
      next(error)
    }
})

// PATCH /api/activities/:activityId
activitiesRouter.patch('/:activityId', async (req, res, next) => {
  const { activityId } = req.params;
  
 
  

});






module.exports = activitiesRouter;
