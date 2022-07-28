const e = require("express");
const ParentRepo = require("../repo/ParentRepo");
const sendErrorResponse = require("../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { username, email, password, pregnancyMonth } = req.body;
	const user = await ParentRepo.findUser(email);
	if (user) {
		return sendErrorResponse(res, 401, "E-mail already in use");
	}
	try {
		const newUser = await ParentRepo.addParent({
			username,
			email,
			password,
			pregnancyMonth
		});
		res.status(201).json({
			msg: "User successfully created"
		});
	} catch (err) {
		console.log(err);
		return sendErrorResponse(res, 500, error.message);
	}
};
