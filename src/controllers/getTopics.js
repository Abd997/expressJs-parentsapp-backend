const e = require("express");
const TopicRepo = require("../repo/TopicRepo");
const topicRepo = require("../repo/TopicRepo");
const sendErrorResponse = require("../sendErrorResponse");
const logger = require("../utils/logger");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const pregnancyStage = req.params.pregnancyStage;
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
		/** @type {string}*/
		const pregnancyStage = req.params.pregnancyStage;
		let topics = [];
		var data = await TopicRepo.getTopicsForPregnancyStage(
			pregnancyStage
		);
		for (let i = 0; i < data.length; i++) {
			let subTopics = await topicRepo.getSubTopics(data[i].id);
			data[i] = {
				...data[i],
				subTopics
			};
			topics.push(data);
		}
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
	res.json({ topics: data });
};
