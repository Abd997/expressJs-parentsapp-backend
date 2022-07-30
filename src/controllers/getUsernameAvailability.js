const e = require("express");
const ParentRepo = require("../repo/ParentRepo");
const sendErrorResponse = require("../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const username = req.params.username;
	if (!username) {
		throw new Error("Username not sent");
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
		const username = req.params.username;
		const usernameExists = await ParentRepo.findUserByUsername(
			username
		);
		if (usernameExists) {
			res.status(400).json({ msg: "Username already registered" });
		} else if (!usernameExists) {
			res.json({ msg: "Username can be used" });
		}
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
