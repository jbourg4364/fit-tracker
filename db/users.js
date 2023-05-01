const client = require("./client");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { rows: [users] } = await client.query(`
      INSERT INTO users(username, password)
      VALUES($1, $2)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, hashedPassword]);

    return users;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {

}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
