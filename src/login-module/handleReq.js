const e = require("express");
const sendErrorResponse = require("../sendErrorResponse");
const Parent = require("../models/parent");
const jwt = require("jsonwebtoken");
const ParentRepo = require("../repo/ParentRepo");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await ParentRepo.authenticateUser(email, password);
		if (!user) {
			return sendErrorResponse(res, 401, "User not found");
		}
		const token = jwt.sign(email, process.env.JWT_SIGN_SECRET);
		res.status(200).json({
			msg: "User successfully authenticated",
			token: token
		});
	} catch (error) {
		console.log(error);
		return sendErrorResponse(res, 500, "Internal error");
	}
};
