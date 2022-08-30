const e = require("express");
const sendErrorResponse = require("../sendErrorResponse");
const jwt = require("jsonwebtoken");
const ParentRepo = require("../repo/ParentRepo");
const BadRequestError = require("../errors/BadRequestError");
const bcrypt = require("bcrypt");

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
		const user = await ParentRepo.checkUser(email);
		if (!user) {
			throw new BadRequestError("User is not registered");
		}
		const validPassword = await bcrypt.compare(
			password,
			user.password
		);
		if (!validPassword) {
			throw new BadRequestError("Password is incorrect");
		}
		const token = await jwt.sign(email, process.env.JWT_SIGN_SECRET);
		res.status(200).json({
			msg: "User successfully authenticated",
			token: token
		});
	} catch (error) {
		console.log(error);
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
