const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const { rows: [ routine ] } = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [creatorId, isPublic, name, goal]);

    console.log(routine)
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

async function getAllRoutines() {}

async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

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
