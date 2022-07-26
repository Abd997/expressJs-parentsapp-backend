const loginTest = require("./login-test");
const registerTest = require("./register-test");
const { Client } = require("pg");
const articlesTest = require("./articles-test");
const { connectDB } = require("../src/utils/database");

describe("test backend", () => {
	let pgclient;
	it("dummy", () => {});
	// beforeAll(async () => {
	// 	try {
	// 		pgclient = new Client({
	// 			user: "postgres",
	// 			password: "password"
	// 		});
	// 		await pgclient.connect();
	// 		await pgclient.query(
	// 			`SELECT *, pg_terminate_backend(pid)
	//       FROM pg_stat_activity
	//       WHERE pid <> pg_backend_pid()
	//       AND datname = 'database_test'`
	// 		);
	// 		await pgclient.query("DROP DATABASE IF EXISTS db_test");
	// 		await pgclient.query("CREATE DATABASE db_test");
	// 		await pgclient.end();
	// 		await connectDB();
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// });
	// const data = {
	// 	email: "test2@gmail.com"
	// };
	// registerTest(data);
	// loginTest(data);
	// articlesTest(data);
	// afterAll(async () => {});
});
