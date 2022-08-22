const e = require("express");
const BadRequestError = require("../errors/BadRequestError");
const ArticleRepo = require("../repo/ArticleRepo");
const sendErrorResponse = require("../sendErrorResponse");

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
		const articleId = req.body.articleId;
		if (!articleId) {
			throw new BadRequestError("Article id not sent");
		}
		const article = await ArticleRepo.findArticleById(articleId);
		if (!article) {
			throw new BadRequestError("Article does not exists");
		}
		await ArticleRepo.updateArticleImageFile(
			req.file.filename,
			articleId
		);
		res.json({
			msg: "Image has been uploaded successfully"
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
