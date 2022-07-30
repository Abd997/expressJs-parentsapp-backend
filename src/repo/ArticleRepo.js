const { connectedClient } = require("../utils/database");

const ArticleRepo = {
	findArticles: async function (pregnancyStage) {
		const result = await connectedClient.query(`
      SELECT * FROM articles
      WHERE pregnancy_stage = ${pregnancyStage}
    `);
		// console.log(result);
		if (!result) {
			throw new Error("No article found");
		}
		return result.rows;
	}
};

module.exports = ArticleRepo;
