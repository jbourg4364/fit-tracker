/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const { createUser, getUser, getUserById, getUserByUsername, getPublicRoutinesByUser, getAllRoutinesByUser } = require('../../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt')

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
  
    // Check password length
    if (password.length < 8) {
      console.error('Password must be at least 8 characters long');
      return res.status(400).json({
        name: 'PasswordTooShortError', 
        error: 'PasswordTooShortError',
        message: 'Password Too Short!',
      });
    }
  
    try {
      // Check if username already exists
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({
          name: 'UserTakenError',
          error: 'UserTakenError',
          message: `User ${username} is already taken.`,
        });
      }
  
      const newUser = await createUser({ username, password });
  
      if (newUser) {
        const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: '24h' });
  
        res.status(201).json({
          message: 'User registered successfully',
          token: token,
          user: {
            id: newUser.id,
            username: newUser.username,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  });
  


// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const user = await getUserByUsername(username);
  
      if (!user) {
        res.status(401).json({
          error: 'InvalidCredentialsError',
          message: 'Invalid username or password',
        });
      } else {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
        if (!isPasswordCorrect) {
          res.status(401).json({
            error: 'InvalidCredentialsError',
            message: 'Invalid username or password',
          });
        } else {
          const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
            expiresIn: '24h',
          });
  
          res.status(200).json({
            message: "you're logged in!",
            token: token,
            user: {
              id: user.id,
              username: user.username,
            },
          });
        }
      }
    } catch (error) {
      next(error);
    }
  });
// GET /api/users/me

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
  
usersRouter.get('/me', authenticateUser, async (req, res, next) => {
try {
    const { id, username } = req.user;
    res.status(200).json({
    id: id,
    username: username,
    });
} catch (error) {
    next(error);
}
});
// GET /api/users/:username/routines
usersRouter.get('/:username/routines', authenticateUser, async (req, res, next) => {
    try {
      const { username } = req.params;
      const user = await getUserByUsername(username);
  
      if (!user) {
        return res.status(404).json({
          error: 'UserNotFoundError',
          message: `User ${username} not found.`,
        });
      }
  
      const routines = req.user.username === username
        ? await getAllRoutinesByUser(user)
        : await getPublicRoutinesByUser(user);

  
      res.status(200).json(routines);
    } catch (error) {
      next(error);
    }
  });
module.exports = usersRouter
