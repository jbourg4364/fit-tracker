const client = require("./client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { rows: [ user ] } = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, hashedPassword]);

    return user;
  } catch (error) {
    console.error("Error creating users", error);
  }
}

async function getUser({ username, password }) {
try {
  const { rows } = await client.query(`
  SELECT username, password
  FROM users;
  `, [username, password]);

  return rows;
} catch (error) {
  console.error("Error getting user", error);
}
}

async function getUserById(userId) {
try {
  const { rows: [ user ] } = await client.query(`
  SELECT * FROM users
  WHERE id=${ userId }
  `);

  if (!user) {
    return null
  }

  return user;
} catch (error) {
  console.error("Error getting User by Id", error);
}
}

async function getUserByUsername(userName) {
try {
  const { rows: [ user ] } = await client.query(`
  SELECT * FROM users
  WHERE username=$1;
  `, [userName]);

  if (!user) {
    return null
  }

  return user;
} catch (error) {
  console.error("Error getting username", error);
}
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
