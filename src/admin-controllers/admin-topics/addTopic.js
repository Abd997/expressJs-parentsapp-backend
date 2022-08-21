const e = require("express");
const BadRequestError = require("../../errors/BadRequestError");
const TopicRepo = require("../../repo/TopicRepo");
const sendErrorResponse = require("../../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { name, description, pregnancyStage } = req.body;
		const article = await TopicRepo.addTopic({
			name: name,
			description: description,
			pregnancyStage: pregnancyStage
		});
		res.json({
			msg: "Main topic has been added",
			article: article
		});
	} catch (error) {
		console.log(error);

		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
