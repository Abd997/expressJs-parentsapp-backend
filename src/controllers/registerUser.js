const e = require("express");
const ParentRepo = require("../repo/ParentRepo");
const sendErrorResponse = require("../sendErrorResponse");
const bcrypt = require("bcrypt");

const validate = async (req) => {
	const { email, username, password } = req.body;
	if (!email) {
		throw new Error("Email not sent");
	} else if (!username) {
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
		const { email, username, password } = req.body;
		const userExists = await ParentRepo.checkUser(email);
		if (userExists) {
			throw new Error("Email already in use");
		}
		const usernameTaken = await ParentRepo.findUserByUsername(
			username
		);
		if (usernameTaken) {
			throw new Error("Username already in use");
		}
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const newUser = await ParentRepo.addParent({
			email: email,
			username: username,
			password: hashPassword
		});
		res.status(201).json({
			msg: "User successfully created"
		});
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
};
