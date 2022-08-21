const e = require("express");
require("dotenv").config();
const BadRequestError = require("../errors/BadRequestError");
const AdminRepo = require("../repo/AdminRepo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { email, password } = req.body;
		const admin = await AdminRepo.getAdmin(email);
		if (!admin) {
			throw new BadRequestError("Admin is not registered");
		}
		const validPassword = await bcrypt.compare(
			password,
			admin.password
		);
		if (!validPassword) {
			throw new BadRequestError("Password is incorrect");
		}
		const token = await jwt.sign(email, process.env.JWT_ADMIN);
		res.json({
			msg: "Admin has successfully authenticated",
			token: token
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
