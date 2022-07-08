const e = require("express");
const Parent = require("../models/parent");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email, name, password } = req.body;
	const newUser = await Parent.create({
		email: email,
		name: name,
		password: password
	});
	res.status(201).json({
		msg: "User successfully created"
	});
};
