import { Request, Response } from "express";
import BadRequestError from "../../errors/BadRequestError";
import UserArticlePreferenceRepo from "../../repo/UserArticlePreferenceRepo";
import sendErrorResponse from "../../sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		const { authUser, articleId } = req.body;
		let oldPreference = await UserArticlePreferenceRepo.findOne(
			authUser.id,
			articleId
		);
		if (!oldPreference) {
			oldPreference = await UserArticlePreferenceRepo.insertOne(
				authUser.id,
				articleId
			);
		}
		if (oldPreference.is_relevant) {
			await UserArticlePreferenceRepo.updateOne(
				authUser.id,
				articleId,
				"is_relevant",
				false
			);
			return res.json({
				isRelevant: false,
				msg: "Article has been marked as irrelevant"
			});
		} else {
			await UserArticlePreferenceRepo.updateOne(
				authUser.id,
				articleId,
				"is_relevant",
				true
			);
			return res.json({
				isRelevant: true,
				msg: "Article has been marked as relevant"
			});
		}
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
