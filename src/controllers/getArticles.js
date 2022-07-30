const e = require("express");
const ArticleRepo = require("../repo/ArticleRepo");
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
		const articles = await ArticleRepo.findArticles(pregnancyStage);
		return res.json({
			totalArticles: articles.length,
			data: articles
		});
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
};
