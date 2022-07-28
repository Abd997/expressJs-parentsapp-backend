const { connectedClient } = require("../utils/database");

module.exports = TopicRepo = {
	getTopicsForPregnancyStage: async function (stage) {
		const res = await connectedClient.query(`
      SELECT id, name, description FROM main_topics
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
	}
};
