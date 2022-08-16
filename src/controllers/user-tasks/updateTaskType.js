const e = require("express");
const BadRequestError = require("../../errors/BadRequestError");
const TaskRepo = require("../../repo/TaskRepo");
const sendErrorResponse = require("../../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { taskId, taskType } = req.body;
		if (!taskId) {
			throw new BadRequestError("Task id not sent");
		} else if (!taskType) {
			throw new BadRequestError("Task type not sent");
		}

		const taskExists = await TaskRepo.findTaskById(taskId);
		if (!taskExists) {
			throw new BadRequestError("Task does not exists");
		}
		await TaskRepo.updateTaskType(taskId, taskType);
		return res.json({
			msg: "Task type has been updated"
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
