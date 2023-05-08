const express = require('express');
const activitiesRouter = express.Router();
const { getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
   getUserById,
   getPublicRoutinesByActivity
   } = require('../db');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt')


activitiesRouter.use((req, res, next) => {
    // console.log("A request is being made to /activities");
    next();
});

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);

    const user = await getUserById(decoded.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        error: 'InvalidCredentialsError',
        message: 'Invalid token',
      });
    }
  } catch (error) {
    res.status(401).json({
      error: 'UnauthorizedError',
      message: 'You must be logged in to perform this action',
      name: 'UnauthorizedError',
    });
  }
};

// GET /api/activities/:activityId/routines
activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  try {
    const activityId = req.params.activityId;
    const activity = await getActivityById(activityId);

    if (!activity) {
      return res.status(404).json({
        error: 'ActivityNotFoundError',
        message: `Activity ${activityId} not found`,
        name: 'ActivityNotFoundError'
      });
    }

    const publicRoutines = await getPublicRoutinesByActivity(activity);
    res.status(200).json(publicRoutines);
  } catch (error) {
    console.error('Error in activitiesRouter.get(/:activityId/routines):', error);
    next(error);
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
activitiesRouter.post('/', authenticateUser, async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (await getActivityByName(name)) {
      return res.status(400).json({
        error: 'ActivityExistsError',
        message: `An activity with name ${name} already exists`, // Updated error message
        name: 'ActivityExistsError'
      });
    }

    const newActivity = await createActivity({ name, description });

    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error in activitiesRouter.post(/):', error);
    next(error);
  }
});

// PATCH /api/activities/:activityId
activitiesRouter.patch('/:activityId', authenticateUser, async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const { name, description } = req.body;

    const existingActivity = await getActivityById(activityId);

    if (!existingActivity) {
      return res.status(404).json({
        error: 'ActivityNotFoundError',
        message: `Activity ${activityId} not found`,
        name: 'ActivityNotFoundError'
      });
    }

    if (name) {
      const activityWithName = await getActivityByName(name);
      if (activityWithName && activityWithName.id !== existingActivity.id) {
        return res.status(400).json({
          error: 'ActivityExistsError',
          message: `An activity with name ${name} already exists`,
          name: 'ActivityExistsError'
        });
      }
    }

    const updatedActivity = await updateActivity(activityId, { name, description });
    console.log(updateActivity)
    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error('Error in activitiesRouter.patch(/:activityId):', error);
    next(error);
  }
});

module.exports = activitiesRouter;