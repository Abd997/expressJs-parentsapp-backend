const e = require("express");
const ArticleRepo = require("../repo/ArticleRepo");
const UserArticlePreferenceRepo = require("../repo/UserArticlePreferenceRepo");
const sendErrorResponse = require("../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { pregnancyStage } = req.params;
	if (!pregnancyStage) {
		throw new Error("Pregnancy stage not sent");
	}
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await validate(req);
		const { pregnancyStage } = req.params;
		const authUser = req.body.authUser;
		let filteredArticles = [];
		const articles = await ArticleRepo.findArticles(pregnancyStage);
		const userUpdatedArticles =
			await UserArticlePreferenceRepo.findAll(authUser.id);
		for (let index = 0; index < articles.length; index++) {
			let configured = false;
			for (
				let index_1 = 0;
				index_1 < userUpdatedArticles.length;
				index_1++
			) {
				if (
					articles[index].id ===
					userUpdatedArticles[index_1].article_id
				) {
					filteredArticles.push({
						...articles[index],
						isFavourite: userUpdatedArticles[index_1].is_favourite,
						isRead: userUpdatedArticles[index_1].is_read,
						isRelevant: userUpdatedArticles[index_1].is_relevant
					});
					configured = true;
					break;
				}
			}
			if (!configured) {
				filteredArticles.push({
					...articles[index],
					isFavourite: false,
					isRead: false,
					isRelevant: true
				});
			}
		}
		return res.json({
			totalArticles: articles.length,
			data: filteredArticles
		});
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
};
