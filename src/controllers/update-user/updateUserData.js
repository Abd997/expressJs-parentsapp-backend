const e = require("express");
const ParentRepo = require("../../repo/ParentRepo");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	// const {age, childBirthDate, }
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await validate(req);
	} catch (error) {}
};
