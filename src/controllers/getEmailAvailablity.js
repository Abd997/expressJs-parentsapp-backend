const e = require("express");
const ParentRepo = require("../repo/ParentRepo");
const sendErrorResponse = require("../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const email = req.params.email;
	if (!email) {
		throw new Error("Email not sent");
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
		const email = req.params.email;
		const emailExists = await ParentRepo.findUser(email);
		if (emailExists) {
			res.status(400).json({ msg: "Email already registered" });
		} else if (!emailExists) {
			res.json({ msg: "Email can be used" });
		}
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
