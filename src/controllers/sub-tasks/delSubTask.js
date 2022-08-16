const e = require("express");
const BadRequestError = require("../../errors/BadRequestError");
const SubTaskRepo = require("../../repo/SubTaskRepo");
const sendErrorResponse = require("../../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { subTaskId } = req.body;
	if (!subTaskId) {
		throw new BadRequestError("Sub task id not sent");
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
		const { subTaskId } = req.body;
		await SubTaskRepo.deleteSubTask(subTaskId);
		res.json({
			msg: "Sub task has been deleted"
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
