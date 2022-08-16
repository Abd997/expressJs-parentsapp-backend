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
		const { taskId, taskStatus } = req.body;
		if (!taskId) {
			throw new BadRequestError("Task id not sent");
		} else if (!taskStatus) {
			throw new BadRequestError("Task status does not exists");
		}

		const taskExists = await TaskRepo.findTaskById(taskId);
		if (!taskExists) {
			throw new BadRequestError("Task does not exists");
		}
		await TaskRepo.updateTaskStatus(taskId, taskStatus);
		return res.json({
			msg: "Task has been updated"
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
