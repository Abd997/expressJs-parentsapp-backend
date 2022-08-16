const e = require("express");
const BadRequestError = require("../../errors/BadRequestError");
const SubTaskRepo = require("../../repo/SubTaskRepo");
const TaskRepo = require("../../repo/TaskRepo");
const sendErrorResponse = require("../../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { taskId } = req.params;
	if (!taskId) {
		throw new BadRequestError("Task id not sent");
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
		const { taskId } = req.params;
		const task = await TaskRepo.findTaskById(taskId);
		if (!task) {
			throw new BadRequestError("Task does not exists");
		}

		const subTasks = await SubTaskRepo.getSubTasksFromTaskId(taskId);
		res.json({
			subTasks: subTasks
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
