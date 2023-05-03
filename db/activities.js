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
  try {
    const routinesWithActivitiesPromises = routines.map(async (routine) => {
      const { rows: activities } = await client.query(`
        SELECT *
        FROM routine_activities
        WHERE "routineId"=$1;
      `, [routine.id]);

      return { ...routine, activities };
    });

    const routinesWithActivities = await Promise.all(routinesWithActivitiesPromises);
    console.log(routinesWithActivities)
    return routinesWithActivities;
  } catch (error) {
    console.error("Error attaching activities to routines", error);
    throw error;
  }
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
