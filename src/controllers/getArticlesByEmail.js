const e = require("express");
const ArticleRepo = require("../repo/ArticleRepo");
const { findUser } = require("../repo/ParentRepo");
const ParentRepo = require("../repo/ParentRepo");
const sendErrorResponse = require("../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const email = req.params.email;
	if (!email) {
		throw new Error("Email not sent");
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
		const email = req.params.email;
		await findUser(email);
		const pregnancyStage = await ParentRepo.getPregnancyStage(email);
		const articles = await ArticleRepo.findArticles(pregnancyStage);
		return res.json({
			totalArticles: articles.length,
			data: articles
		});
	} catch (error) {
		// console.error(error);
		return sendErrorResponse(res, 500, error.message);
	}
};
