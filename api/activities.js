const express = require('express');
const activitiesRouter = express.Router();
const { getAllActivities, createActivity, getActivityByName, updateActivity } = require('../db/activities');
const { getActivityById } = require('../db');
const { getPublicRoutinesByActivity } = require('../db/routines')


activitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /activities");
    next();
});

// GET /api/activities/:activityId/routines
// activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  
//   const { activityId } = req.params;

//   try {
//     const activityName = await getActivityById(activityId)
//     consolelog(activityName)
    


//   } catch (error) {
//     console.error;
//   }
// });




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
// activitiesRouter.post('/', async (req, res, next) => {
//     const { name, description } = req.body;
//     const activityData = {
//         name: name,
//         description: description,
//     };

//     try {
//         const newActivity = await createActivity(activityData);
//         const allActivities = await getAllActivities();
//         const allActivitiesByName = allActivities.map(activity => activity.name);

        
//         for(let i = 0; i < allActivitiesByName.length; i++) {
//           if(allActivitiesByName[i] === newActivity.name) {
//             // console.log(allActivitiesByName[i], newActivity.name);
//             next({name, message})

//           } else {
//             res.send(newActivity);
//           }
//         };

//     } catch (error) {
//       console.log(error)
//     }
// });

// PATCH /api/activities/:activityId
activitiesRouter.patch('/:activityId', async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;

  const updateFields = {};
  
  if(name) {
    updateFields.name = name;
  }

  if(description) {
    updateFields.description = description;
  }

  try {
    
    const updatedActivity = await updateActivity({activityId, updateFields});
    
    res.send({ rows: updatedActivity })
  } catch (error) {
    console.error(error);
  }


})


module.exports = activitiesRouter;
