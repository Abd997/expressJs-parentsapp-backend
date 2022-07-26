const Parent = require("../models/parent");
const { connectedClient } = require("../utils/database");

module.exports = ParentRepo = {
	addParent: async function (parent) {
		const newUser = await connectedClient.query(`
      INSERT INTO parents (
        username, password, email, pregnancy_month
      ) VALUES (
        '${parent.username}', '${parent.password}','${parent.email}', ${parent.pregnancyMonth}
      )
    `);

		// console.log(newUser);
		return newUser;
	},
	authenticateUser: async function (email, password) {
		const result = await connectedClient.query(`
      SELECT id from parents
      WHERE email = '${email}' AND password = '${password}'
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
			return null;
		}
		return result;
	}
};
