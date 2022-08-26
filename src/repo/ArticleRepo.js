const { connectedClient } = require("../utils/database");

const ArticleRepo = {
	updateArticleImageFile: async function (imageFile, articleId) {
		const result = await connectedClient.query(`
      UPDATE articles
      SET image_file = '${imageFile}'
      WHERE id = ${articleId}
  ;`);
	},
	findArticles: async function (pregnancyStage) {
		const result = await connectedClient.query(`
      SELECT * FROM articles
      WHERE pregnancy_stage = ${pregnancyStage}
    `);
		return result.rows;
	},

	findArticleById: async function (articleId) {
		const result = await connectedClient.query(`
      SELECT * FROM articles
      WHERE id = ${articleId}
    `);
		if (!result) {
			throw new Error("No article found");
		}
		return result.rows[0];
	},
	addArticles: async function (article) {
		const result = await connectedClient.query(`
      INSERT INTO articles (
        headline,
        description,
        signature,
        pregnancy_stage,
        fk_sub_topic
      )
      VALUES (
        '${article.headline}',
        '${article.description}',
        '${article.signature}',
        ${article.pregnancyStage},
        ${article.subTopicId}
      )
      RETURNING *
    ;`);
		return result.rows[0];
	}
};

module.exports = ArticleRepo;
