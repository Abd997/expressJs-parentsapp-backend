const e = require("express");
const ParentRepo = require("../repo/ParentRepo");
const sendErrorResponse = require("../sendErrorResponse");

const validate = async (req) => {
	const { username, password, birthDateChild } = req.body;
	if (!username) {
		throw new Error("Username not sent");
	} else if (!password) {
		throw new Error("Password not sent");
	} else if (!birthDateChild) {
		throw new Error("Birth date not sent");
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
		const { username, password, birthDateChild } = req.body;
		const user = await ParentRepo.findUser(username);
		if (user) {
			throw new Error("User already registered");
		}
		const newUser = await ParentRepo.addParent({
			username: username,
			password: password,
			birthDateChild: birthDateChild
		});
		res.status(201).json({
			msg: "User successfully created"
		});
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
};
