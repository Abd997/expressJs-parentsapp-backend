const { connectedClient } = require("../utils/database");

const AdminRepo = {
	getAdmin: async function (adminEmail) {
		const res = await connectedClient.query(`
      SELECT * FROM admins
      WHERE email = '${adminEmail}'
    ;`);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows[0];
	},
	getAdminEmail: async function () {
		const res = await connectedClient.query(`
      SELECT email FROM admins
    ;`);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows[0].email;
	}
};

module.exports = AdminRepo;
