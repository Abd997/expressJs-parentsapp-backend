const e = require("express");
const { body, validationResult } = require("express-validator");
const sendErrorResponse = require("../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const validate = (req, res, next) => {
	const errs = validationResult(req);
	if (!errs.isEmpty()) {
		return sendErrorResponse(res, 401, errs.array());
	}

	next();
};

module.exports = [
	body("email").isEmail().withMessage("Email not valid"),
	body("password")
		.exists({ checkFalsy: true })
		.withMessage("Password not provided"),
	validate
];
