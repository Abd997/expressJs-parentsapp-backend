const { Client } = require("pg");
const logger = require("../src/utils/logger");
const config = require("./config");
const migrateDevDatabase = require("./migrateDevDatabase");

const migrate = async () => {
	let client = new Client(config);
	try {
		logger.info("Migrating dev database");
		client = await migrateDevDatabase(client);
		logger.info("Dev database migration completed");
	} catch (error) {
		logger.error("Failed to migrate dev database");
		logger.error(error);
		await client.end();
		return;
	}
	await client.end();
};

// migrate();

module.exports = migrate;
