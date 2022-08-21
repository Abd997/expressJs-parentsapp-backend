const { connectedClient } = require("../utils/database");

const SubTopicRepo = {
	findSubtopicById: async function (subTopicId) {
		const res = await connectedClient.query(`
      SELECT * FROM sub_topics
      WHERE id = ${subTopicId}
    ;`);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows;
	},
	addSubTopic: async function (subTopic) {
		const res = await connectedClient.query(`
      INSERT INTO sub_topics (
        name,
        description,
        pregnancy_stage,
        fk_main_topic
      ) VALUES (
        '${subTopic.name}',
        '${subTopic.description}',
        ${subTopic.pregnancyStage},
        ${subTopic.mainTopicId}
      )
      RETURNING *
    ;`);
		return res.rows[0];
	}
};

module.exports = SubTopicRepo;
