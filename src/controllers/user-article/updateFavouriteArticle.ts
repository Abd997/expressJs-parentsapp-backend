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
		if (oldPreference.is_favourite) {
			await UserArticlePreferenceRepo.updateOne(
				authUser.id,
				articleId,
				"is_favourite",
				false
			);
			return res.json({
				isFavourite: false,
				msg: "Article has been removed from favourites"
			});
		} else {
			await UserArticlePreferenceRepo.updateOne(
				authUser.id,
				articleId,
				"is_favourite",
				true
			);
			return res.json({
				isFavourite: true,
				msg: "Article has been added to favourites"
			});
		}
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
