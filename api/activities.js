const express = require('express');
const activitiesRouter = express.Router();
const { getAllActivities, createActivity, getActivityByName, updateActivity, getRoutineActivityById } = require('../db');
const { getActivityById } = require('../db');
const { getPublicRoutinesByActivity } = require('../db/routines')


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
    
    console.log(activity)
    console.log(routine);

    if(routine) {
      res.send(routine);
    } else {
      res.send(error);
    }

  } catch (error) {
    console.error;
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
        const newActivity = await createActivity(activityData);
        const allActivities = await getAllActivities();
        const allActivitiesByName = allActivities.map(activity => activity.name);

        
        for(let i = 0; i < allActivitiesByName.length; i++) {
          if(allActivitiesByName[i] === newActivity.name) {
            // console.log(allActivitiesByName[i], newActivity.name);
            next({name, message})

          } 
            res.send(newActivity);
         
        };

    } catch (error) {
      console.log(error)
    }
});

// PATCH /api/activities/:activityId
// activitiesRouter.patch('/:activityId (*)', async (req, res, next) => {
//   const { activityId } = req.params;
  
 
//   updateFields = { name, description};

  
  
//   try {
//     const activity = await getActivityById(activityId);
//     console.log(activity);

//     const updatedActivity = await updateActivity({activity, ...updateFields})
 
//   } catch (error) {
//     console.error(error);
//   }


// });


module.exports = activitiesRouter;
