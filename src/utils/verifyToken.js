require("dotenv").config();
const e = require("express");
const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/BadRequestError");
const ParentRepo = require("../repo/ParentRepo");
const sendErrorResponse = require("../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"];
		if (!authHeader) {
			throw new BadRequestError("No auth header present");
		}
		const token = authHeader.split(" ")[1];
		if (!token) {
			throw new BadRequestError("Token not sent");
		}

		const email = await jwt.verify(
			token,
			process.env.JWT_SIGN_SECRET
		);
		const user = await ParentRepo.findUser(email);
		if (!user) {
			throw new BadRequestError("User is not registered");
		}
		req.body.email = email;
		req.body.user = user;
		req.body.authUser = user;

		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return sendErrorResponse(res, 400, "Token is not valid");
		} else if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 401, error.message);
	}
};
