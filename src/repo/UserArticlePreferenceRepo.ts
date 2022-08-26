const { connectedClient } = require("../utils/database");

export = {
	findAll: async function (parentId: number) {
		const res = await connectedClient.query(
			`
     SELECT * FROM users_articles_preferences
     WHERE parent_id = $1
    ;`,
			[parentId]
		);
		return res.rows;
	},
	findOne: async function (parentId: number, articleId: number) {
		const res = await connectedClient.query(
			`
     SELECT * FROM users_articles_preferences
     WHERE parent_id = $1 AND article_id = $2
    ;`,
			[parentId, articleId]
		);
		if (res.rowCount == 0) {
			return null;
		}
		return res.rows[0];
	},
	insertOne: async function (parentId: number, articleId: number) {
		const result = await connectedClient.query(
			`
      INSERT INTO users_articles_preferences (
        parent_id,
        article_id
      )
      VALUES (
        $1,
        $2
      )
      RETURNING *
    ;`,
			[parentId, articleId]
		);
		return result.rows[0];
	},
	updateOne: async function (
		parentId: number,
		articleId: number,
		columnName: string,
		newValue: boolean
	) {
		await connectedClient.query(
			`
      UPDATE users_articles_preferences
      SET ${columnName} = $1
      WHERE parent_id = $2 AND article_id = $3
    ;`,
			[newValue, parentId, articleId]
		);
	},
	removeOne: async function (parentId: number, mainTopicId: number) {
		await connectedClient.query(
			`
      DELETE FROM users_articles_preferences
      WHERE parent_id = $1 AND main_topic_id = $2
    ;`,
			[parentId, mainTopicId]
		);
	}
};
