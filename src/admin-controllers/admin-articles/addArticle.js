const e = require("express");
const BadRequestError = require("../../errors/BadRequestError");
const ArticleRepo = require("../../repo/ArticleRepo");
const SubTopicRepo = require("../../repo/SubTopicRepo");
const sendErrorResponse = require("../../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const {
		headline,
		description,
		signature,
		pregnancyStage,
		subTopicId
	} = req.body;

	if (!headline) {
		throw new BadRequestError("Headline is not sent");
	} else if (!description) {
		throw new BadRequestError("Description not sent");
	} else if (!signature) {
		throw new BadRequestError("Signature not sent");
	} else if (!pregnancyStage) {
		throw new BadRequestError("Pregnancy stage not sent");
	} else if (!subTopicId) {
		throw new BadRequestError("Sub topic id not sent");
	}

	const subTopic = await SubTopicRepo.findSubtopicById(subTopicId);
	if (!subTopic) {
		throw new BadRequestError("Sub topic does not exists");
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
		const {
			headline,
			description,
			signature,
			pregnancyStage,
			subTopicId
		} = req.body;

		const article = await ArticleRepo.addArticles({
			headline: headline,
			description: description,
			signature: signature,
			pregnancyStage: pregnancyStage,
			subTopicId: subTopicId
		});
		res.json({
			msg: "Article has been added",
			article: article
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
