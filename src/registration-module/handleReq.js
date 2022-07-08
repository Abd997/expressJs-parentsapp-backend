const e = require("express");
const Parent = require("../models/parent");
const sendErrorResponse = require("../sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email, name, password } = req.body;
	try {
		const newUser = await Parent.create({
			email: email,
			name: name,
			password: password
		});
		res.status(201).json({
			msg: "User successfully created"
		});
	} catch (err) {
		console.log(err);
		sendErrorResponse(500, res, "User not created");
	}
};
