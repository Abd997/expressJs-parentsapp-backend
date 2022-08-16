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
	const { subTaskName, taskId } = req.body;
	if (!subTaskName) {
		throw new BadRequestError("Sub task name not sent");
	} else if (!taskId) {
		throw new BadRequestError("Task id not sent");
	}

	const taskExists = await TaskRepo.findTaskById(taskId);
	if (!taskExists) {
		throw new BadRequestError("Task does not exists");
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
		const { subTaskName, taskId } = req.body;
		await SubTaskRepo.addSubTask(subTaskName, taskId);
		res.json({
			msg: "Sub task has been added"
		});
	} catch (error) {
		console.log(error);
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
