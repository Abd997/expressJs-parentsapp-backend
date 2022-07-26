const { Client } = require("pg");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
	var connectedClient = new Client({
		user: "postgres",
		password: "password",
		database: "db_prod"
	});
} else if (process.env.NODE_ENV === "development") {
	var connectedClient = new Client({
		user: "postgres",
		password: "password",
		database: "db_dev"
	});
} else if (process.env.NODE_ENV === "test") {
	var connectedClient = new Client({
		user: "postgres",
		password: "password",
		database: "db_dev"
	});
}

async function connectDB() {
	await connectedClient.connect();
}

async function disconnectDB() {
	await connectedClient.end();
}

module.exports = {
	connectedClient,
	connectDB,
	disconnectDB
};
