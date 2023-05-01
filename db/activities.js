const client = require('./client');
const { getAllRoutines } = require('./routines');


// database functions
async function createActivity({ name, description }) {
  try {

    const { rows: [ activity ] } = await client.query(`
    INSERT INTO activities(name, description)
    VALUES($1, $2)
    RETURNING *;
    `, [name, description]);

    return activity;
  } catch (error) {
    console.error("Error creating activity", error);
  }
};

async function getAllActivities() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM activities;
    `);

    return rows;
  } catch (error) {
    console.error("Error getting all activities", error);
  }
};

async function getActivityById(id) {
  try {
    
    const { rows: [ activity ] } = await client.query(`
    SELECT *
    FROM activities
    WHERE id=$1;
    `, [id]);

    
    return activity;
  } catch (error) {
    console.error("Error getting activity by id", error);
  }
};

async function getActivityByName(name) {
  try {
    const { rows: [ activity ] } = await client.query(`
    SELECT *
    FROM activities
    WHERE name=$1;
    `, [name]);

    return activity;
  } catch (error) {
    console.error("Error getting activity by name", error);
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  // try {
  //   const { routineId } = routines.map(routine => routine.id);

  //   const activities = getAllActivities();
  //   const { activityId } = activities.map(activity => activity.id)

  //   const { rows: { routine_activity }} = await client.query(`
  //   INSERT INTO routine_activities("routineId", "activityId")
  //   VALUES ($${routineId}, $${activityId})
  //   ON CONFLICT DO NOTHING;
  //   `, [routineId, activityId]);

  //   return routine_activity;

  // } catch (error) {
  //   console.error("Error attaching routines to activities", error);
  // }
}

async function updateActivity({ id, ...fields }) {

  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1}`).join(', ');
  
  try {
    const { rows: [ activity ] } = await client.query(`
    UPDATE activities
    set ${setString}
    WHERE id=${ id }
    RETURNING *;
    `, Object.values(fields));

    return activity;
  } catch (error) {
    console.error("Error updating activity", error);
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
