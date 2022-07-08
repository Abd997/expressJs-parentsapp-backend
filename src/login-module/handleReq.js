const e = require("express");
const sendErrorResponse = require("../sendErrorResponse");
const Parent = require("../models/parent");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await Parent.findOne({
			email: email,
			password: password
		});
		if (!user) {
			return sendErrorResponse(res, 401, "User not found");
		}
		res.status(200).json({
			msg: "User successfully authenticated"
		});
	} catch (err) {
		return sendErrorResponse(res, 500, "Internal error");
	}
};
