const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities");


async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const { rows: [ routine ] } = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [creatorId, isPublic, name, goal]);

   
    return routine;
  } catch (error) {
    console.error("Error creating routine", error);
    throw error;
  }
};

async function getRoutineById(id) {
  try {
    const result = await client.query(`
      SELECT * FROM routines
      WHERE id=$1;
    `, [id]);

    return result.rows[0];
  } catch (error) {
    console.error(`Error getting routine by id: ${id}`);
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const result = await client.query(`
      SELECT routines.*
      FROM routines
      LEFT JOIN routine_activities ON routines.id = routine_activities."routineId"
      WHERE routine_activities.id IS NULL;
    `);
    return result.rows;
  } catch (error) {
    console.error("Error getting routines without activities");
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(
      `
       SELECT routines.*, users.username AS "creatorName"
       FROM routines
       JOIN users ON routines."creatorId" = users.id
    `
    );
    
  return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}


async function getAllPublicRoutines() {
try {
  const { rows:routines } = await client.query(`
  SELECT routines.*, users.username AS "creatorName"
  FROM routines
  JOIN users ON routines."creatorId" = users.id
  WHERE "isPublic" IS TRUE;
  `)
  return await attachActivitiesToRoutines(routines)
} catch (error) {
  console.error("Error getting all public routines", error)
}
}

async function getAllRoutinesByUser({ username }) {
  try {
    // Join the routines and users tables, and filter by the given username
    const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      WHERE users.username = $1;
    `, [username]);

    // Attach activities to each routine
    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    console.error("Error getting all routines by user", error);
    throw error;
  }
}


async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id
    WHERE users.username=$1 AND "isPublic";
    `, [username]);
    return await attachActivitiesToRoutines(routines)
  } catch (error) {
    console.error("Error getting public routines by user", error);
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      JOIN routine_activities ON routines.id = routine_activities."routineId"
      WHERE "isPublic" = true AND routine_activities."activityId" = $1;
    `, [id]);

    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    console.error("Error getting public routines by activity", error);
    throw error;
  }
}


async function updateRoutine({ id, ...fields }) {
  // Create a string to set the fields to update with their respective placeholders
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    // Run the SQL query to update the routines table with the new values based on the provided id
    const { rows: [ updatedRoutine ] } = await client.query(`
      UPDATE routines
      SET ${setString}
      WHERE id=$${Object.keys(fields).length + 1}
      RETURNING *;
    `, [...Object.values(fields), id]);

    // Return the updated routine
    return updatedRoutine;
  } catch (error) {
    console.error("Error updating routine", error);
    throw error;
  }
}


async function destroyRoutine(id) {
  try {
    // Delete all the routine_activities associated with the routine
    await client.query(`
      DELETE FROM routine_activities
      WHERE "routineId"=$1;
    `, [id]);

    // Delete the routine from the routines table
    const { rows: [deletedRoutine] } = await client.query(`
      DELETE FROM routines
      WHERE id=$1
      RETURNING *;
    `, [id]);

    // Return the deleted routine
    return deletedRoutine;
  } catch (error) {
    console.error("Error deleting routine", error);
    throw error;
  }
}


module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
