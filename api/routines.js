const express = require('express');
const routinesRouter = express.Router();
const { getRoutineById,
    getRoutinesWithoutActivities,
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
    destroyRoutine,
    attachActivitiesToRoutines,
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    addActivityToRoutine,
    getRoutineActivityByRoutineIdAndActivityId,
} = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt')

// GET /api/routines
routinesRouter.get('/', async (req, res, next) => {
  try {
    const routines = await getAllRoutines();
    

    res.status(200).json(routines);
  } catch (error) {
    next(error);
  }
});

const authenticateUser = async (req, res, next) => {
    try {
      // console.log('req.headers.authorization:', req.headers.authorization); // Log the authorization header value
  
      const token = req.headers.authorization.split(' ')[1];
      // console.log('token:', token); 
  
      const decoded = jwt.verify(token, SECRET);
      // console.log('decoded:', decoded); 
  
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
      console.error('Error in authenticateUser:', error);
      res.status(401).json({
        error: 'UnauthorizedError',
        message: 'You must be logged in to perform this action',
        name: 'UnauthorizedError',
      });
    }
  };
  

// POST /api/routines
routinesRouter.post('/', authenticateUser, async (req, res, next) => {
    try {
      const { isPublic, name, goal } = req.body;
      const creatorId = req.user.id;
      const routine = await createRoutine({ creatorId, isPublic, name, goal });
        
      res.status(201).json(routine);
    } catch (error) {
      next(error);
    }
  });

// PATCH /api/routines/:routineId
routinesRouter.patch('/:routineId', authenticateUser, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const routine = await getRoutineById(routineId);
    if (!routine) {
      return res.status(404).json({
        error: 'NotFoundError',
        message: 'Routine not found',
      });
    }

    if (routine.creatorId !== req.user.id) {
      return res.status(403).json({
        error: 'ForbiddenError',
        message: `User ${req.user.username} is not allowed to update ${routine.name}`,
        name: 'ForbiddenError'
      });
    }

    const { isPublic, name, goal } = req.body;
    const updatedRoutine = await updateRoutine({ id: routineId, isPublic, name, goal });

    res.status(200).json(updatedRoutine);
  } catch (error) {
    console.error('Error in routinesRouter.patch:', error);
    next(error);
  }
});

// DELETE /api/routines/:routineId
routinesRouter.delete('/:routineId', authenticateUser, async (req, res, next) => {
    try {
      const { routineId } = req.params;
      const routine = await getRoutineById(routineId);
  
      if (!routine) {
        return res.status(404).json({
          error: 'NotFoundError',
          message: 'Routine not found',
        });
      }
      
      if (routine.creatorId !== req.user.id) {
        return res.status(403).json({
          error: 'ForbiddenError',
          message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
          name: 'ForbiddenError'
        });
      }
  
      const deletedRoutine = await destroyRoutine(routineId);
  
      res.status(200).json(deletedRoutine);
    } catch (error) {
      console.error('Error in routinesRouter.delete:', error);
      next(error);
    }
  });
  
// POST /api/routines/:routineId/activities
routinesRouter.post('/:routineId/activities', authenticateUser, async (req, res, next) => {
    try {
      const { routineId } = req.params;
      const { activityId, count, duration } = req.body;
      const routine = await getRoutineById(routineId);
  
      if (!routine) {
        return res.status(404).json({
          error: 'NotFoundError',
          message: 'Routine not found',
        });
      }
  
      if (routine.creatorId !== req.user.id) {
        return res.status(403).json({
          error: 'ForbiddenError',
          message: `User ${req.user.username} is not allowed to attach activities to ${routine.name}`,
          name: 'ForbiddenError',
        });
      }
  
      const routineActivity = await getRoutineActivityByRoutineIdAndActivityId(routineId, activityId);
  // console.log(routineActivity)
      if (routineActivity) {
        return res.status(400).json({
          error: 'BadRequestError',
          message: `Activity ID ${activityId } already exists in Routine ID ${routineId}`,
          name: 'BadRequestError',
        });
      }
  
      const newRoutineActivity = await addActivityToRoutine({ routineId, activityId, count, duration });
      res.status(201).json(newRoutineActivity);
    } catch (error) {
      console.error('Error in routinesRouter.post(/:routineId/activities):', error);
      next(error);
    }
  });
  
  
  
module.exports = routinesRouter;
