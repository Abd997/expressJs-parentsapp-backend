const e = require("express");
const topicRepo = require("../repo/topicRepo");
const sendErrorResponse = require("../sendErrorResponse");
const logger = require("../utils/logger");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	/** @type {string}*/
	const pregnancyMonth = req.params.pregnancyMonth;
	let topics = [];
	try {
		var data = await topicRepo.getTopicsForPregnancyMonth(
			pregnancyMonth
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
		logger.error(error);
		return sendErrorResponse(res, 500, "Could not get topics");
	}
	res.json({ topics: data });
};
