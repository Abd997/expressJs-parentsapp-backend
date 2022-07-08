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
	const user = await Parent.findOne({
		email: email,
		password: password
	});
	if (!user) {
		return sendErrorResponse(res, 401, "Could not login");
	}
	res.json({
		msg: "User successfully authenticated"
	});
};
