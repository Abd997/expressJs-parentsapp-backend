const e = require("express");
const IrrelevantTopicRepo = require("../repo/IrrelevantTopicRepo");
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
		const { authUser } = req.body;
		/** @type {Array} */
		const irrelTopics = await IrrelevantTopicRepo.findAll(
			authUser.id
		);
		const pregnancyStage = req.params.pregnancyStage;
		let topicsFiltered = [];
		var allTopics = await TopicRepo.getTopicsForPregnancyStage(
			pregnancyStage
		);
		for (let i = 0; i < allTopics.length; i++) {
			let isTopicRelevant = true;
			for (let i_1 = 0; i_1 < irrelTopics.length; i_1++) {
				if (irrelTopics[i_1].main_topic_id === allTopics[i].id) {
					isTopicRelevant = false;
					break;
				}
			}
			if (isTopicRelevant) {
				let subTopics = await topicRepo.getSubTopics(allTopics[i].id);
				topicsFiltered.push({
					...allTopics[i],
					subTopics
				});
			}
		}
		res.json({ topics: topicsFiltered });
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
};
