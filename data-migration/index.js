const { Client } = require("pg");
const config = require("./config");
const migrateDevDatabase = require("./migrateDevDatabase");

(async () => {
	let client = new Client(config);
	try {
		console.log("Migrating dev database");
		client = await migrateDevDatabase(client);
		console.log("Dev database migration completed");
	} catch (error) {
		console.log("Failed to migrate dev database");
		console.error(error);
		await client.end();
		return;
	}
	await client.end();
})();
