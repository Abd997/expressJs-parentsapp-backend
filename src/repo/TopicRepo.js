const { connectedClient } = require("../utils/database");

const TopicRepo = {
	updateMainTopicImage: async function (mainTopicId, image) {
		const res = await connectedClient.query(`
      UPDATE main_topics
      SET image_file = '${image}'      
      WHERE id = ${mainTopicId}
  ;`);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows;
	},
	findTopicById: async function (mainTopicId) {
		const res = await connectedClient.query(`
      SELECT * FROM main_topics
      WHERE id = ${mainTopicId}
  ;`);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows;
	},
	getTopicsForPregnancyStage: async function (stage) {
		const res = await connectedClient.query(`
      SELECT * FROM main_topics
      WHERE pregnancy_stage = ${stage}
    `);
		return res.rows;
	},

	getSubTopics: async function (id) {
		const res = await connectedClient.query(`
      SELECT id, name, description FROM sub_topics
      WHERE fk_main_topic = ${id}
    `);
		return res.rows;
	},

	getTopicById: async function (id) {
		const res = await connectedClient.query(`
      SELECT * FROM main_topics
      WHERE id = ${id}
    `);
		return res.rows;
	},

	addTopic: async function (topic) {
		const res = await connectedClient.query(`
       INSERT INTO main_topics (
        name,
        description,
        pregnancy_stage
       )
       VALUES (
        '${topic.name}',
        '${topic.description}',
        ${topic.pregnancyStage}
       )
       RETURNING *
    ;`);
		return res.rows[0];
	}
};

module.exports = TopicRepo;
