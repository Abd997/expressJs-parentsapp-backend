const loginTest = require("./login-test");
const registerTest = require("./register-test");
const sequelize = require("../src/utils/db");
const { Client } = require("pg");
const articlesTest = require("./articles-test");

describe("test backend", () => {
	let pgclient;

	beforeAll(async () => {
		try {
			pgclient = new Client({
				user: "postgres",
				password: "password"
			});
			await pgclient.connect();
			await pgclient.query(
				`SELECT *, pg_terminate_backend(pid)
			    FROM pg_stat_activity
			    WHERE pid <> pg_backend_pid()
			    AND datname = 'database_test'`
			);
			await pgclient.query("DROP DATABASE IF EXISTS database_test");
			await pgclient.query("CREATE DATABASE database_test");
			await pgclient.end();
			await sequelize.sync({ force: true });
		} catch (err) {
			console.log(err);
		}
	});

	const data = {
		email: "test2@gmail.com"
	};

	registerTest(data);
	loginTest(data);
	articlesTest(data);

	afterAll(async () => {
		await sequelize.close();
	});
});
