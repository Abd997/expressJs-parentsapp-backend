const { Client } = require("pg");
const logger = require("../src/utils/logger");
const config = require("./config");

/**
 *
 * @param {Client} client
 * @returns
 */
module.exports = async (client) => {
	const dbName = "db_dev";

	logger.info("Initiating connection to database...");
	await client.connect();
	logger.info("Connected to database");
	logger.info("Creating dev database...");
	await client.query(`
    SELECT
    pg_terminate_backend(pid) 
    FROM 
    pg_stat_activity 
    WHERE 
    -- don't kill my own connection!
    pid <> pg_backend_pid()
    -- don't kill the connections to other databases
    AND datname = '${dbName}'
  ;
  `);
	await client.query(`DROP DATABASE IF EXISTS ${dbName}`);
	await client.query(`CREATE DATABASE ${dbName}`);
	logger.info("Created dev database");
	await client.end();
	client = new Client({ ...config, database: dbName });
	await client.connect();

	await client.query(`
		CREATE TABLE parents (
      id                      serial PRIMARY KEY,
      username                VARCHAR ( 100 ) UNIQUE NOT NULL,
      email                   VARCHAR ( 255 ) UNIQUE NOT NULL,
      password                VARCHAR ( 100 ) NOT NULL,
      age                     INTEGER,
      estm_birth_date_child   VARCHAR( 100 ),
      pregnancy_stage         INTEGER NOT NULL DEFAULT 1,
      created_on              TIMESTAMP NOT NULL DEFAULT NOW(),
      last_login              TIMESTAMP DEFAULT NOW() 
    );`);

	await client.query(`
    CREATE TABLE main_topics(
      id                serial PRIMARY KEY,
      name              VARCHAR ( 100 ) NOT NULL,
      description       VARCHAR ( 1000 ),
      pregnancy_stage   INTEGER NOT NULL,
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
      pregnancy_stage             INTEGER NOT NULL,
      fk_main_topic               integer,
      FOREIGN KEY(fk_main_topic)  REFERENCES main_topics(id)
    );`);

	await client.query(`
    CREATE TABLE articles(
      id                          serial PRIMARY KEY,
      headline                    VARCHAR ( 100 ) NOT NULL,
      description                 VARCHAR ( 1000 ),
      signature                   VARCHAR ( 1000 ),
      pregnancy_stage             INTEGER NOT NULL,
      created_on                  TIMESTAMP NOT NULL DEFAULT NOW(),
      last_updated                TIMESTAMP DEFAULT NOW(),
      fk_sub_topic                integer,
      FOREIGN KEY(fk_sub_topic)   REFERENCES sub_topics(id)
    );`);

	// insert 2 parents for every pregnancy stage
	for (let i = 0; i < 2; i++) {
		for (let j = 1; j < 7; j++) {
			await client.query(`
        INSERT INTO parents (
          username, password, email, age, pregnancy_stage, estm_birth_date_child
        ) VALUES (
          'parent${i}${j}', 'password', 'parent${i}${j}@gmail.com', 31, ${j}, ${Date.now()}
        );`);
		}
	}

	// insert main topics for every pregnancy stage
	for (let i = 1; i < 7; i++) {
		await client.query(`
      INSERT INTO main_topics (
          name, description, pregnancy_stage
      ) VALUES (
        'topic${i}', 'description', ${i}
      );`);
	}

	// insert 2 sub topics for every main topic
	for (let i = 0; i < 2; i++) {
		for (let j = 1; j < 7; j++) {
			await client.query(`
	      INSERT INTO sub_topics (
	        name, description, fk_main_topic, pregnancy_stage
	      ) VALUES (
	        'subtopic${j}${i}', 'description', ${j}, ${j}
	      ); `);
		}
	}

	// insert 6 articles for every sub topic
	for (let i = 1; i < 13; i++) {
		for (let j = 1; j < 7; j++) {
			await client.query(`
	      INSERT INTO articles (
	        headline, description, signature, pregnancy_stage, fk_sub_topic
	      ) VALUES (
	        'headline${i}${j}', 'description', 'signature', ${j}, ${i}
	      );
	    `);
		}
	}

	return client;
};
