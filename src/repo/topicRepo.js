const Topic = require("../models/topic");
const { connectedClient } = require("../utils/database");
const logger = require("../utils/logger");

module.exports = topicRepo = {
	getTopicsForPregnancyMonth: async function (month) {
		// const res = await Topic.findAll({
		// 	where: { pregnancy_month: month }
		// });
		const res = await connectedClient.query(`
      SELECT id, name, description FROM main_topics
      WHERE pregnancy_month = ${month}
    `);
		return res.rows;
	},
	getSubTopics: async function (id) {
		// const res = await Topic.findAll({
		// 	where: { pregnancy_month: month }
		// });
		const res = await connectedClient.query(`
      SELECT id, name, description FROM sub_topics
      WHERE fk_main_topic = ${id}
    `);
		// logger.info(res);
		return res.rows;
	}
};
