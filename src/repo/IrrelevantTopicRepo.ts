const { connectedClient } = require("../utils/database");

export = {
	findAll: async function (parentId: number) {
		const res = await connectedClient.query(
			`
     SELECT * FROM user_irrelevant_main_topics
     WHERE parent_id = $1
    ;`,
			[parentId]
		);
		return res.rows;
	},
	findOne: async function (parentId: number, mainTopicId: number) {
		const res = await connectedClient.query(
			`
     SELECT * FROM user_irrelevant_main_topics
     WHERE parent_id = $1 AND main_topic_id = $2
    ;`,
			[parentId, mainTopicId]
		);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows[0];
	},
	insertOne: async function (parentId: number, mainTopicId: number) {
		await connectedClient.query(
			`
      INSERT INTO user_irrelevant_main_topics (
        parent_id,
        main_topic_id
      )
      VALUES (
        $1,
        $2
      )
    ;`,
			[parentId, mainTopicId]
		);
	},
	removeOne: async function (parentId: number, mainTopicId: number) {
		await connectedClient.query(
			`
      DELETE FROM user_irrelevant_main_topics
      WHERE parent_id = $1 AND main_topic_id = $2
    ;`,
			[parentId, mainTopicId]
		);
	}
};
