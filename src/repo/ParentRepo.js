const { connectedClient } = require("../utils/database");

const ParentRepo = {
	updateOne: async function (columnToUpdate, newValue, parentEmail) {
		const result = await connectedClient.query(
			`
      UPDATE parents
      SET ${columnToUpdate} = $1
      WHERE email = $2 
  ;`,
			[newValue, parentEmail]
		);
		// console.log(result);
		return result.rows[0];
	},
	addParent: async function (parent) {
		const newUser = await connectedClient.query(`
      INSERT INTO parents (
        email, username, password
      ) 
      VALUES (
        '${parent.email}', '${parent.username}', '${parent.password}'
      )
    `);
		// console.log(newUser);
		return newUser;
	},

	authenticateUser: async function (email, password) {
		const result = await connectedClient.query(
			`
      SELECT id FROM parents
      WHERE email = $1 AND password = $2
    ;`,
			[email, password]
		);
		// console.log(result);
		if (result.rowCount == 0) {
			return null;
		}
		return result;
	},

	findUser: async function (email) {
		const result = await connectedClient.query(
			`
      SELECT 
        id, 
        email, 
        username, 
        age, 
        pregnancy_stage, 
        estm_birth_date_child,
        created_on,
        last_login
      FROM parents
      WHERE email = $1
    ;`,
			[email]
		);
		// console.log(result);
		if (result.rowCount == 0 || !result) {
			return null;
		}
		return result.rows[0];
	},

	findUserByUsername: async function (username) {
		const result = await connectedClient.query(`
      SELECT id from parents
      WHERE username = '${username}'
    ;`);
		// console.log(result);
		if (result.rowCount == 0) {
			return null;
		}
		return result;
	},

	checkUser: async function (email) {
		const result = await connectedClient.query(
			`
      SELECT * from parents
      WHERE email = $1
    ;`,
			[email]
		);
		// console.log(result);
		if (result.rowCount == 0) {
			return null;
		}
		return result.rows[0];
	},

	getPregnancyStage: async function (email) {
		const result = await connectedClient.query(`
      SELECT pregnancy_stage from parents
      WHERE email = '${email}'
    ;`);
		// console.log(result);
		if (result.rowCount == 0) {
			return null;
		}
		return result.rows[0].pregnancy_stage;
	}
};

module.exports = ParentRepo;
