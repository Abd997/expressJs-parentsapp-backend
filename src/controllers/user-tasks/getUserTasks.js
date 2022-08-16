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
		const email = req.body.email;
		const tasks = await TaskRepo.getAllTasks(email);
		res.json({
			tasks: tasks
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
