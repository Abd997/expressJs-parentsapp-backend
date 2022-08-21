const e = require("express");
const BadRequestError = require("../../errors/BadRequestError");
const SubTopicRepo = require("../../repo/SubTopicRepo");
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
		const { name, description, pregnancyStage, mainTopicId } =
			req.body;

		const mainTopic = await TopicRepo.getTopicById(mainTopicId);
		if (!mainTopic) {
			throw new BadRequestError("Main topic does not exists");
		}

		const subTopic = await SubTopicRepo.addSubTopic({
			name: name,
			description: description,
			pregnancyStage: pregnancyStage,
			mainTopicId: mainTopicId
		});
		res.json({
			msg: "Sub topic added",
			subTopic: subTopic
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
