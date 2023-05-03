const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const result = await client.query(`
      INSERT INTO routine_activities ("routineId", "activityId", count, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [routineId, activityId, count, duration]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error adding activity with id ${activityId} to routine with id ${routineId}`);
    throw error;
  }
}


async function getRoutineActivityById(id) {
  try {
    
    const { rows: [ routineActivities ] } = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE id=$1;
    `, [id]);

    
    return routineActivities;
  } catch (error) {
    console.error("Error getting activity by id", error);
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows: routineActivities } = await client.query(`
      SELECT *
      FROM routine_activities
      WHERE "routineId"=$1;
    `, [id]);

    return routineActivities;
  } catch (error) {
    console.error("Error getting activities by routine id", error);
    throw error;
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(", ");

    const { rows: [ updatedRoutineActivity ] } = await client.query(`
      UPDATE routine_activities
      SET ${setString}
      WHERE id=$1
      RETURNING *;
    `, [id, ...Object.values(fields)]);

    return updatedRoutineActivity;
  } catch (error) {
    console.error("Error updating routine activity", error);
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const { rows: [ deletedRoutineActivity ] } = await client.query(`
      DELETE FROM routine_activities
      WHERE id=$1
      RETURNING *;
    `, [id]);

    return deletedRoutineActivity;
  } catch (error) {
    console.error("Error deleting routine activity", error);
    throw error;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const { rows: [ routineActivity ] } = await client.query(`
      SELECT *
      FROM routine_activities
      JOIN routines ON routine_activities."routineId" = routines.id
      WHERE routine_activities.id=$1
    `, [routineActivityId]);

    if (routineActivity.creatorId === userId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking if user can edit routine activity", error);
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
