const e = require("express");
const jwt = require("jsonwebtoken");
const sendErrorResponse = require("../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) {
		return sendErrorResponse(res, 401, "Token not sent");
	}
	try {
		await jwt.verify(req.body.token, process.env.JWT_SIGN_SECRET);
	} catch (err) {
		return sendErrorResponse(res, 401, "Token is invalid");
	}
	next();
};
