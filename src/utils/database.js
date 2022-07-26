const { Client } = require("pg");

let connectedClient = new Client({
	user: "postgres",
	password: "password",
	database: "db_dev"
});

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
