const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  try {
    const result = await client.query(`
      INSERT INTO activities (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `, [name, description]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error creating activity: ${name}`);
    throw error;
  }
}


async function getAllActivities() {
  try {
    const result = await client.query(`
      SELECT * FROM activities;
    `);
    return result.rows;
  } catch (error) {
    console.error("Error getting all activities");
    throw error;
  }
}


async function getActivityById(id) {}

async function getActivityByName(name) {}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
