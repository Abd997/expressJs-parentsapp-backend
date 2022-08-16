const e = require("express");
const BadRequestError = require("../../errors/BadRequestError");
const SubTaskRepo = require("../../repo/SubTaskRepo");
const sendErrorResponse = require("../../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { subTaskId, subTaskStatus } = req.body;
	if (!subTaskId) {
		throw new BadRequestError("Sub task id is not valid");
	} else if (!subTaskStatus || typeof subTaskStatus !== "boolean") {
		throw new BadRequestError("Sub task status is not valid");
	}

	const res = await SubTaskRepo.findSubTaskById(subTaskId);
	if (!res) {
		throw new BadRequestError("Sub task does not exists");
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
		const { subTaskId, subTaskStatus } = req.body;
		await SubTaskRepo.updateSubTaskStatus(subTaskId, subTaskStatus);
		res.json({
			msg: "Sub task status has been updated"
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
