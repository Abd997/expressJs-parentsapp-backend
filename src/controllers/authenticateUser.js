const e = require("express");
const sendErrorResponse = require("../sendErrorResponse");
const jwt = require("jsonwebtoken");
const ParentRepo = require("../repo/ParentRepo");

const validate = async (req) => {
	const { username, password } = req.body;
	if (!username) {
		throw new Error("Username not sent");
	} else if (!password) {
		throw new Error("Password not sent");
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
		const { username, password } = req.body;
		const user = await ParentRepo.authenticateUser(
			username,
			password
		);
		if (!user) {
			throw new Error("User not found");
		}
		const token = jwt.sign(username, process.env.JWT_SIGN_SECRET);
		res.status(200).json({
			msg: "User successfully authenticated",
			token: token
		});
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
};
