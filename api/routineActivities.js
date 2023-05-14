const express = require("express");
const routineActivitiesRouter = express.Router();
const {
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
  getUserById,
  getRoutineById
} = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt')

const authenticateUser = async (req, res, next) => {
    try {
    //   console.log('req.headers.authorization:', req.headers.authorization);
      const token = req.headers.authorization.split(' ')[1];
    //   console.log('token:', token); 
  
      const decoded = jwt.verify(token, SECRET);
    //   console.log('decoded:', decoded); 
  
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

// PATCH /routine_activities/:routineActivityId
routineActivitiesRouter.patch("/:routineActivityId", authenticateUser, async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
  
      if (!(await canEditRoutineActivity(routineActivityId, req.user.id))) {
        const routineActivity = await getRoutineActivityById(routineActivityId);
        const routine = await getRoutineById(routineActivity.routineId);
        
        return res.status(403).json({
          error: "ForbiddenError",
          message: `User ${req.user.username} is not allowed to update ${routine.name}`,
          name: "ForbiddenError"
        });
      }
  
      const updatedRoutineActivity = await updateRoutineActivity({ id: routineActivityId, ...req.body });
  
      res.status(200).json(updatedRoutineActivity);
    } catch (error) {
      console.error("Error in routineActivitiesRouter.patch(/:routineActivityId):", error);
      next(error);
    }
  });
  

// DELETE /routine_activities/:routineActivityId
routineActivitiesRouter.delete("/:routineActivityId", authenticateUser, async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
  
      if (!(await canEditRoutineActivity(routineActivityId, req.user.id))) {
        const routineActivity = await getRoutineActivityById(routineActivityId);
        const routine = await getRoutineById(routineActivity.routineId);
        
        return res.status(403).json({
          error: "ForbiddenError",
          message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
          name: "ForbiddenError"
        });
      }
  
      const deletedRoutineActivity = await destroyRoutineActivity(routineActivityId);
  
      res.status(200).json(deletedRoutineActivity);
    } catch (error) {
      console.error("Error in routineActivitiesRouter.delete(/:routineActivityId):", error);
      next(error);
    }
  });
  

module.exports = routineActivitiesRouter;
