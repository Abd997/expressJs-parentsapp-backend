const e = require("express");
const BadRequestError = require("../../errors/BadRequestError");
const TaskRepo = require("../../repo/TaskRepo");
const sendErrorResponse = require("../../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { name } = req.body;
	if (!name) {
		throw new BadRequestError("Task name is not sent");
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
		const { email, name, description, start_date, end_date } =
			req.body;
		await TaskRepo.addTask(
			{
				name: name,
				description: description || "description",
				start_date: start_date || "2022-01-01",
				end_date: end_date || "2022-02-01"
			},
			email
		);
		res.json({
			msg: "Task has been added"
		});
	} catch (error) {
		console.log(error);
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
