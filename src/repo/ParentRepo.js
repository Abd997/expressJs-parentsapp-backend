const { connectedClient } = require("../utils/database");

module.exports = ParentRepo = {
	addParent: async function (parent) {
		const newUser = await connectedClient.query(`
      INSERT INTO parents (
        username, password, estm_birth_date_child
      ) VALUES (
        '${parent.username}', '${parent.password}','${parent.birthDateChild}'
      )
    `);
		// console.log(newUser);
		return newUser;
	},

	authenticateUser: async function (username, password) {
		const result = await connectedClient.query(`
      SELECT id from parents
      WHERE username='${username}' AND password='${password}'
    ;`);
		// console.log(result);
		if (result.rowCount == 0) {
			return null;
		}
		return result;
	},

	findUser: async function (username) {
		const result = await connectedClient.query(`
      SELECT id from parents
      WHERE username = '${username}'
    ;`);
		// console.log(result);
		if (result.rowCount == 0) {
			return null;
		}
		return result;
	}
};
