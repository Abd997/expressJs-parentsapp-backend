const { connectedClient } = require("../utils/database");

const ParentRepo = {
	addParent: async function (parent) {
		const newUser = await connectedClient.query(`
      INSERT INTO parents (
        email, username, password
      ) VALUES (
        '${parent.email}', '${parent.username}', '${parent.password}'
      )
    `);
		// console.log(newUser);
		return newUser;
	},

	authenticateUser: async function (email, password) {
		const result = await connectedClient.query(`
      SELECT id FROM parents
      WHERE email='${email}' AND password='${password}'
    ;`);
		// console.log(result);
		if (result.rowCount == 0) {
			return null;
		}
		return result;
	},

	findUser: async function (email) {
		const result = await connectedClient.query(`
      SELECT id from parents
      WHERE email = '${email}'
    ;`);
		// console.log(result);
		if (result.rowCount == 0) {
			throw new Error("User not found");
		}
		return result;
	},

	checkUser: async function (email) {
		const result = await connectedClient.query(`
      SELECT id from parents
      WHERE email = '${email}'
    ;`);
		// console.log(result);
		if (result.rowCount == 0) {
			return false;
		}
		return true;
	},

	getPregnancyStage: async function (email) {
		const result = await connectedClient.query(`
      SELECT pregnancy_stage from parents
      WHERE email = '${email}'
    ;`);
		// console.log(result);
		if (result.rowCount == 0) {
			throw new Error("Data not found");
		}
		return result.rows[0].pregnancy_stage;
	}
};

module.exports = ParentRepo;
