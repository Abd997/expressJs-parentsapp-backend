const e = require("express");
const sendErrorResponse = require("../sendErrorResponse");
const jwt = require("jsonwebtoken");
const ParentRepo = require("../repo/ParentRepo");

const validate = async (req) => {
	const { email, password } = req.body;
	if (!email) {
		throw new Error("Email not sent");
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
		const { email, password } = req.body;
		const user = await ParentRepo.authenticateUser(email, password);
		if (!user) {
			throw new Error("User not found");
		}
		const token = await jwt.sign(email, process.env.JWT_SIGN_SECRET);
		res.status(200).json({
			msg: "User successfully authenticated",
			token: token
		});
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
};
