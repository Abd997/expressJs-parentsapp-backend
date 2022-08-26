const { Client } = require("pg");
const logger = require("../src/utils/logger");
const config = require("../config/dbConfig");
const bcrypt = require("bcrypt");

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
      id                          serial PRIMARY KEY,
      username                    VARCHAR ( 100 ) UNIQUE NOT NULL,
      email                       VARCHAR ( 255 ) UNIQUE NOT NULL,
      password                    VARCHAR ( 100 ) NOT NULL,
      age                         INTEGER,
      estm_birth_date_child       DATE,
      pregnancy_stage             INTEGER NOT NULL DEFAULT 1,
      created_on                  DATE NOT NULL DEFAULT NOW(),
      last_login                  DATE DEFAULT NOW() 
    );`);

	await client.query(`
    CREATE TABLE admins (
      id                          serial PRIMARY KEY,
      email                       VARCHAR ( 255 ) UNIQUE NOT NULL,
      password                    VARCHAR ( 100 ) NOT NULL,
      created_on                  DATE NOT NULL DEFAULT NOW(),
      last_login                  DATE DEFAULT NOW() 
    );`);

	await client.query(`
    CREATE TABLE main_topics(
      id                          serial PRIMARY KEY,
      name                        VARCHAR ( 100 ) NOT NULL,
      description                 VARCHAR ( 1000 ),
      pregnancy_stage             INTEGER NOT NULL,
      image_file                  VARCHAR(200),
      created_on                  DATE NOT NULL DEFAULT NOW(),
      last_updated                DATE DEFAULT NOW() 
    );`);

	await client.query(`
    CREATE TABLE sub_topics(
      id                          serial PRIMARY KEY,
      name                        VARCHAR ( 100 ) NOT NULL,
      description                 VARCHAR ( 1000 ),
      created_on                  DATE NOT NULL DEFAULT NOW(),
      last_updated                DATE DEFAULT NOW(),
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
      image_file                  VARCHAR(200),
      created_on                  DATE NOT NULL DEFAULT NOW(),
      last_updated                DATE DEFAULT NOW(),
      fk_sub_topic                integer,
      FOREIGN KEY(fk_sub_topic)   REFERENCES sub_topics(id)
    );`);

	await client.query(`
    CREATE TABLE messages(
      id                          serial PRIMARY KEY,
      message_text                VARCHAR (1000) NOT NULL,
      status                      VARCHAR (100) DEFAULT 'unread',
      message_to                  VARCHAR (100),
      message_from                VARCHAR (100),
      created_on                  DATE NOT NULL DEFAULT NOW(),
      last_updated                DATE DEFAULT NOW()      
    );`);

	await client.query(`
    CREATE TABLE tasks(
      id                          serial PRIMARY KEY,
      name                        VARCHAR ( 100 ) NOT NULL,
      description                 VARCHAR (1000),
      comment                     VARCHAR (1000),
      type                        VARCHAR (100) DEFAULT 'procurement',
      status                      VARCHAR (100) DEFAULT 'open',
      is_relevant                 BOOLEAN DEFAULT TRUE,
      start_date                  DATE NOT NULL,
      end_date                    DATE NOT NULL,
      parent_email                VARCHAR (255) NOT NULL
    );`);
	await client.query(`
      alter table tasks
      add foreign key (parent_email)
      references parents(email);
    `);

	await client.query(`
    CREATE TABLE sub_tasks(
      id                          serial PRIMARY KEY,
      name                        VARCHAR ( 100 ) NOT NULL,
      status                      BOOLEAN DEFAULT FALSE,
      fk_task                     integer,
      FOREIGN KEY(fk_task)        REFERENCES tasks(id)
    );`);

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash("ERDdNY3T%Q!bg*Gr", salt);

	// insert admin
	await client.query(`
    INSERT INTO admins (
      email, password
    ) VALUES (
      'henri@stimdev.com',
      '${hashPassword}'
    )
  `);

	// insert 2 parents for every pregnancy stage
	// for (let i = 0; i < 2; i++) {
	// 	for (let j = 1; j < 7; j++) {
	// 		await client.query(`
	//       INSERT INTO parents (
	//         username, password, email, age, pregnancy_stage
	//       ) VALUES (
	//         'parent${i}${j}', 'password', 'parent${i}${j}@gmail.com', 31, ${j}
	//       );`);
	// 	}
	// }

	// // insert main topics for every pregnancy stage
	for (let i = 1; i < 7; i++) {
		await client.query(`
	    INSERT INTO main_topics (
	        name, description, pregnancy_stage
	    ) VALUES (
	      'topic${i}', 'description', ${i}
	    );`);
	}

	// // insert 2 sub topics for every main topic
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

	// // insert 6 articles for every sub topic
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
