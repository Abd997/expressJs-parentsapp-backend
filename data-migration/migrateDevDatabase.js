const { Client } = require("pg");
const config = require("./config");

/**
 *
 * @param {Client} client
 * @returns
 */
module.exports = async (client) => {
	const dbName = "db_dev";

	console.log("Initiating connection to database...");
	await client.connect();
	console.log("Connected to database");
	console.log("Creating dev database...");
	await client.query(`DROP DATABASE IF EXISTS ${dbName}`);
	await client.query(`CREATE DATABASE ${dbName}`);
	console.log("Created dev database");
	await client.end();
	client = new Client({ ...config, database: dbName });
	await client.connect();
	await client.query(`
		CREATE TABLE parents (
      id                serial PRIMARY KEY,
      username          VARCHAR ( 50 ) UNIQUE NOT NULL,
      password          VARCHAR ( 50 ) NOT NULL,
      email             VARCHAR ( 255 ) UNIQUE NOT NULL,
      age               INTEGER,
      pregnancy_month   INTEGER NOT NULL,
      created_on        TIMESTAMP NOT NULL DEFAULT NOW(),
      last_login        TIMESTAMP DEFAULT NOW() 
    );`);

	await client.query(`
    CREATE TABLE main_topics(
      id                serial PRIMARY KEY,
      name              VARCHAR ( 100 ) NOT NULL,
      description       VARCHAR ( 1000 ),
      pregnancy_month   integer NOT NULL,
      created_on        TIMESTAMP NOT NULL DEFAULT NOW(),
      last_updated      TIMESTAMP DEFAULT NOW() 
    );`);
	await client.query(`
    CREATE TABLE sub_topics(
      id                          serial PRIMARY KEY,
      name                        VARCHAR ( 100 ) NOT NULL,
      description                 VARCHAR ( 1000 ),
      created_on                  TIMESTAMP NOT NULL DEFAULT NOW(),
      last_updated                TIMESTAMP DEFAULT NOW(),
      fk_main_topic               integer,
      FOREIGN KEY(fk_main_topic)  REFERENCES main_topics(id)
    );`);

	await client.query(`
    CREATE TABLE articles(
      id                          serial PRIMARY KEY,
      headline                    VARCHAR ( 100 ) NOT NULL,
      description                 VARCHAR ( 1000 ),
      signature                   VARCHAR ( 1000 ),
      pregnancy_month             integer,
      created_on                  TIMESTAMP NOT NULL DEFAULT NOW(),
      last_updated                TIMESTAMP DEFAULT NOW(),
      fk_sub_topic                integer,
      FOREIGN KEY(fk_sub_topic)   REFERENCES sub_topics(id)
    );`);

	for (let i = 1; i < 11; i++) {
		await client.query(`
      INSERT INTO parents (
        username, password, email, age, pregnancy_month
      ) VALUES (
        'parent${i}', 'password', 'parent${i}@gmail.com', 31, 2
      );`);
	}
	for (let i = 0; i < 2; i++) {
		for (let j = 1; j < 10; j++) {
			await client.query(`
        INSERT INTO main_topics (
            name, description, pregnancy_month
        ) VALUES (
          'topic${j}', 'description', ${j}
        );`);
		}
	}
	for (let i = 1; i < 11; i++) {
		for (let j = 1; j < 11; j++) {
			await client.query(`
        INSERT INTO sub_topics (
          name, description, fk_main_topic
        ) VALUES (
          'subtopic${j}', 'description', ${i}
        );
      `);
		}
	}
	for (let i = 1; i < 101; i++) {
		for (let j = 1; j < 4; j++) {
			await client.query(`
        INSERT INTO articles (
          headline, description, signature, pregnancy_month, fk_sub_topic
        ) VALUES (
          'headline', 'description', 'signature', ${j}, ${i}
        );
      `);
		}
	}
	return client;
};
